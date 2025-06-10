import React from "react";
import PageLayout from "@/components/PageLayout";

const Gdpr = () => (
  <PageLayout title="Ochrana osobních údajů (GDPR)">
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-tjk-blue">Ochrana osobních údajů (GDPR)</h1>
      <p className="mb-4">
        Tělovýchovná jednota Krupka z.s. (TJK) zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR).
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Vaše údaje jsou využívány pouze pro účely členství, organizace akcí a komunikace.</li>
        <li>Údaje nejsou předávány třetím stranám bez vašeho souhlasu.</li>
        <li>Kdykoliv můžete požádat o výmaz nebo opravu svých údajů.</li>
      </ul>
      <p>
        Pro více informací nás kontaktujte na <a href="mailto:info@tjkrupka.cz" className="text-tjk-blue underline">info@tjkrupka.cz</a>.
      </p>
    </section>
  </PageLayout>
);

export default Gdpr;
