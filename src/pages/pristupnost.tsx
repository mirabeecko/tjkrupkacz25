import React from "react";
import PageLayout from "@/components/PageLayout";

const Pristupnost = () => (
  <PageLayout title="Prohlášení o přístupnosti">
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-tjk-blue">Prohlášení o přístupnosti</h1>
      <p className="mb-4">
        Tělovýchovná jednota Krupka z.s. se zavazuje zpřístupnit svůj webový obsah v souladu se zákonem č. 99/2019 Sb., o přístupnosti internetových stránek.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Web je navržen s ohledem na maximální přístupnost pro všechny uživatele.</li>
        <li>Obsah je strukturován a popsán pro čtečky obrazovky.</li>
        <li>V případě problémů s přístupností nás kontaktujte na <a href="mailto:info@tjkrupka.cz" className="text-tjk-blue underline">info@tjkrupka.cz</a>.</li>
      </ul>
      <p>
        Web průběžně testujeme a vylepšujeme, aby byl dostupný všem bez omezení.
      </p>
    </section>
  </PageLayout>
);

export default Pristupnost;
