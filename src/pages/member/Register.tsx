import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MemberShell, Field } from "./MemberShell";
import { UserPlus, AlertCircle, CheckCircle2, FileText } from "lucide-react";

const TERMS_SUMMARY = [
  "Členství a registrace v členské zóně se řídí podmínkami TJ Krupka z.s. (IČO 46070516).",
  "Osobní údaje zpracováváme dle zásad ochrany osobních údajů (GDPR) — pouze pro účely členství a informování o aktivitách.",
  "Přihlašovací údaje nesdělujte třetím osobám; za jejich použití odpovídáte vy.",
  "Členská zóna slouží členům a registrovaným uživatelům TJ Krupka.",
];

const Register: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků.");
      return;
    }
    if (password !== password2) {
      setError("Hesla se neshodují.");
      return;
    }
    if (!terms) {
      setError("Pro registraci je nutné souhlasit s podmínkami používání.");
      return;
    }
    setBusy(true);
    const res = await signUp(email.trim(), password, name.trim());
    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <MemberShell footer="Tělovýchovná jednota Krupka z.s. © 2026">
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
          <CheckCircle2 className="h-14 w-14 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Registrace proběhla</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Na vaši e-mailovou adresu jsme odeslali potvrzovací odkaz. Po jeho
            potvrzení se můžete přihlásit do členské zóny.
          </p>
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-tjk-orange to-amber-500 text-white font-bold px-6 py-4 rounded-xl"
          >
            Přejít na přihlášení
          </button>
        </div>
      </MemberShell>
    );
  }

  return (
    <MemberShell footer="Tělovýchovná jednota Krupka z.s. © 2026">
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Registrace člena</h1>
        <p className="text-white/50 text-sm mb-6">Vytvořte si účet do členské zóny TJ Krupka</p>

        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit}>
          <Field label="Jméno a příjmení" value={name} onChange={setName} placeholder="Jan Novák" autoComplete="name" />
          <Field label="E-mail" type="email" value={email} onChange={setEmail} placeholder="vas@email.cz" autoComplete="email" />
          <Field label="Heslo (min. 6 znaků)" type="password" value={password} onChange={setPassword} placeholder="••••••••" autoComplete="new-password" />
          <Field label="Heslo znovu" type="password" value={password2} onChange={setPassword2} placeholder="••••••••" autoComplete="new-password" />

          {/* Podmínky používání */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setTermsOpen(!termsOpen)}
              className="inline-flex items-center gap-1.5 text-tjk-orange text-sm font-semibold hover:underline"
            >
              <FileText className="h-4 w-4" />
              {termsOpen ? "Skrýt podmínky používání" : "Zobrazit podmínky používání"}
            </button>

            {termsOpen && (
              <div className="mt-3 bg-black/20 border border-white/10 rounded-xl p-4 text-white/70 text-sm leading-relaxed max-h-56 overflow-y-auto">
                <p className="font-bold text-white mb-2">Podmínky používání — výtah</p>
                <ul className="space-y-2">
                  {TERMS_SUMMARY.map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-tjk-orange shrink-0">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-white/50 text-xs">
                  Plné znění: https://tjkrupka.cz/podminky-pouziti
                </p>
              </div>
            )}

            <label className="mt-3 flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-5 w-5 rounded accent-tjk-orange shrink-0"
              />
              <span className="text-white/75 text-sm leading-relaxed">
                Souhlasím s <span className="text-tjk-orange font-semibold">podmínkami používání</span>{" "}
                a zpracováním osobních údajů v souladu s GDPR.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={busy || !name || !email || !password}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 disabled:opacity-50 text-white font-bold text-base px-6 py-4 rounded-xl shadow-lg shadow-tjk-orange/20 transition-all"
          >
            <UserPlus className="h-5 w-5" />
            {busy ? "Registruji…" : "Registrovat se"}
          </button>
        </form>

        <p className="mt-5 text-center text-white/50 text-sm">
          Již máte účet?{" "}
          <button onClick={onLogin} className="text-tjk-orange font-semibold hover:underline">
            Přihlásit se
          </button>
        </p>
      </div>
    </MemberShell>
  );
};

export default Register;
