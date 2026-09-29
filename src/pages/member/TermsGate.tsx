import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MemberShell } from "./MemberShell";
import { ShieldCheck, AlertCircle, FileText } from "lucide-react";

const TERMS_POINTS = [
  "Členská zóna je určena členům a registrovaným uživatelům Tělovýchovné jednoty Krupka z.s. (IČO 46070516).",
  "Přihlašovací údaje jsou nepřenosné; nesdělujte je třetím osobám.",
  "Informace v členské zóně slouží k organizaci činnosti spolku — aktivit, tréninků a akcí.",
  "Osobní údaje zpracováváme v souladu s GDPR, pouze pro účely členství a informování o aktivitách spolku.",
  "Zakázáno je zneužití členských údajů, obtěžování jiných členů a šíření obsahu v rozporu s právem.",
];

const TermsGate: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { acceptTerms } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const confirm = async () => {
    if (!agreed) return;
    setError(null);
    setBusy(true);
    const res = await acceptTerms();
    setBusy(false);
    if (res.error) setError(res.error);
  };

  return (
    <MemberShell footer="Tělovýchovná jednota Krupka z.s. © 2026">
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="h-8 w-8 text-tjk-orange" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">Podmínky používání</h1>
            <p className="text-white/50 text-xs">Ještě jste je nepotvrdili — prosím přečtěte a odsouhlaste</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-black/20 border border-white/10 rounded-xl p-4 text-white/70 text-sm leading-relaxed max-h-72 overflow-y-auto mb-4">
          <p className="font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-tjk-orange" /> Podmínky používání členské zóny
          </p>
          <ul className="space-y-2">
            {TERMS_POINTS.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-tjk-orange shrink-0">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-white/50 text-xs">
            Plné znění: https://tjkrupka.cz/podminky-pouziti · GDPR: https://tjkrupka.cz/zasady-ochrany-osobnich-udaju
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer select-none mb-5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-5 w-5 rounded accent-tjk-orange shrink-0"
          />
          <span className="text-white/75 text-sm leading-relaxed">
            Souhlasím s podmínkami používání a zpracováním osobních údajů v souladu s GDPR.
          </span>
        </label>

        <button
          onClick={confirm}
          disabled={busy || !agreed}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 disabled:opacity-50 text-white font-bold text-base px-6 py-4 rounded-xl shadow-lg shadow-tjk-orange/20 transition-all"
        >
          {busy ? "Ukládám…" : "Potvrdit a pokračovat"}
        </button>

        <button onClick={onLogout} className="mt-4 w-full text-white/50 text-sm hover:text-white transition-colors">
          Odhlásit se
        </button>
      </div>
    </MemberShell>
  );
};

export default TermsGate;
