import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const formData = await req.formData()
    const transId = formData.get('transId') as string
    const refId = formData.get('refId') as string
    const status = formData.get('status') as string
    const fee = formData.get('fee') as string

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.0')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const orderId = parseInt(refId)

    // ComGate status codes:
    // PAID = payment successful
    // CANCELLED = payment cancelled
    // PENDING = payment pending
    // AUTHORIZED = payment authorized (for two-step payments)

    if (status === 'PAID' || status === 'AUTHORIZED') {
      // Update payment status
      await supabase
        .from('tjkshop_payments')
        .update({
          status: 'succeeded',
          paid_at: new Date().toISOString(),
          metadata: { fee: fee },
        })
        .eq('order_id', orderId)
        .eq('payment_method', 'comgate')

      // Update order status
      await supabase
        .from('tjkshop_orders')
        .update({
          payment_status: 'paid',
          status: 'processing',
          paid_at: new Date().toISOString(),
        })
        .eq('id', orderId)

      // Create tickets for digital products
      const { data: orderItems } = await supabase
        .from('tjkshop_order_items')
        .select('*, product:tjkshop_products(*)')
        .eq('order_id', orderId)

      const { data: order } = await supabase
        .from('tjkshop_orders')
        .select('user_id')
        .eq('id', orderId)
        .single()

      if (orderItems) {
        for (const item of orderItems) {
          // Create tickets for ticket products
          if (item.product.category === 'ticket') {
            const validFrom = new Date()
            const validUntil = new Date()
            validUntil.setFullYear(validUntil.getFullYear() + 1) // 1 year validity

            for (let i = 0; i < item.quantity; i++) {
              await supabase.from('tjkshop_tickets').insert({
                order_id: orderId,
                user_id: order?.user_id || null,
                ticket_type: item.product.metadata?.ticket_type || 'skipass',
                product_name: item.product_name,
                valid_from: validFrom.toISOString(),
                valid_until: validUntil.toISOString(),
                status: 'valid',
              })
            }
          }

          // Create membership for membership products
          if (item.product.category === 'membership') {
            if (order?.user_id) {
              const startDate = new Date()
              const endDate = new Date()
              endDate.setFullYear(endDate.getFullYear() + 1) // 1 year membership

              await supabase.from('tjkshop_memberships').insert({
                user_id: order.user_id,
                membership_type: item.product.metadata?.membership_type || 'basic',
                status: 'active',
                start_date: startDate.toISOString().split('T')[0],
                end_date: endDate.toISOString().split('T')[0],
                price: item.unit_price,
              })
            }
          }
        }
      }
    } else if (status === 'CANCELLED') {
      await supabase
        .from('tjkshop_payments')
        .update({
          status: 'cancelled',
          failed_reason: 'Payment cancelled by user',
        })
        .eq('order_id', orderId)
        .eq('payment_method', 'comgate')
    }

    // ComGate requires "OK" response
    return new Response('OK', {
      headers: { 'Content-Type': 'text/plain' },
      status: 200,
    })
  } catch (error) {
    console.error('ComGate webhook error:', error)
    return new Response('ERROR', {
      headers: { 'Content-Type': 'text/plain' },
      status: 400,
    })
  }
})
