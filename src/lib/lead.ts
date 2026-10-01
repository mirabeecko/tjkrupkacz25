import { CONTACT, FORM_TEXTS } from "@/config/site";

/**
 * Odesílání poptávek z webu.
 *
 * ⚠️ Webhook n8n.webdo24.cz je v době psaní (30. 9. 2026) mimo provoz.
 * Proto `sendLead` nikdy nepředstírá úspěch: když odeslání neprojde, vrátí
 * `false` a formulář nabídne e-mail a telefon (webaudit 3.8 — chybové stavy).
 */
export const N8N_WEBHOOK = "https://n8n.webdo24.cz/webhook/new-lead";

export type LeadPayload = Record<string, unknown>;

export async function sendLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ web_id: "tjkrupka", ...payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Předvyplněný e-mail s celou poptávkou — funguje vždy, i bez webhooku. */
export function buildMailto(subject: string, lines: string[], contact: { name: string; phone: string; email: string }) {
  const body = [
    ...lines,
    "",
    "Kontakt:",
    contact.name,
    contact.phone,
    contact.email,
    "",
    `(Odesláno z webu tjkrupka.cz — formulář neprošel naším kanálem, ${FORM_TEXTS.errors.network})`,
  ].join("\n");
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Formátování ceny v Kč. */
export const czk = (n: number) => `${n.toLocaleString("cs-CZ")} Kč`;
