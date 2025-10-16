import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accessibility, Mail, Phone, Eye, Ear, MousePointer } from "lucide-react";

const AccessibilityPage = () => {
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
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Accessibility className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Prohlášení o přístupnosti
              </h1>
              <p className="text-xl text-indigo-100">
                Naše webové stránky jsou přístupné pro všechny
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
                  1. Náš závazek k přístupnosti
                </h2>
                <p className="text-gray-700 mb-6">
                  TJ Krupka, z.s. se zavazuje zajistit, aby naše webové stránky byly
                  přístupné všem uživatelům bez ohledu na jejich schopnosti nebo technologie,
                  které používají. Věříme, že každý má právo na rovný přístup k informacím
                  a službám.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  2. Standard přístupnosti
                </h2>
                <p className="text-gray-700 mb-4">
                  Naše webové stránky jsou navrženy v souladu s:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    <strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines) úroveň AA
                  </li>
                  <li>
                    <strong>Zákon č. 99/2019 Sb.</strong> o přístupnosti internetových stránek
                    a mobilních aplikací
                  </li>
                  <li>
                    <strong>Směrnice EU 2016/2102</strong> o přístupnosti webových stránek
                    a mobilních aplikací subjektů veřejného sektoru
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  3. Funkce přístupnosti webu
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">Vizuální přístupnost</h3>
                    </div>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                      <li>Vysoký kontrast textu a pozadí pro lepší čitelnost</li>
                      <li>Jasně strukturovaná navigace a obsah</li>
                      <li>Alternativní text pro všechny obrázky</li>
                      <li>Velikost písma je přizpůsobitelná v prohlížeči</li>
                      <li>Barevné schéma nepoužívá pouze barvu pro přenos informací</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <MousePointer className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900">Navigace klávesnicí</h3>
                    </div>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                      <li>Všechny funkce jsou dostupné pomocí klávesnice</li>
                      <li>Logické pořadí procházení stránky (Tab)</li>
                      <li>Viditelný focus indikátor pro aktuální prvek</li>
                      <li>Žádné pasti klávesnice (keyboard traps)</li>
                      <li>Skip navigation odkazy pro rychlý přístup k obsahu</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <Ear className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900">Kompatibilita se čtečkami obrazovky</h3>
                    </div>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                      <li>Sémantické HTML značky pro správnou strukturu</li>
                      <li>ARIA atributy pro interaktivní prvky</li>
                      <li>Popisné nadpisy a odkazy</li>
                      <li>Alternativní text pro grafiku a ikony</li>
                      <li>Logická hierarchie nadpisů (h1-h6)</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  4. Klávesové zkratky
                </h2>
                <p className="text-gray-700 mb-4">
                  Pro usnadnění navigace můžete použít následující klávesové zkratky:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="pb-2 font-semibold text-gray-900">Klávesa</th>
                        <th className="pb-2 font-semibold text-gray-900">Akce</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-mono bg-gray-100 px-2 rounded">Tab</td>
                        <td className="py-2">Přechod na další interaktivní prvek</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-mono bg-gray-100 px-2 rounded">Shift + Tab</td>
                        <td className="py-2">Přechod na předchozí interaktivní prvek</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-mono bg-gray-100 px-2 rounded">Enter</td>
                        <td className="py-2">Aktivace odkazu nebo tlačítka</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-mono bg-gray-100 px-2 rounded">Esc</td>
                        <td className="py-2">Zavření dialogu nebo menu</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono bg-gray-100 px-2 rounded">Šipky</td>
                        <td className="py-2">Navigace v menu a seznamech</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  5. Kompatibilní technologie
                </h2>
                <p className="text-gray-700 mb-4">
                  Naše webové stránky jsou testovány a kompatibilní s:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Čtečky obrazovky:</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>NVDA (Windows)</li>
                      <li>JAWS (Windows)</li>
                      <li>VoiceOver (macOS, iOS)</li>
                      <li>TalkBack (Android)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Prohlížeče:</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Google Chrome (poslední 2 verze)</li>
                      <li>Mozilla Firefox (poslední 2 verze)</li>
                      <li>Safari (poslední 2 verze)</li>
                      <li>Microsoft Edge (poslední 2 verze)</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  6. Známá omezení
                </h2>
                <p className="text-gray-700 mb-4">
                  I přes naši snahu být plně přístupní, mohou existovat některá omezení:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    <strong>Externí videa:</strong> Videa z YouTube nemusí mít vždy kompletní
                    titulky, pracujeme na jejich doplnění
                  </li>
                  <li>
                    <strong>PDF dokumenty:</strong> Starší PDF soubory nemusí být plně
                    přístupné, postupně je aktualizujeme
                  </li>
                  <li>
                    <strong>Mapy:</strong> Interaktivní mapy mají omezenou přístupnost,
                    poskytujeme textové alternativy
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  7. Nastavení prohlížeče pro lepší přístupnost
                </h2>
                <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Tipy pro úpravu zobrazení:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>
                      <strong>Zvětšení textu:</strong> Ctrl/Cmd + (plus) pro zvětšení,
                      Ctrl/Cmd - (mínus) pro zmenšení
                    </li>
                    <li>
                      <strong>Vysoký kontrast:</strong> Windows: Alt + Shift + Print Screen,
                      macOS: System Preferences → Accessibility
                    </li>
                    <li>
                      <strong>Vlastní barvy:</strong> Většina prohlížečů umožňuje nastavit
                      vlastní barevné schéma
                    </li>
                    <li>
                      <strong>Převod textu na řeč:</strong> Většina moderních prohlížečů
                      má vestavěnou funkci čtení nahlas
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  8. Fyzická přístupnost našich zařízení
                </h2>
                <p className="text-gray-700 mb-4">
                  Snažíme se zajistit přístupnost nejen online, ale i fyzicky:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Bezbariérový přístup k recepci a hlavním prostorům</li>
                  <li>Parkovací místa pro osoby se sníženou mobilitou</li>
                  <li>Toalety přizpůsobené pro osoby na vozíku</li>
                  <li>Asistenční psi jsou u nás vítáni</li>
                  <li>Personál je proškolen v komunikaci s osobami se zdravotním postižením</li>
                </ul>
                <p className="text-gray-700 mb-6">
                  <em>
                    Máte-li speciální požadavky, kontaktujte nás prosím předem,
                    abychom mohli zajistit vaši maximální pohodlí.
                  </em>
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  9. Zpětná vazba a pomoc
                </h2>
                <p className="text-gray-700 mb-4">
                  Pokud narazíte na problém s přístupností našich webových stránek,
                  nebo máte návrhy na zlepšení, budeme rádi, když nás budete kontaktovat:
                </p>
                <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <a href="mailto:info@tjkrupka.cz" className="text-indigo-600 hover:underline text-lg">
                      info@tjkrupka.cz
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <a href="tel:+420773090842" className="text-indigo-600 hover:underline text-lg">
                      +420 773 090 842
                    </a>
                  </div>
                  <p className="text-sm text-gray-700">
                    Snažíme se odpovídat na všechny dotazy týkající se přístupnosti
                    do 5 pracovních dnů.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  10. Proces vymáhání práv
                </h2>
                <p className="text-gray-700 mb-4">
                  Pokud nejste spokojeni s naší odpovědí na váš požadavek týkající se
                  přístupnosti, máte právo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    Obrátit se na{" "}
                    <a href="https://www.uoou.cz/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                      Úřad pro ochranu osobních údajů
                    </a>
                  </li>
                  <li>
                    Kontaktovat{" "}
                    <a href="https://www.ochrance.cz/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                      Veřejného ochránce práv
                    </a>
                  </li>
                  <li>Podat stížnost prostřednictvím kontaktního formuláře na webu těchto institucí</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  11. Pravidelné testování a aktualizace
                </h2>
                <p className="text-gray-700 mb-6">
                  Zavazujeme se:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Provádět pravidelné audity přístupnosti (minimálně 1x ročně)</li>
                  <li>Testovat nové funkce před jejich publikováním</li>
                  <li>Pravidelně školit náš tým v otázkách přístupnosti</li>
                  <li>Sledovat nejnovější standardy a best practices</li>
                  <li>Reagovat na zpětnou vazbu uživatelů</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  12. Datum posouzení
                </h2>
                <p className="text-gray-700 mb-6">
                  Toto prohlášení o přístupnosti bylo naposledy přezkoumáno a aktualizováno
                  dne <strong>16. října 2025</strong>.
                </p>
                <p className="text-gray-700 mb-6">
                  Webové stránky byly naposledy technicky testovány z hlediska přístupnosti
                  dne <strong>16. října 2025</strong> prostřednictvím kombinace automatických
                  nástrojů a manuálního testování.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-8">
                  <p className="text-green-800">
                    <strong>Děkujeme vám</strong> za návštěvu našich webových stránek.
                    Vaše zpětná vazba nám pomáhá vytvářet web, který je přístupný pro všechny.
                  </p>
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

export default AccessibilityPage;
