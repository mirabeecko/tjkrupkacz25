import React, { useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Mail, User, Smartphone, ListChecks, MessageCircle } from "lucide-react";

type Props = {
  showPhone?: boolean;
};

const N8N_WEBHOOK = "https://n8n.webdo24.cz/webhook/new-lead";

const ContactForm: React.FC<Props> = ({ showPhone = true }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "dobrovolnictví",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const confirmDurationMs = 10000;
  const confirmClassName =
    "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xl";
  const confirmDescriptionClassName = "text-emerald-800";

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "dobrovolnictví",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const messageWithMeta = [
        `Zájem: ${formData.interest}`,
        formData.phone ? `Telefon: ${formData.phone}` : null,
        "",
        formData.message,
      ]
        .filter((line) => line !== null)
        .join("\n");

      const { error: insertError } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: messageWithMeta,
          status: "new",
        },
      ]);

      // Send to N8N webhook
      let webhookError: Error | null = null;
      try {
        const response = await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            web_id: "tjkrupka",
            source: "Kontakt",
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "",
            interest: formData.interest,
            message: formData.message,
          }),
        });
        if (!response.ok) {
          webhookError = new Error(`Webhook error: ${response.status}`);
        }
      } catch (err) {
        webhookError = err as Error;
      }

      if (insertError || webhookError) {
        if (insertError && !webhookError) {
          toast("ZPRÁVA ODESLÁNA", {
            description:
              "Webhook jsme odeslali. Uložení do systému se nezdařilo, ale zprávu jsme obdrželi.",
            duration: confirmDurationMs,
            className: confirmClassName,
            descriptionClassName: confirmDescriptionClassName,
          });
          console.error(insertError);
          resetForm();
          return;
        }
        if (!insertError && webhookError) {
          toast("ZPRÁVA ODESLÁNA", {
            description:
              "Zprávu jsme přijali a uložili. Webhook se nepodařilo odeslat.",
            duration: confirmDurationMs,
            className: confirmClassName,
            descriptionClassName: confirmDescriptionClassName,
          });
          console.error(webhookError);
          resetForm();
          return;
        }
        toast.error("Zprávu se nepodařilo odeslat.", {
          description: insertError?.message || "Zkuste to prosím znovu.",
        });
        if (insertError) console.error(insertError);
        if (webhookError) console.error(webhookError);
      } else {
        toast.success("ZPRÁVA ODESLÁNA", {
          description: "Děkujeme! Vaši zprávu jsme přijali a brzy se ozveme.",
          duration: confirmDurationMs,
          className: confirmClassName,
          descriptionClassName: confirmDescriptionClassName,
        });
        resetForm();
      }
    } catch (error) {
      toast.error("Chyba!", {
        description: String(error),
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-lg px-4 py-6 md:px-8 md:py-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-tjk-blue" />
        <h2 className="text-xl md:text-2xl font-bold text-tjk-blue font-montserrat">Kontaktní formulář</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium flex items-center gap-2">
            <User className="h-5 w-5 text-tjk-blue/80" /> Jméno a příjmení
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tjk-blue/30 focus:border-tjk-blue outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium flex items-center gap-2">
            <Mail className="h-5 w-5 text-tjk-blue/80" /> E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tjk-blue/30 focus:border-tjk-blue outline-none transition"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {showPhone && (
          <div>
            <label htmlFor="phone" className="block mb-2 font-medium flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-tjk-blue/80" /> Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tjk-blue/30 focus:border-tjk-blue outline-none transition"
            />
          </div>
        )}
        <div>
          <label htmlFor="interest" className="block mb-2 font-medium flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-tjk-blue/80" /> Mám zájem o
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tjk-blue/30 focus:border-tjk-blue outline-none transition"
          >
            <option value="dobrovolnictví">Dobrovolnictví</option>
            <option value="sponzorství/partnerství">Sponzorství/partnerství</option>
            <option value="zpráva">Zpráva</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-tjk-blue/80" /> Zpráva
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tjk-blue/30 focus:border-tjk-blue outline-none transition"
          placeholder="Napište nám, jak byste se rádi zapojili nebo jakým způsobem byste chtěli podporovat naše aktivity..."
        ></textarea>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-tjk-blue hover:bg-tjk-blue/90 text-white px-10 py-3 rounded-full text-base font-semibold shadow-md mt-2"
      >
        {loading ? "Odesílání..." : "Odeslat"}
      </Button>
    </form>
  );
};

export default ContactForm;
