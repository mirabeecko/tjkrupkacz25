import React from "react";
import { useAuth } from "@/context/AuthContext";
import { MemberShell } from "./MemberShell";
import Documents from "./Documents";
import { LogOut, User, Medal, Phone, Mail, RefreshCw, CheckCircle2 } from "lucide-react";

const MemberHome: React.FC = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();

  const fullName =
    profile?.found && (profile.name || profile.surname)
      ? [profile.name, profile.surname].filter(Boolean).join(" ")
      : (user?.user_metadata?.full_name as string) || user?.email?.split("@")[0] || "Člen";

  const rows: { label: string; value: string | null | undefined }[] = [
    { label: "E-mail", value: user?.email },
    { label: "Oddíl", value: profile?.found ? profile.oddil : null },
    { label: "Funkce ve spolku", value: profile?.found ? profile.funkce_spolek : null },
    { label: "Funkce ve výboru", value: profile?.found ? profile.funkce_vybor : null },
    { label: "Členem od", value: profile?.found ? profile.member_from : null },
    { label: "Telefon", value: profile?.found ? profile.phone : null },
  ].filter((r) => r.value);

  return (
    <MemberShell footer="Tělovýchovná jednota Krupka z.s. © 2026">
      <div className="space-y-4">
        {/* Profil */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-tjk-orange to-amber-500 flex items-center justify-center shrink-0">
              <User className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold truncate">{fullName}</h1>
              <p className="text-white/50 text-sm truncate">{user?.email}</p>
            </div>
          </div>

          {profile?.found && (
            <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-3.5 w-3.5" /> Ověřený člen
            </div>
          )}
          {profile && !profile.found && (
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 text-xs font-semibold px-3 py-1.5 rounded-full">
              Registrovaný uživatel (členský profil se doplní po ověření)
            </div>
          )}
        </div>

        {/* Údaje */}
        {rows.length > 0 && (
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Medal className="h-4 w-4 text-tjk-orange" /> Členské údaje
            </h2>
            <dl className="space-y-3">
              {rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-4">
                  <dt className="text-white/50 text-sm shrink-0">{r.label}</dt>
                  <dd className="text-white text-sm font-medium text-right break-all">{r.value}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={refreshProfile}
              className="mt-4 inline-flex items-center gap-1.5 text-white/40 text-xs hover:text-white transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Obnovit údaje
            </button>
          </div>
        )}

        {/* Dokumenty */}
        <Documents />

        {/* Kontakt */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur text-sm">
          <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Potřebujete pomoci?</h2>
          <a href="mailto:info@tjkrupka.cz" className="flex items-center gap-2 text-white/70 hover:text-tjk-orange transition-colors mb-2">
            <Mail className="h-4 w-4 text-tjk-orange" /> info@tjkrupka.cz
          </a>
          <a href="tel:+420773090842" className="flex items-center gap-2 text-white/70 hover:text-tjk-orange transition-colors">
            <Phone className="h-4 w-4 text-tjk-orange" /> +420 773 090 842
          </a>
        </div>

        <button
          onClick={signOut}
          className="w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-white/80 font-semibold text-base px-6 py-4 rounded-xl transition-all"
        >
          <LogOut className="h-5 w-5" /> Odhlásit se
        </button>
      </div>
    </MemberShell>
  );
};

export default MemberHome;
