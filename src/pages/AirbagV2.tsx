import React, { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShieldCheck, Rabbit, Smile, BrainCircuit, Users, MapPin, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

/* ============================================================
   AIRBAG — koncept „MĚKKÝ DOPAD"
   Design DNA: H6 / T4 / C3 / S8 / R4 / F7 / M3
   Prvky: P11 (tilt karty) · P06 (count-up) · P09 (line reveal)
   ============================================================ */

const mono = { fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" };

const styleBlock = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');

.ab-grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
  background-size: 64px 64px;
}

/* ---- P09: line reveal (hero) ---- */
.ab-line { display:block; overflow:hidden; }
.ab-line > span {
  display:block;
  transform: translateY(115%);
  animation: abLineUp 1s cubic-bezier(.19,1,.22,1) forwards;
}
.ab-line:nth-child(1) > span { animation-delay: .15s; }
.ab-line:nth-child(2) > span { animation-delay: .3s; }
@keyframes abLineUp { to { transform: translateY(0); } }

/* ---- R4: marquee ---- */
.ab-marquee { overflow:hidden; white-space:nowrap; }
.ab-marquee-track {
  display:inline-block;
  animation: abMarquee 28s linear infinite;
}
.ab-marquee:hover .ab-marquee-track { animation-play-state: paused; }
@keyframes abMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ---- P11: tilt cards ---- */
.ab-tilt { transform-style: preserve-3d; will-change: transform; }
.ab-tilt-glare {
  position:absolute; inset:0; pointer-events:none; opacity:0; transition: opacity .35s ease;
  background: radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.28), transparent 55%);
}
.ab-tilt:hover .ab-tilt-glare { opacity:1; }

/* ---- P06: count-up ---- */
.ab-stat-num { font-variant-numeric: tabular-nums; }

/* ---- editoriální řádky ---- */
.ab-row { transition: background .3s ease, padding .3s ease; }
.ab-row:hover { background: rgba(255,87,34,.06); padding-left: 1.25rem; }
.ab-row-num { transition: color .3s ease; }
.ab-row:hover .ab-row-num { color: #FF5722; }

/* ---- parallax (M3) ---- */
.ab-parallax { background-attachment: fixed; background-size: cover; background-position: center; }
@media (max-width: 768px) { .ab-parallax { background-attachment: scroll; } }

/* ---- reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .ab-line > span { animation: none; transform: none; }
  .ab-marquee-track { animation: none; }
  .ab-tilt { transform: none !important; }
}
`;

/* ---------- P11: TiltCard ---------- */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 10;
    const ry = (px - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`ab-tilt relative ${className}`}>
      {children}
      <div className="ab-tilt-glare" />
    </div>
  );
};

/* ---------- P06: CountUp ---------- */
const CountUp: React.FC<{ value: number; suffix?: string; label: string; delay?: number }> = ({ value, suffix = "", label, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reduced) { setShown(value); return; }
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setShown(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="ab-stat-num font-extrabold text-5xl md:text-6xl text-white" style={mono}>
        {shown}
        <span className="text-tjk-orange">{suffix}</span>
      </div>
      <div className="mt-3 text-sm md:text-base uppercase tracking-[0.2em] text-white/60" style={mono}>
        {label}
      </div>
    </div>
  );
};

/* ---------- data ---------- */
const disciplines = [
  {
    index: "01",
    title: "Snowboard & lyže",
    text: "Flipy, graby a skoky na prkně — nácvik bez obav z dopadu.",
    img: "/images/homepage/jj-kom-jump.jpg",
    alt: "Skokan ve vzduchu nad sjezdovkou",
  },
  {
    index: "02",
    title: "Snowkiting",
    text: "Vítr, hory a bezpečná zóna pro vaše nejodvážnější kousky.",
    img: "/images/snowkiting/jj_top_ride_promo.jpg",
    alt: "Snowkiter na svahu Krušných hor",
  },
  {
    index: "03",
    title: "Děti a mládež",
    text: "Bezpečné prostředí, kde se malí jezdci učí základy i první triky.",
    img: "/images/deti/father_son.jpg",
    alt: "Otec s dítětem na lyžích",
  },
  {
    index: "04",
    title: "Skupiny & team",
    text: "Teambuildingy, soustředění a sportovní školy v exkluzivním pronájmu.",
    img: "/images/homepage/okoli.jpg",
    alt: "Krušné hory a okolí Komárky",
  },
];

const steps = [
  { num: "01", title: "Rezervace", text: "Kontaktujte nás a rezervujte si termín pro trénink na AIRBAG matraci." },
  { num: "02", title: "Instruktáž", text: "Projdete bezpečnostní instruktáž a seznámíte se s pravidly používání." },
  { num: "03", title: "Trénink", text: "Trénujte pod dohledem instruktora a zdokonalujte své dovednosti." },
  { num: "04", title: "Progres", text: "Sledujte svůj pokrok a postupně zvyšujte náročnost triků." },
];

const AirbagV2 = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <style>{styleBlock}</style>
      <SEO
        title="AIRBAG Matrace — Bezpečný trénink triků | TJ Krupka"
        description="Profesionální AIRBAG matrace v Komárce pro bezpečný nácvik triků — snowboard, lyže, snowkiting, freestyle bike, skate. Pro všechny úrovně."
        image="/images/homepage/airbag.avif"
        url="https://tjkrupka.cz/airbag"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* ============ HERO — H6 typography-led, centered ============ */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-tjk-dark text-white">
          <div className="absolute inset-0 ab-grid-bg" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full bg-tjk-orange/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 container px-4 py-24 text-center max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-3 px-5 py-2 border border-white/15 rounded-full text-white/70 text-xs md:text-sm uppercase tracking-[0.25em]" style={mono}>
              <span className="w-2 h-2 rounded-full bg-tjk-orange animate-pulse" />
              TJ Krupka · Komárka · Krušné hory
            </div>

            <h1 className="font-poppins font-extrabold leading-none text-[17vw] sm:text-[13vw] lg:text-[9rem]">
              <span className="ab-line"><span className="text-white drop-shadow-2xl">AIR</span></span>
              <span className="ab-line"><span className="bg-gradient-to-r from-tjk-orange via-amber-400 to-tjk-orange bg-clip-text text-transparent">BAG</span></span>
            </h1>

            <p className="ab-line mt-6">
              <span className="block text-xl md:text-3xl font-semibold text-white/95">
                Měkký dopad. Tvrdý progres.
              </span>
            </p>

            <p className="ab-line mt-5 max-w-2xl mx-auto text-white/70 text-base md:text-lg leading-relaxed">
              <span className="block">
                Profesionální dopadová matrace pro bezpečný nácvik triků, skoků
                a akrobatických prvků — od prvního skoku po závodní úroveň.
              </span>
            </p>

            <div className="ab-line mt-8 flex flex-wrap justify-center gap-3" style={mono}>
              {["SNOWBOARD", "LYŽE", "SNOWKITING", "BIKE", "SKATE"].map((s) => (
                <span key={s} className="px-4 py-2 border border-white/15 bg-white/5 rounded-md text-white/70 text-xs md:text-sm tracking-widest">
                  {s}
                </span>
              ))}
            </div>

            <div className="ab-line mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl shadow-tjk-orange/30 hover:scale-105 transition-all duration-300">
                  Rezervovat trénink
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#jak">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/5 backdrop-blur hover:bg-white/15 font-bold text-lg px-10 py-7 rounded-xl">
                  Jak to funguje
                </Button>
              </a>
            </div>
          </div>

          <a href="#produkt" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors" aria-label="Posunout níže">
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </a>
        </section>

        {/* ============ R4: MARQUEE pás disciplín ============ */}
        <section className="bg-white border-y border-gray-200 py-5 overflow-hidden">
          <div className="ab-marquee">
            <div className="ab-marquee-track">
              {[0, 1].map((copy) => (
                <span key={copy} className="inline-block">
                  {["SNOWBOARD", "LYŽE", "SNOWKITING", "FREESTYLE", "BMX", "SKATE", "TRICKY", "FLIPY", "GRABY", "SKOKY"].map((w, i) => (
                    <span key={i} className="inline-flex items-center">
                      <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-tjk-blue px-6" style={mono}>
                        {w}
                      </span>
                      <span className="text-tjk-orange text-2xl">✕</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRODUKT — fotka + benefity (M3 parallax na showcase) ============ */}
        <section id="produkt" className="relative">
          <div
            className="ab-parallax min-h-[70vh] md:min-h-[85vh] relative flex items-end"
            style={{ backgroundImage: "url('/images/homepage/airbag.avif')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="relative z-10 container px-4 pb-16 pt-40">
              <ScrollAnimation animation="slideUp">
                <p className="mb-4 text-tjk-orange text-xs md:text-sm uppercase tracking-[0.3em] font-bold" style={mono}>
                  Profesionální tréninkové zařízení
                </p>
                <h2 className="font-poppins font-extrabold text-3xl md:text-6xl text-white max-w-3xl leading-tight">
                  Trénink, který <span className="text-tjk-orange">nebolí</span> — ani když to nevyjde.
                </h2>
                <p className="mt-5 max-w-2xl text-white/80 text-base md:text-xl leading-relaxed">
                  AIRBAG matrace splňující bezpečnostní normy absorbuje dopad a nechá vás
                  opakovat prvek znovu a znovu — dokud ho neuděláte. To je nejkratší cesta
                  k novým trikům.
                </p>
              </ScrollAnimation>
            </div>
          </div>

          {/* Benefity — editoriální řádky 01–04 */}
          <div className="bg-white py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <ScrollAnimation animation="slideUp">
                <p className="mb-3 text-tjk-orange text-xs uppercase tracking-[0.3em] font-bold" style={mono}>
                  // Proč trénovat s námi
                </p>
                <h2 className="font-poppins font-extrabold text-3xl md:text-5xl text-tjk-blue mb-12">
                  Čtyři důvody, proč spadnout právě tady
                </h2>
              </ScrollAnimation>

              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {[
                  { icon: <ShieldCheck className="h-6 w-6" />, title: "Maximální bezpečnost", text: "Trénujte bez rizika. Matrace garantuje měkké a bezpečné dopady." },
                  { icon: <Rabbit className="h-6 w-6" />, title: "Rychlý progres", text: "Opakujte triky do dokonalosti a posouvejte své hranice rychleji než kdy dřív." },
                  { icon: <Smile className="h-6 w-6" />, title: "Překonání strachu", text: "Získejte jistotu a sebedůvěru v bezpečném prostředí pod dohledem." },
                  { icon: <BrainCircuit className="h-6 w-6" />, title: "Rozvoj dovedností", text: "Zlepšete koordinaci, odvahu a techniku skoků pro jakýkoliv sport." },
                ].map((b, i) => (
                  <div key={i} className="ab-row group flex items-start gap-6 py-6">
                    <div className="ab-row-num text-tjk-orange font-extrabold text-2xl md:text-3xl w-14 shrink-0" style={mono}>
                      0{i + 1}
                    </div>
                    <div className="pt-1 text-tjk-blue shrink-0 hidden sm:block">{b.icon}</div>
                    <div>
                      <h3 className="font-poppins font-bold text-xl md:text-2xl text-tjk-blue mb-1 group-hover:text-tjk-orange transition-colors">
                        {b.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed max-w-2xl">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ P06: COUNT-UP statistiky ============ */}
        <section className="bg-tjk-dark py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 ab-grid-bg opacity-60" />
          <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
            <CountUp value={4} label="sportovní odvětví" />
            <CountUp value={4} label="kroky k tréninku" />
            <CountUp value={1} label="hlavní partner projektu" />
            <CountUp value={1} label="cíl — bezpečný progres" />
          </div>
        </section>

        {/* ============ S8 + P11: DISCIPLÍNY — tilt image karty ============ */}
        <section className="bg-tjk-gray py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="slideUp">
              <p className="mb-3 text-tjk-orange text-xs uppercase tracking-[0.3em] font-bold" style={mono}>
                // Pro koho
              </p>
              <h2 className="font-poppins font-extrabold text-3xl md:text-5xl text-tjk-blue mb-4">
                Ať jezdíte na čemkoliv
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mb-12">
                AIRBAG je určen pro všechny — bez ohledu na věk nebo úroveň zkušeností.
              </p>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {disciplines.map((d, i) => (
                <ScrollAnimation key={i} animation="slideUp" delay={i * 100}>
                  <TiltCard className="h-full">
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg h-full bg-white">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={d.img}
                          alt={d.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute top-4 left-4 text-white/90 text-sm font-bold px-3 py-1 bg-black/40 backdrop-blur rounded-md" style={mono}>
                          {d.index}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-poppins font-bold text-xl text-tjk-blue mb-2 group-hover:text-tjk-orange transition-colors">
                          {d.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{d.text}</p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* ============ JAK TO FUNGUJE — číslované řádky ============ */}
        <section id="jak" className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation animation="slideUp">
              <p className="mb-3 text-tjk-orange text-xs uppercase tracking-[0.3em] font-bold" style={mono}>
                // Jak to funguje
              </p>
              <h2 className="font-poppins font-extrabold text-3xl md:text-5xl text-tjk-blue mb-4">
                Cesta k bezpečnému tréninku
              </h2>
              <p className="text-lg text-gray-600 mb-14">4 jednoduché kroky k vašemu prvnímu tréninku</p>
            </ScrollAnimation>

            <div className="space-y-4">
              {steps.map((s, i) => (
                <ScrollAnimation key={i} animation="slideUp" delay={i * 80}>
                  <div className="ab-row group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 border border-gray-200 rounded-xl p-6 hover:border-tjk-orange transition-colors">
                    <div className="ab-row-num text-tjk-orange font-extrabold text-4xl md:text-5xl w-20 shrink-0" style={mono}>
                      {s.num}
                    </div>
                    <div className="sm:border-l sm:border-gray-200 sm:pl-8">
                      <h3 className="font-poppins font-bold text-2xl text-tjk-blue mb-1 group-hover:text-tjk-orange transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SKUPINY — teambuilding ============ */}
        <section className="bg-tjk-blue text-white py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 ab-grid-bg opacity-50" />
          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <ScrollAnimation animation="slideRight">
              <p className="mb-3 text-tjk-orange text-xs uppercase tracking-[0.3em] font-bold" style={mono}>
                // Skupinový pronájem
              </p>
              <h2 className="font-poppins font-extrabold text-3xl md:text-5xl leading-tight mb-5">
                Celý den jen pro vaši partu
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                Plánujete teambuilding, sportovní soustředění nebo jen zábavný den
                s přáteli? Nabízíme exkluzivní pronájem AIRBAG matrace pro vaši
                skupinu — soukromí a maximální prostor pro trénink i zábavu.
              </p>
              <div className="mt-8 flex items-center gap-3 text-white/70">
                <Users className="h-5 w-5 text-tjk-orange" />
                <span>Ideální pro sportovní školy, týmy i firmy</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="slideLeft" delay={150}>
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl w-full">
                  <img
                    src="/images/homepage/okoli.jpg"
                    alt="Okolí Komárky v Krušných horách"
                    loading="lazy"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <Link to="/kontakt" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl shadow-black/30 hover:scale-105 transition-all duration-300 w-full">
                    Rezervovat skupinu
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* ============ PARTNEŘI ============ */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation animation="slideUp">
              <p className="mb-3 text-tjk-orange text-xs uppercase tracking-[0.3em] font-bold" style={mono}>
                // Partneři projektu
              </p>
              <h2 className="font-poppins font-extrabold text-2xl md:text-4xl text-tjk-blue mb-6">
                Tento projekt by nevznikl bez podpory
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
                <strong className="text-tjk-blue">Veterinární klinika Vet-Live z Litoměřic</strong> —
                díky její pomoci můžeme přinést do regionu sportovní prvek, který
                bude sloužit dětem, sportovcům i široké veřejnosti.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <img src="/images/partners/veterina-live-logo.png" alt="LIVE VET Litoměřice" className="h-20 md:h-24 object-contain opacity-80" />
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* ============ F7: REZERVACE — dark panel + mapa (M1) ============ */}
        <section className="bg-tjk-dark text-white py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 ab-grid-bg" />
          <div className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-tjk-orange/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="mb-3 text-tjk-orange text-xs uppercase tracking-[0.3em] font-bold" style={mono}>
                // Rezervace
              </p>
              <h2 className="font-poppins font-extrabold text-3xl md:text-6xl leading-tight">
                Připraveni vyzkoušet <span className="text-tjk-orange">AIRBAG</span>?
              </h2>
              <p className="mt-5 text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
                Kontaktujte nás a rezervujte si první trénink. Náš tým vám rád poradí
                a pomůže s výběrem vhodného programu.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl shadow-tjk-orange/25 hover:scale-105 transition-all duration-300">
                    Kontaktovat nás
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sluzby">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/5 backdrop-blur hover:bg-white/15 font-bold text-lg px-10 py-7 rounded-xl">
                    Další služby
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="flex flex-col justify-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-tjk-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-1">Kde nás najdete</h3>
                    <p className="text-white/70 leading-relaxed">
                      Tělovýchovná jednota Krupka z.s.<br />
                      Husitská 191/8, 417 41 Krupka<br />
                      <span className="text-white/50 text-sm">Areál Komárka — Krušné hory</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-tjk-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-1">Pro koho</h3>
                    <p className="text-white/70 leading-relaxed">
                      Jednotlivci, skupiny, školy i firmy — rezervace předem.
                    </p>
                  </div>
                </div>
                <div className="pt-2 text-white/50 text-xs uppercase tracking-[0.25em]" style={mono}>
                  tjkrupka.cz /airbag
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2528.0114486862482!2d13.861383076959465!3d50.69114397186274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709ff62287d0415%3A0x4cb0aa2f30c44b43!2zS29tw6HFmcOtIHbDrcW-a2E!5e0!3m2!1scs!2scz!4v1715704057041!5m2!1scs!2scz"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "280px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa — Komáří vížka, TJ Krupka"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AirbagV2;
