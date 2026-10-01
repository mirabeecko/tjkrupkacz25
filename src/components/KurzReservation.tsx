import React, { useMemo, useState } from "react";
import { CalendarCheck, Check, Clock, Loader2, Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  APP_URL,
  CONTACT,
  COURSES,
  COURSE_INDIVIDUAL,
  FORM_TEXTS,
  appLink,
} from "@/config/site";
import { buildMailto, czk, sendLead } from "@/lib/lead";

/**
 * Rezervační blok produktu SNOWKITE KURZY (webaudit B17 + 3.8).
 *
 * Je jen o kurzech — airbag má vlastní samostatný blok (AirbagReservation).
 * Oba produkty jsou oddělené, nemíchají se do jednoho formuláře.
 */
const KurzReservation: React.FC<{ id?: string }> = ({ id = "rezervace-kurz" }) => {
  const [level, setLevel] = useState(COURSES[0].title);
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const course = COURSES.find((c) => c.title === level) ?? COURSES[0];

  const estimate = useMemo(() => course.priceFrom * people, [course, people]);

  const lines = useMemo(
    () => [
      `Produkt: Kurz snowkitingu — ${course.title} (${course.duration})`,
      `Cena v ceníku: ${course.price} za osobu`,
      `Počet osob: ${people}`,
      date ? `Preferovaný termín: ${date}` : "Preferovaný termín: (neuvedeno)",
      `Orientační cena: ${czk(estimate)}`,
      note ? `Poznámka: ${note}` : "",
    ].filter(Boolean),
    [course, people, date, note, estimate],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setState("error");
      return;
    }
    setState("sending");
    const ok = await sendLead({
      source: "Poptávka kurzu snowkitingu (webaudit)",
      produkt: "snowkite kurz",
      uroven: course.title,
      doba_trvani: course.duration,
      pocet_osob: people,
      preferovany_termin: date || null,
      orientacni_cena_czk: estimate,
      jmeno: name,
      telefon: phone,
      email,
      poznamka: note,
    });
    setState(ok ? "sent" : "error");
  };

  return (
    <section id={id} className="py-16 md:py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tjk-blue text-white text-xs font-semibold uppercase tracking-wide mb-4">
            Snowkite kurzy
          </span>
          <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-3">
            {FORM_TEXTS.course.title}
          </h2>
          <p className="font-inter text-base md:text-lg text-gray-600">{FORM_TEXTS.course.subtitle}</p>
        </div>

        <form onSubmit={submit} className="bg-tjk-light border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-5">
            <label className="block md:col-span-2">
              <span className="block text-sm font-semibold text-gray-700 mb-2">Úroveň kurzu</span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              >
                {COURSES.map((c) => (
                  <option key={c.title} value={c.title}>
                    {c.title} — {c.duration} — {c.price}
                  </option>
                ))}
                <option value="Individuální lekce">
                  {COURSE_INDIVIDUAL.title} — {COURSE_INDIVIDUAL.duration} — {COURSE_INDIVIDUAL.price}
                </option>
              </select>
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Počet osob
              </span>
              <input
                type="number"
                min={1}
                max={20}
                value={people}
                onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-2">Preferovaný termín</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Úroveň / zkušenosti
              </span>
              <input
                type="text"
                placeholder="Ježdění na lyžích, s drakem…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-2">Jméno a příjmení *</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-2">Telefon *</span>
              <input
                type="tel"
                required
                placeholder="777 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tjk-orange focus:outline-none bg-white"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white rounded-2xl border border-gray-200 px-5 py-4">
            <span className="font-inter text-gray-600">
              Orientační cena kurzu
              <span className="block text-xs text-gray-500">
                podle ceníku, {course.price} za osobu — potvrdíme e-mailem
              </span>
            </span>
            <span className="font-poppins font-black text-2xl md:text-3xl text-tjk-orange">{czk(estimate)}</span>
          </div>

          <p className="mt-4 text-xs text-gray-500 font-inter">{FORM_TEXTS.gdpr}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href={appLink("kurz-rezervace")} className="sm:flex-1" target="_blank" rel="noopener noreferrer">
              <Button
                type="button"
                size="lg"
                className="w-full bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-bold rounded-2xl py-6"
              >
                <CalendarCheck className="mr-2 h-5 w-5" />
                Rezervovat kurz v aplikaci
              </Button>
            </a>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              disabled={state === "sending"}
              className="sm:flex-1 border-2 border-tjk-blue text-tjk-blue hover:bg-tjk-blue/5 font-poppins font-semibold rounded-2xl py-6 bg-white"
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {FORM_TEXTS.errors.sending}
                </>
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5" /> {FORM_TEXTS.course.submit}
                </>
              )}
            </Button>
          </div>

          {state === "sent" && (
            <div className="mt-4 rounded-2xl bg-green-50 border border-green-200 p-4 font-inter text-green-900">
              <Check className="inline h-5 w-5 mr-2" />
              {FORM_TEXTS.course.success}
            </div>
          )}

          {state === "error" && (
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 font-inter text-amber-900">
              <p className="mb-3">
                Vyplňte prosím jméno, telefon a e-mail. Když odeslání neprojde, zkuste to znovu —
                nebo nám napište a zavolejte:
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={buildMailto(`Poptávka kurzu ${course.title}`, lines, { name, phone, email })}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-amber-300 px-4 py-2 font-semibold"
                >
                  <Mail className="h-4 w-4" /> Poslat e-mailem
                </a>
                <a
                  href={`tel:${CONTACT.phoneSnowkiting.tel}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-amber-300 px-4 py-2 font-semibold"
                >
                  <Phone className="h-4 w-4" /> {CONTACT.phoneSnowkiting.label}
                </a>
              </div>
            </div>
          )}

          <p className="mt-5 text-xs text-gray-500 font-inter">
            Platba a potvrzení termínu probíhají v aplikaci{" "}
            <a href={APP_URL} className="underline">
              app.tjkrupka.cz
            </a>
            . Tady si vybíráte kurz a my se vám ozveme.
          </p>
        </form>
      </div>
    </section>
  );
};

export default KurzReservation;
