import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FileText, FileSignature, Shield, ScrollText, Printer, X, CheckCircle2 } from "lucide-react";

/* ============================================================
   Sekce DOKUMENTY — členská aplikace TJ Krupka
   - Moje členská přihláška (auto-vytvořená při registraci,
     předvyplněná z dat uživatele, tisknutelná)
   - Stanovy TJ Krupka 2024 (PDF)
   - Podmínky používání
   - Zásady ochrany osobních údajů (GDPR)
   ============================================================ */

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("cs-CZ") : "—";

const TERMS_TEXT = [
  "1. Úvodní ustanovení — Tyto podmínky upravují vztah mezi Tělovýchovnou jednotou Krupka z.s. (IČO 46070516, Husitská 191/8, 417 41 Krupka) a uživatelem členské zóny. Používáním služeb vyjadřujete souhlas s těmito podmínkami.",
  "2. Členská zóna je určena členům a registrovaným uživatelům spolku.",
  "3. Přihlašovací údaje jsou nepřenosné a odpovídáte za jejich použití.",
  "4. Osobní údaje zpracováváme v souladu s GDPR, pouze pro účely členství a informování o aktivitách.",
  "5. Zakázáno je zneužití členských údajů, obtěžování jiných členů a šíření obsahu v rozporu s právem.",
];

const GDPR_TEXT = [
  "1. Správce: Tělovýchovná jednota Krupka z.s., IČO 46070516, Husitská 191/8, 417 41 Krupka, info@tjkrupka.cz.",
  "2. Zpracováváme osobní údaje členů a registrovaných uživatelů: jméno, e-mail, kontaktní a členské údaje.",
  "3. Účel: evidence členství, organizace aktivit a tréninků, informování o činnosti spolku.",
  "4. Právní základ: plnění smlouvy (členství) a oprávněný zájem správce.",
  "5. Údaje neposkytujeme třetím stranám s výjimkou zákonných povinností.",
  "6. Práva: přístup, oprava, výmaz, omezení zpracování, námitka, přenositelnost — pište na info@tjkrupka.cz.",
];

/* ---------- Vyplněná přihláška (tisknutelná) ---------- */
const PrihlaskaView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, profile } = useAuth();

  const fullName =
    profile?.found && (profile.name || profile.surname)
      ? [profile.name, profile.surname].filter(Boolean).join(" ")
      : (user?.user_metadata?.full_name as string) || user?.email || "";

  const created = (user?.user_metadata?.application_created_at as string) || undefined;
  const termsAt = (user?.user_metadata?.terms_accepted_at as string) || undefined;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 print:static print:bg-white print:p-0 print:block">
      <div className="bg-white text-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto print:max-h-none print:overflow-visible shadow-2xl">
        {/* Hlavička tiskárny */}
        <div className="print-hidden flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-2 text-tjk-blue font-bold">
            <FileSignature className="h-5 w-5 text-tjk-orange" /> Členská přihláška — náhled
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-tjk-orange to-amber-500 text-white text-sm font-bold px-4 py-2 rounded-lg"
            >
              <Printer className="h-4 w-4" /> Tisknout
            </button>
            <button onClick={onClose} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-200">
              <X className="h-4 w-4" /> Zavřít
            </button>
          </div>
        </div>

        {/* Dokument */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <p className="font-bold text-lg text-tjk-blue">Tělovýchovná jednota Krupka z.s.</p>
            <p className="text-sm text-gray-600">IČO 46070516 · Husitská 191/8, 417 41 Krupka</p>
            <h3 className="text-xl font-extrabold mt-4 text-tjk-blue uppercase tracking-wide">Členská přihláška</h3>
            <p className="text-xs text-gray-500 mt-1">vygenerováno automaticky · {fmtDate(created)}</p>
          </div>

          <div className="border border-gray-300 rounded-xl p-5 space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Jméno a příjmení</p>
                <p className="font-semibold text-base border-b border-dotted border-gray-400 pb-1">{fullName || "……………………………………"}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-1">E-mail</p>
                <p className="font-semibold text-base border-b border-dotted border-gray-400 pb-1 break-all">{user?.email || "……………………………………"}</p>
              </div>
            </div>
            {profile?.found && profile.oddil && (
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Oddíl</p>
                <p className="font-semibold border-b border-dotted border-gray-400 pb-1">{profile.oddil}</p>
              </div>
            )}
            <div>
              <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Datum podání</p>
              <p className="font-semibold border-b border-dotted border-gray-400 pb-1">{fmtDate(created)}</p>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 text-sm text-gray-700 bg-green-50 border border-green-200 rounded-xl p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <p>
              Souhlas s podmínkami používání a zpracováním osobních údajů byl potvrzen dne{" "}
              <strong>{fmtDate(termsAt)}</strong>.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Podpis žadatele</p>
              <div className="border-b-2 border-gray-400 h-10" />
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Podpis členské rady</p>
              <div className="border-b-2 border-gray-400 h-10" />
            </div>
          </div>

          <p className="mt-8 text-[10px] text-gray-400 leading-relaxed">
            Tato přihláška byla automaticky vygenerována členskou aplikací TJ Krupka na základě registrace uživatele
            v členské zóně. Přihláška se stává platnou po schválení členskou radou spolku.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Dokument — zobrazení textu ---------- */
const TextView: React.FC<{ title: string; lines: string[]; onClose: () => void }> = ({ title, lines, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
    <div className="bg-white text-gray-900 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl z-10">
        <div className="flex items-center gap-2 font-bold text-tjk-blue">
          <FileText className="h-5 w-5 text-tjk-orange" /> {title}
        </div>
        <button onClick={onClose} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-200">
          <X className="h-4 w-4" /> Zavřít
        </button>
      </div>
      <div className="p-6 md:p-8 space-y-3 text-sm leading-relaxed">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
        <p className="text-xs text-gray-400 pt-2">
          Plné znění na webu: https://tjkrupka.cz
        </p>
      </div>
    </div>
  </div>
);

/* ---------- Sekce Dokumenty ---------- */
const Documents: React.FC = () => {
  const [showPrihlaska, setShowPrihlaska] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showGdpr, setShowGdpr] = useState(false);
  const { user } = useAuth();

  const prihlaskaCreated = !!user?.user_metadata?.application_created_at;

  const docs = [
    {
      icon: <FileSignature className="h-5 w-5" />,
      title: "Moje členská přihláška",
      desc: prihlaskaCreated
        ? "Vyplněná při registraci — tisknutelná, k podpisu"
        : "Předvyplněná přihláška k vytištění",
      badge: prihlaskaCreated ? "AUTO" : undefined,
      onClick: () => setShowPrihlaska(true),
    },
    {
      icon: <ScrollText className="h-5 w-5" />,
      title: "Stanovy TJ Krupka",
      desc: "Stanovy spolku (2024) — PDF, 7 stran",
      onClick: () => window.open("/dokumenty/stanovy-tj-krupka-2024.pdf", "_blank"),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Podmínky používání",
      desc: "Pravidla členské zóny a služeb spolku",
      onClick: () => setShowTerms(true),
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "GDPR — ochrana údajů",
      desc: "Jak zpracováváme vaše osobní údaje",
      onClick: () => setShowGdpr(true),
    },
  ];

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur">
      <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4 text-tjk-orange" /> Dokumenty
      </h2>
      <div className="space-y-3">
        {docs.map((d, i) => (
          <button
            key={i}
            onClick={d.onClick}
            className="w-full flex items-center gap-4 bg-black/10 border border-white/10 hover:border-tjk-orange/50 rounded-xl p-4 text-left transition-colors group"
          >
            <div className="h-10 w-10 rounded-lg bg-tjk-orange/15 text-tjk-orange flex items-center justify-center shrink-0 group-hover:bg-tjk-orange/25 transition-colors">
              {d.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold text-sm flex items-center gap-2">
                {d.title}
                {d.badge && (
                  <span className="text-[9px] font-bold bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded uppercase">AUTO</span>
                )}
              </p>
              <p className="text-white/40 text-xs mt-0.5">{d.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {showPrihlaska && <PrihlaskaView onClose={() => setShowPrihlaska(false)} />}
      {showTerms && <TextView title="Podmínky používání" lines={TERMS_TEXT} onClose={() => setShowTerms(false)} />}
      {showGdpr && <TextView title="Zásady ochrany osobních údajů (GDPR)" lines={GDPR_TEXT} onClose={() => setShowGdpr(false)} />}

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:static, .print\\:static * { visibility: visible; }
          .print-hidden { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
};

export default Documents;
