import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Mail, Phone } from "lucide-react";

const TermsOfService = () => {
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
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FileText className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Podmínky použití
              </h1>
              <p className="text-xl text-emerald-100">
                Pravidla pro používání našich služeb a webu
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
                  1. Úvodní ustanovení
                </h2>
                <p className="text-gray-700 mb-6">
                  Tyto podmínky použití upravují vztah mezi Tělovýchovnou jednotou Krupka z.s.
                  (dále jen "poskytovatel") a uživateli našich služeb a webových stránek
                  (dále jen "uživatel"). Používáním našich služeb vyjadřujete souhlas
                  s těmito podmínkami.
                </p>

                <div className="bg-emerald-50 p-6 rounded-lg mb-6">
                  <p className="font-semibold text-gray-900 mb-2">Poskytovatel služeb:</p>
                  <p className="text-gray-700">Tělovýchovná jednota Krupka z.s.</p>
                  <p className="text-gray-700">IČO: 46070516</p>
                  <p className="text-gray-700">Sídlo: Husitská 191/8, 417 41 Krupka</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <a href="mailto:info@tjkrupka.cz" className="text-emerald-600 hover:underline">
                      info@tjkrupka.cz
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <a href="tel:+420773090842" className="text-emerald-600 hover:underline">
                      +420 773 090 842
                    </a>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  2. Rezervace a objednávky
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>2.1 Platnost rezervace:</strong> Rezervace kurzu nebo služby je platná
                  po potvrzení ze strany poskytovatele emailem nebo telefonicky.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>2.2 Záloha:</strong> Pro potvrzení některých služeb může být požadována
                  záloha ve výši 30-50% celkové ceny. Výše zálohy bude upřesnena při rezervaci.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>2.3 Doplatek:</strong> Zbývající část ceny je splatná před zahájením
                  služby, pokud není dohodnuto jinak.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  3. Storno podmínky
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    <strong>Více než 14 dní před zahájením:</strong> Storno bez poplatku,
                    vrácení 100% zaplacené částky
                  </li>
                  <li>
                    <strong>7-14 dní před zahájením:</strong> Storno poplatek 30%,
                    vrácení 70% zaplacené částky
                  </li>
                  <li>
                    <strong>3-7 dní před zahájením:</strong> Storno poplatek 50%,
                    vrácení 50% zaplacené částky
                  </li>
                  <li>
                    <strong>Méně než 3 dny před zahájením:</strong> Storno poplatek 100%,
                    bez vrácení peněz
                  </li>
                  <li>
                    <strong>Nedostavení se:</strong> Žádné vrácení peněz
                  </li>
                </ul>
                <p className="text-gray-700 mb-6">
                  <em>V případě vážných zdravotních důvodů (nutno doložit lékařským potvrzením)
                  nebo nepříznivých povětrnostních podmínek (rozhoduje poskytovatel) může být
                  dohodnuto posunutí termínu bez storno poplatku.</em>
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  4. Pravidla bezpečnosti a chování
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>4.1 Povinnosti účastníka:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Dodržovat pokyny instruktora</li>
                  <li>Používat předepsané bezpečnostní vybavení</li>
                  <li>Informovat instruktora o zdravotních problémech</li>
                  <li>Být fyzicky a psychicky způsobilý k účasti</li>
                  <li>Být střízlivý (zákaz alkoholu a drog)</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  <strong>4.2 Vyloučení:</strong> Poskytovatel má právo vyloučit účastníka,
                  který porušuje bezpečnostní pravidla nebo se chová nevhodně, bez nároku
                  na vrácení peněz.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>4.3 Věkové omezení:</strong> Děti mladší 15 let musí být doprovázeny
                  dospělou osobou. Pro některé aktivity může platit vyšší věkový limit.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  5. Odpovědnost a pojištění
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>5.1 Pojištění poskytovatele:</strong> Poskytovatel je pojištěn
                  pro případy odpovědnosti za škodu způsobenou při poskytování služeb.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>5.2 Pojištění účastníka:</strong> Doporučujeme uzavřít cestovní
                  pojištění včetně úrazového připojištění. Úraz vzniklý při sportovní
                  aktivitě nemusí být kryt standardním zdravotním pojištěním.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>5.3 Omezení odpovědnosti:</strong> Poskytovatel neodpovídá za škody
                  vzniklé v důsledku:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Nedodržení pokynů instruktora</li>
                  <li>Zatajení zdravotních problémů</li>
                  <li>Chování účastníka pod vlivem alkoholu nebo drog</li>
                  <li>Vyšší moci (extrémní počasí, přírodní katastrofy)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  6. Půjčovna vybavení
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>6.1 Kauce:</strong> Pro zapůjčení vybavení (motocykly, sportovní
                  vybavení) je nutné složit kauci. Výše kauce se liší podle typu vybavení.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>6.2 Odpovědnost za škodu:</strong> Účastník odpovídá za škody
                  na zapůjčeném vybavení způsobené nedbalostí nebo nesprávným použitím.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>6.3 Kontrola stavu:</strong> Před převzetím i vrácením vybavení
                  proběhne kontrola stavu za přítomnosti obou stran.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  7. Ubytování
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>7.1 Check-in/Check-out:</strong> Standardní čas pro check-in
                  je od 15:00, check-out do 10:00, pokud není dohodnuto jinak.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>7.2 Odpovědnost za škody:</strong> Účastník odpovídá za škody
                  způsobené na ubytovacím zařízení a inventáři.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>7.3 Pravidla pobytu:</strong> V ubytování je zakázáno kouření,
                  hlučné chování po 22:00 a pořádání večírků bez předchozího souhlasu.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  8. Změny a zrušení ze strany poskytovatele
                </h2>
                <p className="text-gray-700 mb-4">
                  Poskytovatel si vyhrazuje právo zrušit nebo přesunout akci v případě:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Nepříznivých povětrnostních podmínek</li>
                  <li>Nedostatečného počtu účastníků (minimum 3 osoby)</li>
                  <li>Zdravotních důvodů instruktora</li>
                  <li>Vyšší moci</li>
                </ul>
                <p className="text-gray-700 mb-6">
                  V případě zrušení ze strany poskytovatele bude účastníkovi vrácena
                  100% zaplacené částky nebo nabídnut náhradní termín.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  9. Používání webu
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>9.1 Autorská práva:</strong> Veškerý obsah webu (texty, obrázky,
                  loga, videa) je chráněn autorskými právy a nesmí být kopírován bez
                  předchozího souhlasu.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>9.2 Zákaz zneužití:</strong> Je zakázáno používat web pro
                  nezákonné účely, šíření virů, spam nebo jiné škodlivé aktivity.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>9.3 Odkazy:</strong> Web může obsahovat odkazy na externí
                  stránky. Za jejich obsah neneseme odpovědnost.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  10. Ochrana osobních údajů
                </h2>
                <p className="text-gray-700 mb-6">
                  Zpracování osobních údajů se řídí platnými právními předpisy (GDPR).
                  Více informací najdete v našich{" "}
                  <a href="/zasady-ochrany-osobnich-udaju" className="text-emerald-600 hover:underline">
                    Zásadách ochrany osobních údajů
                  </a>.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  11. Řešení sporů
                </h2>
                <p className="text-gray-700 mb-6">
                  V případě sporu se strany pokusí o smírné řešení. Není-li to možné,
                  bude spor řešen u příslušného soudu České republiky podle českého práva.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  12. Závěrečná ustanovení
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>12.1 Změny podmínek:</strong> Poskytovatel si vyhrazuje právo
                  tyto podmínky měnit. O změnách budeme uživatele informovat na webových
                  stránkách.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>12.2 Oddělitelnost:</strong> Pokud je některé ustanovení těchto
                  podmínek neplatné nebo nevymahatelné, ostatní ustanovení zůstávají
                  v platnosti.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>12.3 Účinnost:</strong> Tyto podmínky nabývají účinnosti dnem
                  16. října 2025.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  13. Kontakt
                </h2>
                <p className="text-gray-700 mb-4">
                  Pro dotazy ohledně podmínek použití nás kontaktujte:
                </p>
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <a href="mailto:info@tjkrupka.cz" className="text-emerald-600 hover:underline text-lg">
                      info@tjkrupka.cz
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <a href="tel:+420773090842" className="text-emerald-600 hover:underline text-lg">
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

export default TermsOfService;
