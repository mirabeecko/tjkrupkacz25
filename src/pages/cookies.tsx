import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cookie, Mail, Phone } from "lucide-react";

const Cookies = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Cookie className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Zásady používání cookies
              </h1>
              <p className="text-xl text-amber-100">
                Jak používáme cookies na našem webu
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  Poslední aktualizace: 16. října 2025
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  1. Co jsou cookies?
                </h2>
                <p className="text-gray-700 mb-6">
                  Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče
                  nebo zařízení při návštěvě webových stránek. Pomáhají nám rozpoznat váš
                  prohlížeč a zapamatovat si určité informace, jako jsou vaše předvolby
                  nebo přihlašovací údaje.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  2. Proč používáme cookies?
                </h2>
                <p className="text-gray-700 mb-4">
                  Cookies používáme z několika důvodů:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Zajištění základní funkčnosti webu</li>
                  <li>Zapamatování vašich předvoleb a nastavení</li>
                  <li>Analýza návštěvnosti a chování uživatelů</li>
                  <li>Zlepšení uživatelského zážitku</li>
                  <li>Personalizace obsahu</li>
                  <li>Zabezpečení webu</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  3. Typy cookies, které používáme
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Nezbytné cookies (nutné)
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Tyto cookies jsou nezbytné pro správné fungování webu a nelze je vypnout.
                      Umožňují základní funkce jako navigace po stránkách a přístup k
                      zabezpečeným oblastem.
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Tyto cookies NELZE odmítnout.
                    </p>
                    <div className="mt-3 bg-white p-3 rounded">
                      <p className="text-sm font-semibold mb-1">Příklady:</p>
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        <li>Uchování přihlášení během návštěvy</li>
                        <li>Zapamatování položek v košíku</li>
                        <li>Bezpečnostní cookies pro ochranu před útoky</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Funkční cookies
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Tyto cookies umožňují webu zapamatovat si volby, které jste udělali
                      (např. jazyk, region), a poskytovat vylepšené, personalizované funkce.
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Tyto cookies lze odmítnout.
                    </p>
                    <div className="mt-3 bg-white p-3 rounded">
                      <p className="text-sm font-semibold mb-1">Příklady:</p>
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        <li>Volba jazyka webu</li>
                        <li>Zapamatování přihlašovacího jména</li>
                        <li>Preference zobrazení (tmavý režim apod.)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Analytické cookies
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Tyto cookies nám pomáhají pochopit, jak návštěvníci používají web,
                      které stránky jsou nejoblíbenější a jak se pohybují po webu.
                      Všechny informace jsou anonymizované.
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Tyto cookies lze odmítnout.
                    </p>
                    <div className="mt-3 bg-white p-3 rounded">
                      <p className="text-sm font-semibold mb-1">Používáme:</p>
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        <li>Google Analytics (anonymizované IP adresy)</li>
                        <li>Měření návštěvnosti stránek</li>
                        <li>Analýza zdrojů návštěvnosti</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Marketingové cookies
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Tyto cookies sledují vaši aktivitu na webu a používají se k zobrazování
                      reklam, které jsou pro vás relevantní a zajímavé. Omezují také počet
                      zobrazení stejné reklamy.
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Tyto cookies lze odmítnout.
                    </p>
                    <div className="mt-3 bg-white p-3 rounded">
                      <p className="text-sm font-semibold mb-1">Používáme:</p>
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        <li>Facebook Pixel (remarketing)</li>
                        <li>Google Ads (cílená reklama)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  4. Doba uchování cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  Cookies můžeme rozdělit podle doby uchování:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    <strong>Session cookies (dočasné):</strong> Platné pouze během vaší
                    návštěvy a po zavření prohlížeče se automaticky smažou
                  </li>
                  <li>
                    <strong>Persistent cookies (trvalé):</strong> Zůstávají uložené
                    i po zavření prohlížeče, obvykle po dobu 30 dní až 2 let
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  5. Cookies třetích stran
                </h2>
                <p className="text-gray-700 mb-4">
                  Některé cookies pocházejí od třetích stran:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    <strong>Google Analytics:</strong> Pro měření návštěvnosti
                    <br />
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline text-sm">
                      Zásady ochrany soukromí Google
                    </a>
                  </li>
                  <li>
                    <strong>Facebook:</strong> Pro remarketing a cílenou reklamu
                    <br />
                    <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline text-sm">
                      Zásady používání údajů Facebook
                    </a>
                  </li>
                  <li>
                    <strong>YouTube:</strong> Videa vložená na webu
                    <br />
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline text-sm">
                      Zásady ochrany soukromí Google/YouTube
                    </a>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  6. Jak spravovat cookies?
                </h2>
                <p className="text-gray-700 mb-4">
                  Máte plnou kontrolu nad cookies na našem webu:
                </p>

                <div className="bg-amber-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Nastavení cookies na webu</h3>
                  <p className="text-gray-700 mb-3">
                    Své preference můžete změnit kdykoli kliknutím na "Nastavení cookies"
                    v patičce webu.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Nastavení v prohlížeči
                </h3>
                <p className="text-gray-700 mb-4">
                  Cookies můžete také spravovat přímo ve vašem prohlížeči:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    <strong>Google Chrome:</strong> Nastavení → Ochrana soukromí a zabezpečení → Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Předvolby → Soukromí a zabezpečení → Cookies
                  </li>
                  <li>
                    <strong>Safari:</strong> Předvolby → Soukromí → Správa dat webových stránek
                  </li>
                  <li>
                    <strong>Edge:</strong> Nastavení → Soubory cookie a oprávnění webu
                  </li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <p className="text-yellow-800">
                    <strong>Upozornění:</strong> Zakázání cookies může ovlivnit funkčnost
                    webu a některé funkce nemusí fungovat správně.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  7. Práva uživatele
                </h2>
                <p className="text-gray-700 mb-4">
                  V souvislosti s cookies máte následující práva:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Právo být informován o používání cookies</li>
                  <li>Právo odmítnout nepovinné cookies</li>
                  <li>Právo změnit své preference kdykoli</li>
                  <li>Právo smazat cookies ve svém prohlížeči</li>
                  <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  8. Změny zásad cookies
                </h2>
                <p className="text-gray-700 mb-6">
                  Tyto zásady můžeme čas od času aktualizovat, aby odrážely změny
                  v technologiích nebo právních požadavcích. O významných změnách vás
                  budeme informovat prostřednictvím banneru na webu.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  9. Další informace
                </h2>
                <p className="text-gray-700 mb-6">
                  Více informací o zpracování osobních údajů najdete v našich{" "}
                  <a href="/zasady-ochrany-osobnich-udaju" className="text-amber-600 hover:underline">
                    Zásadách ochrany osobních údajů
                  </a>.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  10. Kontakt
                </h2>
                <p className="text-gray-700 mb-4">
                  Máte-li dotazy ohledně používání cookies, kontaktujte nás:
                </p>
                <div className="bg-amber-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-amber-600" />
                    <a href="mailto:info@tjkrupka.cz" className="text-amber-600 hover:underline text-lg">
                      info@tjkrupka.cz
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-amber-600" />
                    <a href="tel:+420773090842" className="text-amber-600 hover:underline text-lg">
                      +420 773 090 842
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;
