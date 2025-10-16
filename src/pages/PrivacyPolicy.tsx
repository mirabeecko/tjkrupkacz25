import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Mail, Phone } from "lucide-react";

const PrivacyPolicy = () => {
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
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Zásady ochrany osobních údajů
              </h1>
              <p className="text-xl text-blue-100">
                Vaše soukromí je pro nás prioritou
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
                  1. Správce osobních údajů
                </h2>
                <p className="text-gray-700 mb-4">
                  Správcem vašich osobních údajů je:
                </p>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <p className="font-semibold text-gray-900 mb-2">TJ Krupka, z.s.</p>
                  <p className="text-gray-700">IČO: 00508128</p>
                  <p className="text-gray-700">Sídlo: Krupka, Česká republika</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a href="mailto:info@tjkrupka.cz" className="text-blue-600 hover:underline">
                      info@tjkrupka.cz
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <a href="tel:+420773090842" className="text-blue-600 hover:underline">
                      +420 773 090 842
                    </a>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  2. Jaké osobní údaje zpracováváme
                </h2>
                <p className="text-gray-700 mb-4">
                  V rámci našich služeb zpracováváme následující kategorie osobních údajů:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Identifikační údaje:</strong> jméno, příjmení</li>
                  <li><strong>Kontaktní údaje:</strong> e-mailová adresa, telefonní číslo</li>
                  <li><strong>Rezervační údaje:</strong> datum a typ kurzu, počet účastníků</li>
                  <li><strong>Technické údaje:</strong> IP adresa, cookies, informace o zařízení</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  3. Účel zpracování osobních údajů
                </h2>
                <p className="text-gray-700 mb-4">
                  Vaše osobní údaje zpracováváme za těmito účely:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Vyřízení objednávky a rezervace kurzu</li>
                  <li>Komunikace s klienty (potvrzení, změny, dotazy)</li>
                  <li>Zpracování plateb</li>
                  <li>Zlepšení kvality našich služeb</li>
                  <li>Zasílání marketingových sdělení (pouze se souhlasem)</li>
                  <li>Plnění právních povinností</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  4. Právní základ zpracování
                </h2>
                <p className="text-gray-700 mb-4">
                  Osobní údaje zpracováváme na základě:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Plnění smlouvy</strong> – zpracování objednávky a poskytnutí služby</li>
                  <li><strong>Oprávněný zájem</strong> – komunikace s klienty, ochrana majetku</li>
                  <li><strong>Souhlas</strong> – zasílání newsletterů a marketingových sdělení</li>
                  <li><strong>Právní povinnost</strong> – účetnictví, archivace</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  5. Doba uložení osobních údajů
                </h2>
                <p className="text-gray-700 mb-4">
                  Osobní údaje uchováváme po dobu:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Nutnou pro poskytnutí služby</li>
                  <li>Stanovenou právními předpisy (např. 10 let pro účetní doklady)</li>
                  <li>Do odvolání souhlasu (v případě marketingových sdělení)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  6. Předávání osobních údajů třetím stranám
                </h2>
                <p className="text-gray-700 mb-4">
                  Vaše osobní údaje můžeme předat:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Zpracovatelům plateb (platební brány)</li>
                  <li>Poskytovatelům IT služeb (hosting, e-mail)</li>
                  <li>Účetním a právním poradcům</li>
                  <li>Státním orgánům (pouze na základě právní povinnosti)</li>
                </ul>
                <p className="text-gray-700 mb-6">
                  S těmito subjekty máme uzavřené smlouvy o zpracování osobních údajů
                  a zajišťujeme, aby byly vaše údaje chráněny.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  7. Vaše práva
                </h2>
                <p className="text-gray-700 mb-4">
                  Máte právo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Na přístup</strong> k osobním údajům</li>
                  <li><strong>Na opravu</strong> nepřesných údajů</li>
                  <li><strong>Na výmaz</strong> údajů ("právo být zapomenut")</li>
                  <li><strong>Na omezení zpracování</strong></li>
                  <li><strong>Na přenositelnost údajů</strong></li>
                  <li><strong>Vznést námitku</strong> proti zpracování</li>
                  <li><strong>Odvolat souhlas</strong> se zpracováním</li>
                  <li><strong>Podat stížnost</strong> u Úřadu pro ochranu osobních údajů</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  8. Zabezpečení osobních údajů
                </h2>
                <p className="text-gray-700 mb-6">
                  Používáme moderní technická a organizační opatření k ochraně vašich
                  osobních údajů před neoprávněným přístupem, ztrátou, zneužitím nebo
                  zničením. Všechna data jsou šifrována a pravidelně zálohována.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  9. Cookies
                </h2>
                <p className="text-gray-700 mb-6">
                  Náš web používá cookies pro zajištění funkčnosti a zlepšení uživatelského
                  zážitku. Více informací najdete v našich{" "}
                  <a href="/cookies" className="text-blue-600 hover:underline">
                    Zásadách používání cookies
                  </a>.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  10. Změny zásad ochrany osobních údajů
                </h2>
                <p className="text-gray-700 mb-6">
                  Tyto zásady můžeme čas od času aktualizovat. O významných změnách vás
                  budeme informovat prostřednictvím webu nebo e-mailem.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  11. Kontakt
                </h2>
                <p className="text-gray-700 mb-4">
                  Máte-li jakékoli dotazy ohledně zpracování vašich osobních údajů,
                  kontaktujte nás:
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a href="mailto:info@tjkrupka.cz" className="text-blue-600 hover:underline text-lg">
                      info@tjkrupka.cz
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a href="tel:+420773090842" className="text-blue-600 hover:underline text-lg">
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

export default PrivacyPolicy;
