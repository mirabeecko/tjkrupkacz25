import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Login from "./Login";
import Register from "./Register";
import TermsGate from "./TermsGate";
import MemberHome from "./MemberHome";

/* Členská zóna — orchestrátor toku:
   1. nepřihlášen → Login / Register
   2. přihlášen bez potvrzených podmínek → TermsGate
   3. přihlášen + podmínky → MemberHome */

const MemberApp: React.FC = () => {
  const { user, loading, termsAccepted, signOut } = useAuth();
  const [view, setView] = useState<"login" | "register">("login");

  // po odhlášení vždy zpět na přihlášení
  useEffect(() => {
    if (!user) setView("login");
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-tjk-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 border-2 border-tjk-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Načítám…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return view === "login" ? (
      <Login onRegister={() => setView("register")} />
    ) : (
      <Register onLogin={() => setView("login")} />
    );
  }

  if (!termsAccepted) {
    return <TermsGate onLogout={signOut} />;
  }

  return <MemberHome />;
};

export default MemberApp;
