// Follow this setup guide to integrate the Deno runtime with Supabase Edge Functions:
// https://supabase.com/docs/guides/functions/deno

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface BookingEmailRequest {
  booking: {
    id: string
    full_name: string
    email: string
    phone: string
    vehicle_name: string
    rental_start_date: string
    rental_end_date: string
    rental_duration_days: number
    helmet_needed: boolean
    protective_gear_needed: boolean
    total_price: number
    message?: string
    driving_license_number?: string
  }
}

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
    const { booking } = await req.json() as BookingEmailRequest

    // Format dates for better readability
    const startDate = new Date(booking.rental_start_date).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const endDate = new Date(booking.rental_end_date).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    // Email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: bold; color: #6b7280; }
          .detail-value { color: #111827; }
          .highlight { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Rezervace přijata!</h1>
            <p>Děkujeme za Vaši rezervaci</p>
          </div>
          <div class="content">
            <p>Dobrý den <strong>${booking.full_name}</strong>,</p>
            <p>Vaše rezervace motocyklu byla úspěšně přijata. Níže najdete shrnutí Vaší objednávky:</p>

            <div class="highlight">
              <h2 style="margin-top: 0; color: #ea580c;">📋 Detail rezervace</h2>
              <div class="detail-row">
                <span class="detail-label">Číslo rezervace:</span>
                <span class="detail-value">#${booking.id.substring(0, 8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Vozidlo:</span>
                <span class="detail-value">${booking.vehicle_name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Zahájení pronájmu:</span>
                <span class="detail-value">${startDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Ukončení pronájmu:</span>
                <span class="detail-value">${endDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Doba pronájmu:</span>
                <span class="detail-value">${booking.rental_duration_days} ${booking.rental_duration_days === 1 ? 'den' : booking.rental_duration_days < 5 ? 'dny' : 'dní'}</span>
              </div>
              ${booking.total_price ? `
              <div class="detail-row">
                <span class="detail-label">Celková cena:</span>
                <span class="detail-value" style="font-size: 20px; font-weight: bold; color: #ea580c;">${booking.total_price} €</span>
              </div>
              ` : ''}
            </div>

            ${booking.helmet_needed || booking.protective_gear_needed ? `
            <div class="highlight">
              <h3 style="margin-top: 0;">🛡️ Dodatečné vybavení</h3>
              <ul>
                ${booking.helmet_needed ? '<li>✓ Helma</li>' : ''}
                ${booking.protective_gear_needed ? '<li>✓ Ochranné vybavení</li>' : ''}
              </ul>
            </div>
            ` : ''}

            ${booking.message ? `
            <div class="highlight">
              <h3 style="margin-top: 0;">💬 Vaše zpráva</h3>
              <p>${booking.message}</p>
            </div>
            ` : ''}

            <p><strong>Co se děje dál?</strong></p>
            <ul>
              <li>Obdržíte potvrzení telefonicky nebo e-mailem do 24 hodin</li>
              <li>Domluvíme si přesný čas předání vozidla</li>
              <li>Připravíme pro Vás veškeré potřebné dokumenty</li>
            </ul>

            <div style="text-align: center;">
              <a href="tel:+420773090842" class="button">📞 Zavolat: +420 773 090 842</a>
            </div>

            <p style="margin-top: 30px;">V případě jakýchkoliv dotazů nás neváhejte kontaktovat.</p>
            <p>S pozdravem,<br><strong>Tým TJ Krupka - Půjčovna motocyklů</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Tělovýchovná jednota Krupka z.s.</p>
            <p>Tento e-mail byl odeslán na základě Vaší rezervace na tjkrupka.cz</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: bold; color: #6b7280; }
          .detail-value { color: #111827; }
          .highlight { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nová rezervace!</h1>
            <p>Právě přišla nová rezervace motocyklu</p>
          </div>
          <div class="content">
            <div class="alert">
              <strong>⚠️ Akce požadována:</strong> Kontaktujte zákazníka do 24 hodin pro potvrzení rezervace.
            </div>

            <div class="highlight">
              <h2 style="margin-top: 0; color: #3b82f6;">👤 Zákazník</h2>
              <div class="detail-row">
                <span class="detail-label">Jméno:</span>
                <span class="detail-value">${booking.full_name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value"><a href="mailto:${booking.email}">${booking.email}</a></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Telefon:</span>
                <span class="detail-value"><a href="tel:${booking.phone}">${booking.phone}</a></span>
              </div>
              ${booking.driving_license_number ? `
              <div class="detail-row">
                <span class="detail-label">Řidičský průkaz:</span>
                <span class="detail-value">${booking.driving_license_number}</span>
              </div>
              ` : ''}
            </div>

            <div class="highlight">
              <h2 style="margin-top: 0; color: #3b82f6;">🏍️ Detail rezervace</h2>
              <div class="detail-row">
                <span class="detail-label">ID Rezervace:</span>
                <span class="detail-value">${booking.id}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Vozidlo:</span>
                <span class="detail-value"><strong>${booking.vehicle_name}</strong></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Zahájení:</span>
                <span class="detail-value">${startDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Ukončení:</span>
                <span class="detail-value">${endDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Doba pronájmu:</span>
                <span class="detail-value"><strong>${booking.rental_duration_days} ${booking.rental_duration_days === 1 ? 'den' : booking.rental_duration_days < 5 ? 'dny' : 'dní'}</strong></span>
              </div>
              ${booking.total_price ? `
              <div class="detail-row">
                <span class="detail-label">Celková cena:</span>
                <span class="detail-value" style="font-size: 20px; font-weight: bold; color: #3b82f6;">${booking.total_price} €</span>
              </div>
              ` : ''}
            </div>

            ${booking.helmet_needed || booking.protective_gear_needed ? `
            <div class="highlight">
              <h3 style="margin-top: 0;">🛡️ Dodatečné vybavení</h3>
              <ul>
                ${booking.helmet_needed ? '<li>✓ Helma požadována</li>' : ''}
                ${booking.protective_gear_needed ? '<li>✓ Ochranné vybavení požadováno</li>' : ''}
              </ul>
            </div>
            ` : ''}

            ${booking.message ? `
            <div class="highlight">
              <h3 style="margin-top: 0;">💬 Zpráva od zákazníka</h3>
              <p>${booking.message}</p>
            </div>
            ` : ''}

            <p style="margin-top: 30px;"><strong>Doporučené další kroky:</strong></p>
            <ol>
              <li>Zkontrolujte dostupnost vozidla v daném termínu</li>
              <li>Kontaktujte zákazníka telefonicky pro potvrzení</li>
              <li>Domluvte přesný čas předání a vrácení</li>
              <li>Připravte smlouvu o pronájmu</li>
            </ol>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email to customer
    const customerEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'TJ Krupka Půjčovna <noreply@resend.dev>',
        to: [booking.email],
        subject: `✅ Potvrzení rezervace #${booking.id.substring(0, 8).toUpperCase()} - ${booking.vehicle_name}`,
        html: customerEmailHtml,
      }),
    })

    // Send email to admin
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'TJ Krupka Rezervace <rezervace@resend.dev>',
        to: ['pujcovna@tjkrupka.cz'], // Replace with actual admin email
        subject: `🔔 Nová rezervace #${booking.id.substring(0, 8).toUpperCase()} - ${booking.vehicle_name}`,
        html: adminEmailHtml,
      }),
    })

    const customerData = await customerEmailRes.json()
    const adminData = await adminEmailRes.json()

    return new Response(
      JSON.stringify({
        success: true,
        customerEmail: customerData,
        adminEmail: adminData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
