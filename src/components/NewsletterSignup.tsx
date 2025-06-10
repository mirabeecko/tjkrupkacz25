import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseClient";
import { Mail } from "lucide-react";

const NewsletterSignup: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store in database
      const { error } = await supabase
        .from('web_newsletters')
        .insert([{ "e-mail": email }]);

      if (error) {
        console.error('Error signing up for newsletter:', error);
        toast({
          title: "Chyba!",
          description: "Nepodařilo se přihlásit k odběru novinek. Zkuste to prosím později.",
          variant: "destructive",
        });
      } else {
        // Send email notification
        try {
          await fetch('https://mljqltwcdqknezuqpisb.functions.supabase.co/newsletter-signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
        }

        toast({
          title: "Přihlášeno!",
          description: "Děkujeme za přihlášení k odběru novinek.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Chyba!",
        description: "Něco se pokazilo. Zkuste to prosím později.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-tjk-blue to-blue-700 text-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Mail className="h-8 w-8 text-tjk-orange mr-3" />
        <h3 className="text-2xl font-montserrat font-bold">Odebírejte novinky</h3>
      </div>
      <p className="mb-6">Přihlaste se k odběru novinek a budeme vás informovat o akcích, událostech a zajímavostech z areálu.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Váš e-mail"
          required
          className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-tjk-orange"
          aria-label="E-mailová adresa"
        />
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-tjk-orange hover:bg-tjk-orange/90 text-white px-6 py-3 rounded-md transition-colors whitespace-nowrap"
        >
          {loading ? "Odesílání..." : "Přihlásit se"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
