import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Wind,
  Mountain,
  Phone,
  CalendarCheck,
  ChevronDown,
  Snowflake,
  Shield,
  CheckCircle2,
  Clock,
  Images,
  Building2,
  GraduationCap,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AIRBAG,
  AIRBAG_GROUPS,
  AIRBAG_IMAGES,
  APP_URL,
  CONTACT,
  COURSE_GUARANTEE,
  COURSE_INCLUDED,
  COURSES,
  COURSE_LOCATIONS,
  FAQ_AIRBAG,
  FAQ_KURZY,
  GALLERY,
  HERO,
  WHY_US,
  appLink,
} from "@/config/site";

/**
 * Homepage — prodejní pořadí podle webauditu (2.1 a bod B14):
 * hero → trust → produkt 1 (kurzy) → produkt 2 (airbag) → foto →
 * skupiny → reference → FAQ → závěrečné CTA.
 *
 * Jedna akční barva = tjk-orange, základ = tjk-blue (bod B15).
 * Fullscreen je ponechaný jen pro hero a fotogalerii, ostatní sekce mají
 * obsahovou výšku, aby se cena a důkaz dostaly nad „fold".
 */
const Index = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => setNavbarOpen((v) => !v);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* ============ 1. HERO (webaudit 3.1, bod B7) ============ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/homepage/jj-kom-jump.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-tjk-dark/85 via-tjk-blue/80 to-tjk-dark/90"></div>
          </div>

          {/* Animace záměrně jen tady (webaudit 5 — jinde zdržují mobil) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <Snowflake
                key={i}
                className="absolute text-white/15 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${14 + Math.random() * 22}px`,
                  height: `${14 + Math.random() * 22}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="container relative z-20 px-4 py-24">
            <div className="max-w-5xl mx-auto text-center text-white">
              {/* Badge = sdělení, ne dekorace (webaudit 5) */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
                {HERO.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 font-poppins text-sm font-medium"
                  >
                    <Sparkles className="h-4 w-4 text-tjk-orange" />
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="font-poppins font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-extra-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {HERO.h1Line1}
                <span className="block text-tjk-orange mt-2">{HERO.h1Line2}</span>
              </h1>

              <p className="font-inter text-lg md:text-2xl mb-9 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {HERO.subheadline}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
                {HERO.benefits.map((b) => (
                  <div
                    key={b.title}
                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-tjk-orange" />
                    <div>
                      <div className="font-poppins font-semibold text-base">{b.title}</div>
                      <div className="font-inter text-sm text-white/80">{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={HERO.ctaPrimary.href}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-bold text-lg px-8 py-6 rounded-2xl shadow-2xl transition-transform hover:-translate-y-0.5"
                  >
                    <CalendarCheck className="mr-2 h-5 w-5" />
                    {HERO.ctaPrimary.label}
                  </Button>
                </a>
                <Link to={HERO.ctaSecondary.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto font-poppins font-bold text-lg px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    {HERO.ctaSecondary.label}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-10 w-10 text-white/60" />
            </div>
          </div>
        </section>


        {/* ============ Proč jezdit k nám ============ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-3">
                Proč jezdit k nám
              </h2>
              <p className="font-inter text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Krušné hory, vlastní instruktoři a vybavení v ceně. Tady se není
                čeho bát — od prvního draka po big air.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_US.map((item) => (
                <div
                  key={item.title}
                  className="bg-tjk-light rounded-2xl p-6 border border-gray-100 hover:border-tjk-orange/40 transition-colors"
                >
                  <Mountain className="h-8 w-8 text-tjk-orange mb-4" />
                  <h3 className="font-poppins font-bold text-lg text-tjk-blue mb-2">
                    {item.title}
                  </h3>
                  <p className="font-inter text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3. PRODUKT 1 — SNOWKITE KURZY (bod B6, 3.2) ============ */}
        <section id="kurzy" className="py-16 md:py-20 bg-tjk-light scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tjk-blue text-white font-poppins text-sm font-medium mb-4">
                <Wind className="h-4 w-4" /> Snowkite kurzy
              </span>
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-3">
                Snowkite kurzy pro každou úroveň
              </h2>
              <p className="font-inter text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Od prvního kontaktu s drakem po big air. Tři úrovně kurzů, jasná cena,
                vybavení v ceně a instruktoři, kteří učí na sněhu celou sezónu.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {COURSES.map((course) => (
                <Card
                  key={course.title}
                  className="group overflow-hidden border-2 border-transparent hover:border-tjk-orange transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={course.image}
                      alt={`Kurz snowkitingu — ${course.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-7">
                    <div className="flex items-center gap-2 font-inter text-xs uppercase tracking-wide text-tjk-orange font-semibold mb-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <h3 className="font-poppins font-bold text-2xl text-tjk-blue mb-1">
                      {course.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 uppercase tracking-wide mb-4">
                      {course.subtitle}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {course.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 font-inter text-gray-700">
                          <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0 text-tjk-orange" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-poppins font-black text-3xl text-tjk-blue mb-5">
                      {course.price}
                    </div>
                    <a href={appLink(`kurz-${course.title.toLowerCase()}`)}>
                      <Button className="w-full bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-semibold rounded-xl py-5">
                        Vybrat kurz a termín
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-poppins font-bold text-lg text-tjk-blue mb-3">
                  Co je v ceně
                </h3>
                <ul className="space-y-2">
                  {COURSE_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-inter text-gray-700">
                      <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0 text-tjk-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-poppins font-bold text-lg text-tjk-blue mb-3">
                  Kde se jezdí
                </h3>
                <ul className="space-y-2 mb-4">
                  {COURSE_LOCATIONS.map((loc) => (
                    <li key={loc} className="flex items-center gap-2 font-inter text-gray-700">
                      <MapPin className="h-4 w-4 text-tjk-orange" />
                      {loc}
                    </li>
                  ))}
                </ul>
                <p className="font-inter text-sm text-gray-600">
                  Vše v Krušných horách. Lokalitu vybíráme podle aktuálních podmínek.
                </p>
              </div>
              <div className="bg-tjk-blue text-white rounded-2xl p-6">
                <h3 className="font-poppins font-bold text-lg mb-3">Garance podmínek</h3>
                <p className="font-inter text-white/85 leading-relaxed mb-5">
                  {COURSE_GUARANTEE}
                </p>
                <Link
                  to="/snowkiting-kurzy"
                  className="inline-flex items-center gap-2 font-poppins font-semibold text-tjk-orange hover:underline"
                >
                  Celý ceník a termíny
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4. PRODUKT 2 — AIRBAG (body B3, B4, 3.3) ============ */}
        <section id="airbag" className="py-16 md:py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Cutout matrace na brandovém podkladu (fotky dodal Owner) */}
              <div className="rounded-3xl bg-gradient-to-br from-tjk-blue to-tjk-dark p-6 md:p-10 flex items-center justify-center">
                <img
                  src={AIRBAG_IMAGES.matrace}
                  alt="Airbag — dopadová matrace pro trénink triků"
                  loading="lazy"
                  className="w-full h-auto max-h-[360px] object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.5)]"
                />
              </div>

              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tjk-blue text-white font-poppins text-sm font-medium mb-4">
                  <Shield className="h-4 w-4" /> Airbag
                </span>
                <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-4">
                  {AIRBAG.title}
                </h2>
                <p className="font-inter text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  {AIRBAG.subtitle}
                </p>

                <ul className="space-y-3 mb-6">
                  {AIRBAG.benefits.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-tjk-orange" />
                      <span className="font-inter text-gray-700">
                        <strong className="text-tjk-blue">{b.title}.</strong> {b.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="bg-tjk-light rounded-2xl p-5 mb-6 border border-gray-100">
                  <div className="font-poppins font-black text-3xl text-tjk-orange mb-1">
                    {AIRBAG.priceMember} Kč <span className="text-base text-gray-600 font-semibold">/ člen</span>
                    {"  ·  "}
                    {AIRBAG.priceNonMember} Kč <span className="text-base text-gray-600 font-semibold">/ nečlen</span>
                  </div>
                  <p className="font-inter text-sm text-gray-600">{AIRBAG.priceNote}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={AIRBAG.ctaPrimary.href}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-bold text-lg px-7 py-6 rounded-2xl"
                    >
                      <CalendarCheck className="mr-2 h-5 w-5" />
                      {AIRBAG.ctaPrimary.label}
                    </Button>
                  </a>
                  <Link to={AIRBAG.ctaSecondary.href}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-tjk-blue text-tjk-blue hover:bg-tjk-blue/5 font-poppins font-semibold text-lg px-7 py-6 rounded-2xl bg-white"
                    >
                      {AIRBAG.ctaSecondary.label}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. GALERIE (webaudit 4 — vlastní fotky) ============ */}
        <section className="relative py-16 md:py-20 bg-tjk-blue text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-poppins font-black text-3xl md:text-4xl mb-3">
                Jak to u nás vypadá
              </h2>
              <p className="font-inter text-base md:text-lg text-white/80 max-w-2xl mx-auto">
                Komáří vížka, Krušné hory a sníh, na kterém se dá jezdit celou zimu.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto mb-10">
              {GALLERY.map((img) => (
                <div key={img.src} className="aspect-[3/2] rounded-2xl overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/kontakt-snowkiting">
                <Button
                  size="lg"
                  className="bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-bold text-lg px-8 py-6 rounded-2xl"
                >
                  <Images className="mr-2 h-5 w-5" />
                  Chci to zkusit
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============ 6. SKUPINY — firmy a školy (body B16, 3.4) ============ */}
        <section id="skupiny" className="py-16 md:py-20 bg-tjk-light scroll-mt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-3">
                {AIRBAG_GROUPS.title}
              </h2>
              <p className="font-inter text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                {AIRBAG_GROUPS.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {AIRBAG_GROUPS.audiences.map((a) => (
                <div key={a.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-poppins font-bold text-lg text-tjk-blue mb-2">
                    {a.title}
                  </h3>
                  <p className="font-inter text-gray-600 leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-3xl mx-auto text-center">
              {AIRBAG_GROUPS.priceFrom ? (
                <div className="font-poppins font-black text-3xl text-tjk-orange mb-2">
                  {AIRBAG_GROUPS.priceFrom}
                </div>
              ) : null}
              <p className="font-inter text-gray-600 mb-6">{AIRBAG_GROUPS.priceNote}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/firmy">
                  <Button className="w-full sm:w-auto bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-semibold rounded-xl py-5 px-6">
                    <Building2 className="mr-2 h-5 w-5" />
                    Poptat airbag pro firmu
                  </Button>
                </Link>
                <Link to="/skoly">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-tjk-blue text-tjk-blue hover:bg-tjk-blue/5 font-poppins font-semibold rounded-xl py-5 px-6 bg-white"
                  >
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Zarezervovat termín pro školu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 8. FAQ (webaudit 3.6) — dva produkty, dva bloky ============ */}
        <section id="faq" className="py-16 md:py-20 bg-tjk-light scroll-mt-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-3">
                Časté dotazy
              </h2>
              <p className="font-inter text-base md:text-lg text-gray-600">
                Kurzy a airbag jsou dva samostatné produkty — otázky má proto každý zvlášť.
              </p>
            </div>

            <div className="space-y-14">
              <div>
                <h3 className="font-poppins font-black text-2xl md:text-3xl text-tjk-blue mb-2 flex items-center gap-3">
                  <Wind className="h-7 w-7 text-tjk-orange" />
                  Snowkite kurzy
                </h3>
                <p className="font-inter text-gray-600 mb-5">
                  Vybavení, zkušenosti, vítr, věk i storno.
                </p>
                <FaqSection items={FAQ_KURZY} embedded />
                <div className="mt-5">
                  <Link
                    to="/snowkiting-kurzy"
                    className="inline-flex items-center gap-2 font-poppins font-semibold text-tjk-orange hover:underline"
                  >
                    Rezervovat kurz nebo se zeptat
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-poppins font-black text-2xl md:text-3xl text-tjk-blue mb-2 flex items-center gap-3">
                  <Shield className="h-7 w-7 text-tjk-orange" />
                  Airbag
                </h3>
                <p className="font-inter text-gray-600 mb-5">
                  Bezpečnost, průběh dne, vybavení i rezervace.
                </p>
                <FaqSection items={FAQ_AIRBAG} embedded />
                <div className="mt-5">
                  <Link
                    to="/airbag"
                    className="inline-flex items-center gap-2 font-poppins font-semibold text-tjk-orange hover:underline"
                  >
                    Rezervovat airbag den
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 9. ZÁVĚREČNÉ CTA ============ */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-tjk-blue to-tjk-dark text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-poppins font-black text-3xl md:text-5xl mb-5">
              Rezervujte kurz nebo airbag den
            </h2>
            <p className="font-inter text-lg md:text-xl text-white/85 mb-9">
              Vybavení je v ceně, stačí přijet. Nevíte, co si vybrat? Zavolejte —
              poradíme podle toho, kolik máte času a co už umíte.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href={appLink("zaverecne-cta")}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-tjk-orange hover:bg-tjk-orange/90 text-white font-poppins font-bold text-lg px-8 py-6 rounded-2xl"
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Rezervovat
                </Button>
              </a>
              <a href={`tel:${CONTACT.phoneSnowkiting.tel}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/10 font-poppins font-semibold text-lg px-8 py-6 rounded-2xl bg-transparent"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zavolat {CONTACT.phoneSnowkiting.label}
                </Button>
              </a>
            </div>

            <p className="font-inter text-white/70">
              Rezervace a platba:{" "}
              <a href={APP_URL} className="text-tjk-orange font-semibold hover:underline">
                app.tjkrupka.cz
              </a>{" "}
              · dotazy: {CONTACT.email}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
