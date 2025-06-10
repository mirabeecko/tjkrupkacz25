import React from "react";
import PageLayout from "@/components/PageLayout";

const Podminky = () => (
  <PageLayout title="Obchodní podmínky">
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-tjk-blue">Obchodní podmínky</h1>
      <p className="mb-4">
        Tyto obchodní podmínky upravují práva a povinnosti mezi Tělovýchovnou jednotou Krupka z.s. a jejími členy či návštěvníky areálu.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Účast na akcích je dobrovolná a na vlastní odpovědnost.</li>
        <li>Členství vzniká vyplněním přihlášky a schválením výborem TJK.</li>
        <li>Platba členských příspěvků je povinná dle aktuálního sazebníku.</li>
        <li>Provozní řád areálu je závazný pro všechny návštěvníky.</li>
      </ul>
      <p>
        Podrobné informace získáte na <a href="mailto:info@tjkrupka.cz" className="text-tjk-blue underline">info@tjkrupka.cz</a>.
      </p>
    </section>
  </PageLayout>
);

export default Podminky;
