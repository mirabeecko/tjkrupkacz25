import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createHash } from 'https://deno.land/std@0.168.0/hash/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, orderNumber, amount, email } = await req.json()

    const merchant = Deno.env.get('COMGATE_MERCHANT')!
    const secret = Deno.env.get('COMGATE_SECRET')!
    const testMode = Deno.env.get('COMGATE_TEST_MODE') === 'true'

    // Convert amount to halers (cents) - ComGate requires amount in halers
    const amountInHalers = Math.round(amount * 100)

    // Prepare ComGate API request
    const params = {
      merchant: merchant,
      test: testMode ? 'true' : 'false',
      price: amountInHalers.toString(),
      curr: 'CZK',
      label: `Objednávka ${orderNumber}`,
      refId: orderId.toString(),
      email: email,
      method: 'ALL',
      prepareOnly: 'true',
      lang: 'cs',
      country: 'CZ',
    }

    // Create signature - ComGate requires specific order
    const signatureString = [
      params.merchant,
      params.price,
      params.curr,
      params.label,
      params.refId,
      params.email,
      params.method,
      params.prepareOnly,
      params.lang,
      params.country,
      secret,
    ].join('')

    const encoder = new TextEncoder()
    const data = encoder.encode(signatureString)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // Build form data
    const formData = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append('secret', signature)

    // Call ComGate API
    const apiUrl = testMode
      ? 'https://payments.comgate.cz/v1.0/create'
      : 'https://payments.comgate.cz/v1.0/create'

    const comgateResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    const responseText = await comgateResponse.text()

    // Parse ComGate response (key=value format)
    const responseData: Record<string, string> = {}
    responseText.split('&').forEach(pair => {
      const [key, value] = pair.split('=')
      if (key && value) {
        responseData[key] = decodeURIComponent(value)
      }
    })

    if (responseData.code !== '0') {
      throw new Error(`ComGate error: ${responseData.message || 'Unknown error'}`)
    }

    // Create payment record
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.0')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    await supabase.from('tjkshop_payments').insert({
      order_id: orderId,
      payment_method: 'comgate',
      payment_gateway: 'comgate_gateway',
      comgate_transaction_id: responseData.transId,
      comgate_ref_id: orderId.toString(),
      amount: amount,
      currency: 'CZK',
      status: 'pending',
    })

    // ComGate redirect URL
    const redirectUrl = `https://payments.comgate.cz/client/instructions/index?id=${responseData.transId}`

    return new Response(
      JSON.stringify({ url: redirectUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating ComGate payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
