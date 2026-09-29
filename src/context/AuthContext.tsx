import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

/* ============================================================
   Členský auth — TJ Krupka
   Registrace vytváří čistě Supabase auth účet (email + heslo)
   s metadaty: full_name, terms_accepted_at. Členský profil se
   čte z tabulky members (podle e-mailu, read-only — žádný
   zápis do tabulky s citlivými daty).
   ============================================================ */

export type MemberProfile = {
  name: string | null;
  surname: string | null;
  mail: string | null;
  oddil: string | null;
  funkce_spolek: string | null;
  funkce_vybor: string | null;
  role: number | null;
  member_from: string | null;
  phone: string | null;
  found: boolean;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: MemberProfile | null;
  termsAccepted: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  acceptTerms: () => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<MemberProfile | null>(null);

  const termsAccepted = !!user?.user_metadata?.terms_accepted_at;

  const fetchProfile = useCallback(async (email: string | undefined) => {
    if (!email) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase
      .from("members")
      .select("name, surname, mail, oddil, funkce_spolek, funkce_vybor, role, member_from, phone")
      .eq("mail", email)
      .maybeSingle();
    if (error || !data) {
      setProfile({ name: null, surname: null, mail: email, oddil: null, funkce_spolek: null, funkce_vybor: null, role: null, member_from: null, phone: null, found: false });
      return;
    }
    setProfile({ ...(data as Omit<MemberProfile, "found">), mail: email, found: true });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      fetchProfile(s?.user?.email ?? undefined);
    });
    return () => sub.subscription.unsubscribe();
  }, [fetchProfile]);

  useEffect(() => {
    if (user?.email) fetchProfile(user.email);
  }, [user, fetchProfile]);

  const signUp = async (email: string, password: string, fullName: string) => {
    const now = new Date().toISOString();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          terms_accepted_at: now,
          // automatické vytvoření členské přihlášky při registraci
          application_created_at: now,
          application_auto: true,
        },
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const acceptTerms = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { terms_accepted_at: new Date().toISOString() },
    });
    return { error: error?.message ?? null };
  };

  const refreshProfile = useCallback(async () => {
    await fetchProfile(user?.email ?? undefined);
  }, [user, fetchProfile]);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, profile, termsAccepted, signUp, signIn, signOut, acceptTerms, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth musí být uvnitř AuthProvider");
  return ctx;
};
