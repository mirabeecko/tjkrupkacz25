import React from "react";
import PageLayout from "@/components/PageLayout";

const Cookies = () => (
  <PageLayout title="Zásady používání cookies">
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-tjk-blue">Zásady používání cookies</h1>
      <p className="mb-4">
        Web Tělovýchovné jednoty Krupka z.s. používá cookies pro zajištění správné funkčnosti, analýzu návštěvnosti a zlepšení uživatelského zážitku.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Cookies můžete kdykoliv ve svém prohlížeči zakázat.</li>
        <li>Cookies neslouží k identifikaci konkrétní osoby.</li>
        <li>Využíváme pouze nezbytné a analytické cookies.</li>
      </ul>
      <p>
        Dalším používáním webu souhlasíte s využitím cookies. Pro více informací nás kontaktujte na <a href="mailto:info@tjkrupka.cz" className="text-tjk-blue underline">info@tjkrupka.cz</a>.
      </p>
    </section>
  </PageLayout>
);

export default Cookies;
