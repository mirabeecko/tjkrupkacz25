import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MemberShell, Field } from "./MemberShell";
import { LogIn, AlertCircle } from "lucide-react";

const Login: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await signIn(email.trim(), password);
    setBusy(false);
    if (res.error) setError(res.error);
  };

  return (
    <MemberShell footer="Tělovýchovná jednota Krupka z.s. © 2026">
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Přihlášení</h1>
        <p className="text-white/50 text-sm mb-6">Přihlaste se do členské zóny TJ Krupka</p>

        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit}>
          <Field label="E-mail" type="email" value={email} onChange={setEmail} placeholder="vas@email.cz" autoComplete="email" />
          <Field label="Heslo" type="password" value={password} onChange={setPassword} placeholder="••••••••" autoComplete="current-password" />

          <button
            type="submit"
            disabled={busy || !email || !password}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 disabled:opacity-50 text-white font-bold text-base px-6 py-4 rounded-xl shadow-lg shadow-tjk-orange/20 transition-all"
          >
            <LogIn className="h-5 w-5" />
            {busy ? "Přihlašuji…" : "Přihlásit se"}
          </button>
        </form>

        <p className="mt-5 text-center text-white/50 text-sm">
          Ještě nejste členem?{" "}
          <button onClick={onRegister} className="text-tjk-orange font-semibold hover:underline">
            Registrovat se
          </button>
        </p>
      </div>
    </MemberShell>
  );
};

export default Login;
