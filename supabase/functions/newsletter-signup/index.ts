
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    // Send notification email to admin
    const emailResponse = await resend.emails.send({
      from: "Webová stránka TJK <onboarding@resend.dev>",
      to: ["miroslavbroozek@gmail.com"],
      subject: "Nový odběratel newsletteru",
      html: `
        <h1>Nový odběratel newsletteru</h1>
        <p>Na webových stránkách se někdo přihlásil k odběru novinek.</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <hr>
        <p>Tato zpráva byla odeslána z webových stránek Tělovýchovná jednota Krupka z.s.</p>
      `,
    });

    console.log("Newsletter notification sent successfully:", emailResponse);

    // Send confirmation email to subscriber
    const confirmationResponse = await resend.emails.send({
      from: "Tělovýchovná jednota Krupka <onboarding@resend.dev>",
      to: [email],
      subject: "Potvrzení přihlášení k odběru novinek",
      html: `
        <h1>Děkujeme za přihlášení k odběru novinek</h1>
        <p>Vážený návštěvníku,</p>
        <p>děkujeme, že jste se přihlásil/a k odběru novinek z Tělovýchovné jednoty Krupka. Budeme Vás informovat o akcích, událostech a zajímavostech z našeho areálu.</p>
        <p>S pozdravem,<br>Tým Tělovýchovné jednoty Krupka z.s.</p>
      `,
    });

    return new Response(JSON.stringify({
      admin: emailResponse,
      confirmation: confirmationResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in newsletter-signup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
