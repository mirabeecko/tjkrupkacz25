import React, { useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Smartphone, ListChecks, MessageCircle } from "lucide-react";

type Props = {
  showPhone?: boolean;
};

const ContactForm: React.FC<Props> = ({ showPhone = true }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "dobrovolnictví",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
          status: "new",
        },
      ]);

      if (error) {
        toast({
          title: "Chyba!",
          description: error.message,
          variant: "destructive",
        });
        console.error(error);
      } else {
        toast({
          title: "Odesláno!",
          description: "Děkujeme za vaši zprávu. Brzy se vám ozveme.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "dobrovolnictví",
          message: "",
        });
      }
    } catch (error) {
      toast({
        title: "Chyba!",
        description: String(error),
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl shadow-lg px-8 py-10 md:px-16 md:py-12 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="h-8 w-8 text-tjk-blue" />
        <h2 className="text-2xl font-bold text-tjk-blue font-montserrat">Kontaktní formulář</h2>
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