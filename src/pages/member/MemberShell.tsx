import React from "react";

/* Sdílený shell členské zóny — mobil-first, TJK brand */

export const MemberShell: React.FC<{ children: React.ReactNode; footer?: React.ReactNode }> = ({ children, footer }) => (
  <div className="min-h-screen bg-tjk-dark text-white flex flex-col relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-tjk-orange/15 blur-3xl pointer-events-none" />

    <header className="relative z-10 pt-10 pb-2 flex flex-col items-center">
      <img
        src="/logo-design/tjk-logo-monogram-dark.png"
        alt="TJK Krupka"
        className="h-14 w-14 object-contain"
      />
      <p className="mt-2 text-white/50 text-[11px] uppercase tracking-[0.3em]">
        Členská zóna
      </p>
    </header>

    <main className="relative z-10 flex-1 flex flex-col justify-center px-5 py-8 w-full max-w-md mx-auto">
      {children}
    </main>

    {footer && (
      <footer className="relative z-10 pb-6 text-center text-white/40 text-xs">{footer}</footer>
    )}
  </div>
);

export const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}> = ({ label, type = "text", value, onChange, placeholder, autoComplete }) => (
  <label className="block mb-4">
    <span className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none focus:border-tjk-orange focus:bg-white/10 transition-colors"
    />
  </label>
);
