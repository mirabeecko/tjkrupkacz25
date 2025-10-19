import React, { useState } from "react";
import { X, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulace API volání
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      toast.success("Děkujeme za přihlášení k odběru!");
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setEmail("");
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-tjk-orange/20 to-amber-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-tjk-orange to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-poppins font-bold text-center mb-2 text-gray-900 dark:text-white">
                      Zůstaňte v obraze
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-6 font-inter">
                      Přihlaste se k odběru novinek a získejte{" "}
                      <span className="font-bold text-tjk-orange">10% slevu</span> na první kurz!
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="vas@email.cz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-12 h-12 rounded-xl border-2 focus:border-tjk-orange"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-tjk-orange to-amber-600 hover:from-tjk-orange/90 hover:to-amber-600/90 text-white font-poppins font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {isLoading ? "Přihlašuji..." : "Přihlásit se k odběru"}
                      </Button>
                    </form>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                      Odesláním souhlasíte s našimi{" "}
                      <a href="/zasady-ochrany-osobnich-udaju" className="underline hover:text-tjk-orange">
                        zásadami ochrany osobních údajů
                      </a>
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
                      Úspěšně přihlášeno!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-inter">
                      Zkontrolujte svou e-mailovou schránku
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
