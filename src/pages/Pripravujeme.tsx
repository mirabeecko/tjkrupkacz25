import React from "react";
import PageLayout from "@/components/PageLayout";
import { Construction } from "lucide-react";

const Pripravujeme = () => {
  return (
    <PageLayout
      title=""
      description=""
    >
      <div className="flex flex-col items-center justify-center text-center py-20">
        <Construction className="w-24 h-24 text-tjk-orange mb-6" />
        <h1 className="text-4xl font-bold text-tjk-blue mb-4">Již brzy!</h1>
        <p className="text-lg text-gray-600 max-w-md">
          Intenzivně pracujeme na přípravě této stránky. Děkujeme za Vaši trpělivost a těšíme se na Vaši brzkou návštěvu.
        </p>
      </div>
    </PageLayout>
  );
};

export default Pripravujeme;
