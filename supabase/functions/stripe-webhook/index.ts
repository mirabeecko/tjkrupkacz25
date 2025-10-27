import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@14.5.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 })
  }

  try {
    const body = await req.text()

    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    )

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.0')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = parseInt(session.metadata?.orderId || '0')

        if (orderId) {
          // Update payment status
          await supabase
            .from('tjkshop_payments')
            .update({
              status: 'succeeded',
              paid_at: new Date().toISOString(),
              stripe_charge_id: session.payment_intent as string,
            })
            .eq('order_id', orderId)
            .eq('payment_method', 'stripe')

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
        }
        break
      }

      case 'checkout.session.expired':
      case 'payment_intent.payment_failed': {
        const session = event.data.object as any
        const orderId = parseInt(session.metadata?.orderId || '0')

        if (orderId) {
          await supabase
            .from('tjkshop_payments')
            .update({
              status: 'failed',
              failed_reason: 'Payment failed or session expired',
            })
            .eq('order_id', orderId)
            .eq('payment_method', 'stripe')
        }
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
