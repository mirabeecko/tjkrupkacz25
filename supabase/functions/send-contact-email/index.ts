import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

// Inicializace Resend klienta s API klíčem z proměnných prostředí
const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

serve(async (req) => {
  console.log("Function invoked."); // Přidáno pro logování spuštění
  try {
    const payload = await req.json(); // Změněno na payload pro logování
    console.log("Received payload:", payload); // Přidáno pro logování přijatých dat
    const { record } = payload; // Destrukturování záznamu z payloadu

    // Sestavení obsahu e-mailu
    const emailHtml = `
      <h1>Nová zpráva z kontaktního formuláře</h1>
      <p><strong>Jméno:</strong> ${record.name}</p>
      <p><strong>Email:</strong> ${record.email}</p>
      <p><strong>Telefon:</strong> ${record.phone || 'Není vyplněn'}</p>
      <p><strong>Zájem o:</strong> ${record.interest}</p>
      <hr>
      <p><strong>Zpráva:</strong></p>
      <p>${record.message}</p>
    `;

    // Odeslání e-mailu pomocí služby Resend
    await resend.emails.send({
      from: "web@tjkrupka.cz", // DŮLEŽITÉ: Toto musí být adresa z domény, kterou jste ověřili v Resend
      to: "miroslavbrozek@gmail.com", // Vaše adresa, kam chcete dostávat upozornění
      subject: "Nová zpráva z webu tjkrupka.cz",
      html: emailHtml,
    });

    // Vrácení úspěšné odpovědi
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during function execution:", error); // Přidáno pro logování chyb
    // Vrácení chybové odpovědi
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});