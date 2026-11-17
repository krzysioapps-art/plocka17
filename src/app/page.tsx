"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { ChevronDown, Star } from "lucide-react";

import BrandLogo from "@/components/BrandLogo/BrandLogo";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { PolishText } from "./polish-text";

const locations = [
  {
    id: "plocka",
    name: "Przychodnia Weterynaryjna Płocka",
    badge: "Warszawa – Wola",
    address: "ul. Płocka 17, lok. U5",
    postal: "01-231 Warszawa",
    phone: "22 412 54 24",
    mapQuery: "Płocka 17 U5, 01-231 Warszawa",
    hours: [
      ["Poniedziałek – Piątek", "09:00–20:00"],
      ["Sobota", "09:00–15:00"],
      ["Niedziela", "09:00–12:00"],
    ],
  },
];

const services = [
  {
    title: "Profilaktyka",
    text: "Szczepienia, badania kontrolne, odrobaczanie i opieka profilaktyczna.",
    image: "/assets/illustrations/service-1.webp",
  },
  {
    title: "Diagnostyka",
    text: "Badania laboratoryjne, USG, EKG, RTG i diagnostyka chorób.",
    image: "/assets/illustrations/service-2.webp",
  },
  {
    title: "Choroby wewnętrzne",
    text: "Diagnostyka i leczenie chorób wewnętrznych psów i kotów.",
    image: "/assets/illustrations/service-3.webp",
  },
  {
    title: "Chirurgia",
    text: "Zabiegi chirurgiczne oraz opieka przed- i pooperacyjna.",
    image: "/assets/illustrations/service-4.webp",
  },
  {
    title: "Stomatologia",
    text: "Profilaktyka i leczenie chorób jamy ustnej.",
    image: "/assets/illustrations/service-5.webp",
  },
];

const values = [
  {
    title: "Doświadczenie",
    text: "Wiedza i praktyka zdobywane przez lata pracy ze zwierzętami.",
  },
  {
    title: "Rozwój",
    text: "Drugi gabinet otworzyliśmy po drugiej stronie ulicy.",
  },
  {
    title: "Bez zapisów",
    text: "Przychodzisz w godzinach pracy i czekasz na swoją kolej.",
  },
  {
    title: "Zaufanie",
    text: "Liczy się dla nas zarówno zwierzę, jak i jego opiekun.",
  },
];


const reviews = [
  {
    name: "Olga",
    rating: 5,
    text: "To miejsce gdzie moje koty są naprawdę LECZONE. Dr Agnieszka Chełmińska-Walerzak kilkukrotnie już postawiła trafne diagnozy (gdy inni lekarze nie wiedzieli, bądź typowali błędnie), wdrażając natychmiast prawidłowe leczenie, czym uratowała mi kilkukrotnie baaaardzo chore zwierzaki.. Mam do lecznicy kilkadziesiąt kilometrów, ostatnio jeżdżę co kilka dni - ale mój kot żyje. Dzięki doktor. Nie ma słów by właściwie podziękować i wyrazić wdzięczność 💗 Adrianek, Misio, Borys - żyją dzięki Pani."
  },
  {
    name: "Patryk",
    rating: 5,
    text: "Widać że profesjonalne podejście po pierwszej wizycie, pomimo zamknięcia o 20:00 zostałem przyjęty w nagłej sytuacji z kotką ❤️"
  },
  {
    name: "Fred Bebel",
    rating: 5,
    text: "Bardzo profesjonalna obsługa, doskonała jakość usług bez konieczności umawiania się, gorąco polecam ❤️"
  },
  {
    name: "Katarzyna Tymko",
    rating: 5,
    text: "Nie rozumiem tych uszczypliwych komentarzy. Nigdy, ale to nigdy nie spotkaliśmy się z jakąkolwiek nieuprzejmością ze strony personelu lecznicy. Wręcz przeciwnie, zawsze miło i fachowo. Wszystkie panie są przesympatyczne, a pani Agnieszka to lekarz z powołania."
  },
  {
    name: "Kasia Brejtfus",
    rating: 5,
    text: "Wspaniałe miejsce ,trafiłam do Doktor Agnieszki , która kocha zwierzaki i pomogła mi z moim yorkiem , fachowa pomoc-wspaniały diagnostyk , wspaniałe serce do zwierzaka i człowieka ❤️👆.Mam cudne miejsce gdzie Doktor i przemiły zespół pomoże ❤️Polecam ,tam kochają ...i co najważniejsze leczą 🐶🐱🐰100-⭐⭐⭐⭐..."
  },
  {
    name: "Wanda Charszla",
    rating: 5,
    text: "Opieka i empatia zespołu weterynarii w tej lecznicy"
  },
  {
    name: "Mateusz Kamiński",
    rating: 5,
    text: "Opieka i usługi na najwyższym poziomie bez zdzierania kasy :)"
  },
  {
    name: "Paweł",
    rating: 5,
    text: "Pani Agnieszka jest lekarzem z powołania. Fakt, że czasem trzeba poczekać, że jest kolejka ale tu jest fachowa pomoc, Pani Agnieszka również dba, by jej personel trzymał poziom. Zdecydowanie polecam, a mam porównanie z wieloma lecznicami w stolicy."
  },
  {
    name: "Aleksandra Majchrzak",
    rating: 5,
    text: "Dr. Agnieszka-człowiek renesansu. Podziwiam, szanuję i dziękuję. Wspaniały lekarz i Człowiek, doskonały profesjonalista. Polecam"
  }
];


function Stars() {
  return <span className="stars" aria-label="5 gwiazdek">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={11} fill="currentColor" strokeWidth={1.5} />)}</span>;
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const lineHeight = Number.parseFloat(getComputedStyle(text).lineHeight);
      setCanExpand(text.scrollHeight > lineHeight * 2 + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    document.fonts.ready.then(measure);
    return () => { active = false; observer.disconnect(); };
  }, [review.text]);

  return (
    <article className="review">
      <div className="review-header">
        <span className="review-avatar">{review.name[0]}</span>
        <div><span className="review-name">{review.name}</span><span className="review-source">Opinia z Google</span></div>
        <Stars />
      </div>
      <p ref={textRef} id={textId} className={expanded ? undefined : "review-excerpt"}><PolishText>{review.text}</PolishText></p>
      {canExpand && (
        <button type="button" className="text-link review-toggle" aria-expanded={expanded} aria-controls={textId} onClick={() => setExpanded(value => !value)}>
          {expanded ? "Mniej" : "Więcej"}
        </button>
      )}
    </article>
  );
}

function Reviews() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState({ prev: false, next: false });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const update = () => setNavigation({
      prev: grid.scrollLeft > 2,
      next: grid.scrollLeft < grid.scrollWidth - grid.clientWidth - 2,
    });
    update();
    grid.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    return () => { grid.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const scroll = (direction: number) => {
    const grid = gridRef.current;
    const card = grid?.firstElementChild;
    if (!grid || !card) return;
    grid.scrollBy({ left: direction * (card.getBoundingClientRect().width + 15), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="review-scroll">
        <div className="review-grid" ref={gridRef} tabIndex={0} role="region" aria-label="Opinie opiekunów">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 70}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
      <div className="review-nav" aria-label="Przewijanie opinii">
        <button className="button button-secondary" type="button" onClick={() => scroll(-1)} disabled={!navigation.prev}>Poprzednie</button>
        <button className="button button-secondary" type="button" onClick={() => scroll(1)} disabled={!navigation.next}>Następne</button>
      </div>
    </>
  );
}

const faqs = [
  {
    question: "Jak wygląda przyjęcie?",
    answer: "Przyjdź ze zwierzęciem w godzinach pracy gabinetu. Przyjmujemy bez zapisów, według kolejności przyjścia. Na miejscu poczekasz na swoją kolej.",
  },
  {
    question: "Gdzie znajduje się gabinet?",
    answer: "Znajdziesz nas przy ul. Płockiej 17, lok. U5 na warszawskiej Woli. W tym roku otworzyliśmy także drugi gabinet po przeciwnej stronie ulicy.",
  },
  {
    question: "Kto opiekuje się pacjentami?",
    answer: "Gabinet prowadzi Agnieszka Chełmińska-Walerzak wraz z mężem. W codziennej pracy towarzyszą jej pozostali lekarze oraz personel pomagający przy opiece nad zwierzętami.",
  },
  {
    question: "Mam pytanie przed przyjściem. Jak się skontaktować?",
    answer: "Zadzwoń pod numer 22 412 54 24. Możesz zapytać o pracę gabinetu, zakres pomocy lub odbiór wcześniej zamówionych leków.",
  },
];

function FeatureGrid({ items, fourColumns = false }: {
  items: { title: string; text: string; image?: string }[];
  fourColumns?: boolean;
}) {
  return (
    <div className={`feature-grid${fourColumns ? " feature-grid--four" : ""}`}>
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 70}>
          <article className="feature-card">
            {item.image && <img src={item.image} alt="" />}
            <h3><PolishText>{item.title}</PolishText></h3>
            <p><PolishText>{item.text}</PolishText></p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.bottom <= 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("is-ready");
    const frame = requestAnimationFrame(() => html.classList.add("is-ready"));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-painted");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "40px 0px" });
    document.querySelectorAll(".painted-background").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />

      <main>
        <section className="hero painted-background" id="home">
          <div className="container illustrated-section illustrated-section--split">
            <Reveal className="illustrated-heading">
              <h1><PolishText>Od lat blisko Was i Waszych zwierząt.</PolishText></h1>
            </Reveal>
            <Reveal className="illustrated-image" delay={80}>
              <div className="hero-image">
                <img src="/assets/illustrations/hero-vet.webp" srcSet="/assets/illustrations/hero-vet-800.webp 800w, /assets/illustrations/hero-vet.webp 1254w" sizes="(max-width: 820px) 100vw, 600px" width={1254} height={1254} fetchPriority="high" alt="Weterynarka opiekująca się psem" />
              </div>
            </Reveal>
            <div className="illustrated-copy hero-copy">
              <Reveal delay={150}>
                <p className="hero-intro">
                  <PolishText>
                    Gabinet weterynaryjny na warszawskiej Woli. Pomagamy psom i kotom – z doświadczeniem zdobywanym przez lata codziennej pracy.
                  </PolishText>
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="hero-actions">
                  <a href="#visit" className="button button-primary">
                    <PolishText>Sprawdź godziny przyjęć</PolishText>
                  </a>
                  <a href="#services" className="button button-secondary">
                    <PolishText>Poznaj nasze usługi</PolishText>
                  </a>
                </div>
              </Reveal>

            </div>

          </div>

        </section>

        <section className="section" id="visit">
          <div className="container visit-layout">
            <Reveal className="section-head">
              <h2 className="section-title"><PolishText>Do zobaczenia na Płockiej.</PolishText></h2>
              <p><PolishText>Przyjdź ze zwierzęciem w godzinach pracy gabinetu. Przyjmujemy bez zapisów, w kolejności przyjścia.</PolishText></p>
            </Reveal>
            <Reveal className="visit-hours" delay={80}>
              <dl className="visit-hours-list" aria-label="Godziny przyjęć">
                {locations[0].hours.map(([day, hours]) => (
                  <div className="visit-hours-day" key={day}>
                    <dt><PolishText>{day}</PolishText></dt><dd>{hours}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal className="visit-contact" delay={150}>
              <a className="visit-phone" href="tel:+48224125424">22 412 54 24</a>
              <p className="visit-address"><PolishText>ul. Płocka 17, lok. U5 · Warszawa, Wola</PolishText></p>
              <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locations[0].mapQuery)}`} target="_blank" rel="noreferrer">
                <PolishText>Jak do nas trafić</PolishText>
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container illustrated-section">
            <Reveal className="illustrated-heading">
              <h2 className="section-title"><PolishText>Gabinet z historią. I ze znajomymi twarzami.</PolishText></h2>
            </Reveal>
            <Reveal className="illustrated-image">
              <img src="/assets/illustrations/about-vet.webp" srcSet="/assets/illustrations/about-vet-800.webp 800w, /assets/illustrations/about-vet.webp 1254w" sizes="(max-width: 820px) 340px, 440px" width={1254} height={1254} alt="Weterynarka podczas opieki nad zwierzęciem" />
            </Reveal>

            <Reveal className="illustrated-copy prose" delay={80}>
              <p className="lead">
                <PolishText>
                  Płocka to gabinet prowadzony przez Agnieszkę Chełmińską-Walerzak i jej męża. Od lat jesteśmy częścią warszawskiej Woli i codziennie pomagamy jej czworonożnym mieszkańcom.
                </PolishText>
              </p>
              <p>
                <PolishText>
                  Pracujemy razem z zespołem lekarzy i personelem, który pomaga przy pacjentach i w codziennych sprawach gabinetu. Możesz przyjść z psem lub kotem, zapytać o to, co Cię niepokoi, albo odebrać wcześniej zamówione leki.
                </PolishText>
              </p>
            </Reveal>
          </div>
          <div className="container">
            <FeatureGrid items={values} fourColumns />
          </div>
        </section>

        <section className="section painted-background" id="services">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="section-title">
                <PolishText>Od profilaktyki</PolishText>
                <br />
                <PolishText>po </PolishText><em><PolishText>leczenie.</PolishText></em>
              </h2>
              <p><PolishText>Zakres opieki dobieramy do potrzeb konkretnego pacjenta – od rutynowych badań po diagnostykę i zabiegi.</PolishText></p>
            </Reveal>

            <FeatureGrid items={services} />
          </div>
        </section>

        <section className="development">
          <div className="container illustrated-section illustrated-section--split">
            <Reveal className="illustrated-heading">
              <h2 className="section-title">
                <PolishText>Rozwijamy się po sąsiedzku.</PolishText>
                <br />
                <em><PolishText>Dalej na Płockiej.</PolishText></em>
              </h2>
            </Reveal>
            <Reveal className="illustrated-image" delay={80}>
              <img src="/assets/illustrations/development-vet.webp" srcSet="/assets/illustrations/development-vet-800.webp 800w, /assets/illustrations/development-vet.webp 1536w" sizes="(max-width: 820px) 100vw, 600px" width={1536} height={1024} alt="Weterynarka podczas pracy w przychodni" />
            </Reveal>
            <Reveal className="illustrated-copy prose" delay={150}>
              <p>
                <PolishText>
                  W tym roku otworzyliśmy drugi gabinet po przeciwnej stronie ulicy. To kolejny krok w historii Płockiej – więcej miejsca do pracy i opieki nad pacjentami, w tym samym sąsiedztwie.
                </PolishText>
              </p>
              <a href="#visit" className="text-link">
                <PolishText>Znajdź nas na Woli</PolishText>

              </a>
            </Reveal>

          </div>
        </section>

        <section className="section" id="opinions">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="section-title"><PolishText>Zaufanie buduje się podczas każdej wizyty.</PolishText></h2>
            </Reveal>
            <Reviews />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container faq-layout">
            <Reveal className="section-head">
              <h2 className="section-title"><PolishText>Najważniejsze</PolishText><br /><PolishText>odpowiedzi.</PolishText></h2>
              <p><PolishText>Jeśli czegoś nie ma poniżej, najlepiej skontaktować się z nami telefonicznie.</PolishText></p>
              <a href="tel:+48224125424" className="text-link">
                <PolishText>Zadzwoń do gabinetu</PolishText>

              </a>
            </Reveal>

            <Reveal delay={80}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question}>
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span><PolishText>{faq.question}</PolishText></span>
                      <ChevronDown className="faq-chevron" size={20} strokeWidth={1.7} aria-hidden="true" />
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        <p><PolishText>{faq.answer}</PolishText></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-layout">
            <Reveal className="section-head">
              <h2 className="section-title"><PolishText>Twój pupil potrzebuje </PolishText><em><PolishText>pomocy?</PolishText></em></h2>
              <p><PolishText>Zadzwoń do gabinetu, aby potwierdzić godziny przyjęć i dostępność wizyty.</PolishText></p>
            </Reveal>

            <Reveal className="contact-action" delay={80}>
              <a className="contact-phone" href="tel:+48224125424">
                <span><PolishText>22 412 54 24</PolishText></span>

              </a>
              <span className="contact-note"><PolishText>Płocka 17/U5, Warszawa · Przyjęcia bez zapisów</PolishText></span>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer painted-background">
        <div className="container footer-main">
          <div className="footer-brand">
            <BrandLogo />
            <p><PolishText>Przychodnia Weterynaryjna Płocka – Warszawa, Wola. Kierownik: Agnieszka Chełmińska-Walerzak.</PolishText></p>
          </div>
          <div className="footer-column">
            <span className="footer-label"><PolishText>Na stronie</PolishText></span>
            <a href="#visit"><PolishText>Wizyta</PolishText></a>
            <a href="#about"><PolishText>O nas</PolishText></a>
            <a href="#services"><PolishText>Zakres opieki</PolishText></a>
          </div>
          <div className="footer-column">
            <span className="footer-label"><PolishText>Informacje</PolishText></span>
            <a href="#opinions"><PolishText>Opinie</PolishText></a>
            <a href="#faq"><PolishText>FAQ</PolishText></a>
            <a href="#contact"><PolishText>Kontakt</PolishText></a>
          </div>
          <div className="footer-column footer-contact">
            <span className="footer-label"><PolishText>Kontakt</PolishText></span>
            <span><PolishText>22 412 54 24</PolishText></span>
            <span><PolishText>ul. Płocka 17/U5, 01-231 Warszawa</PolishText></span>
            <a href="mailto:lecznica@plocka.waw.pl">lecznica@plocka.waw.pl</a>
            <a href="https://www.plocka.waw.pl/" target="_blank" rel="noreferrer">plocka.waw.pl</a>
          </div>
        </div>
        <div className="container footer-disclosure">
          <p><PolishText>Grafiki powstały przy pomocy narzędzi AI i stanowią element autorskiej identyfikacji wizualnej Przychodni Weterynaryjnej Płocka.</PolishText></p>
        </div>
        <div className="container footer-bottom">
          <span><PolishText>© 2026 Przychodnia Weterynaryjna Płocka</PolishText></span>
          <span><PolishText>Autor: KBUI</PolishText></span>
        </div>
      </footer>

    </>
  );
}
