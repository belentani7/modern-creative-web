import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "./components/ui";
import { BT_MARK } from "./lib/brand";
import Hero from "./sections/Hero";
import Perfil from "./sections/Perfil";
import Estudio from "./sections/Estudio";
import Construccion from "./sections/Construccion";
import Trabajo from "./sections/Trabajo";
import Sistema from "./sections/Sistema";
import Contacto from "./sections/Contacto";

const NAV = [
  { id: "portada", n: "00", label: "Portada" },
  { id: "perfil", n: "01", label: "Perfil" },
  { id: "estudio", n: "02", label: "Estudio" },
  { id: "construccion", n: "03", label: "Construcción" },
  { id: "trabajo", n: "04", label: "Trabajo" },
  { id: "sistema", n: "05", label: "Sistema" },
  { id: "contacto", n: "06", label: "Contacto" },
];

const CINTA = [
  "Creador de marcas",
  "Identidad visual",
  "Sistemas de diseño",
  "SaaS GUI",
  "React · TypeScript",
  "Parallax GSAP",
  "Accesibilidad AA",
];

function Mono({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={BT_MARK.viewBox} className={className} role="img" aria-label="Monograma BT">
      <g stroke="currentColor" strokeWidth="22" fill="none" strokeLinejoin="miter">
        {BT_MARK.strokes.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("portada");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 26,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const depth = Number(el.dataset.parallax ?? "0.3");
          gsap.fromTo(
            el,
            { yPercent: -depth * 9 },
            {
              yPercent: depth * 9,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      }

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (bar.current) bar.current.style.width = `${(self.progress * 100).toFixed(2)}%`;
        },
      });
    }, root);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={root} className="relative">
      {/* progreso de lectura */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
        <div ref={bar} className="h-full bg-spot w-0" />
      </div>

      {/* lomo / índice */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 z-50 flex-col items-center justify-between py-5 bg-paper border-r border-ink/15">
        <a href="#portada" className="text-ink hover:text-spot transition-colors" aria-label="Inicio">
          <Mono className="w-8 h-8" />
        </a>
        <nav aria-label="Índice del manual" className="flex flex-col items-center gap-4">
          {NAV.map((s) => {
            const on = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2"
                aria-current={on ? "true" : undefined}
              >
                <span className={`tnum text-[0.7rem] ${on ? "text-spot" : "text-ash group-hover:text-ink"}`}>
                  {s.n}
                </span>
                <span
                  className={`h-px transition-all duration-300 ${
                    on ? "w-6 bg-spot" : "w-2 bg-ink/30 group-hover:w-5 group-hover:bg-ink"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="flex flex-col items-center gap-4">
          <span
            className="lab-xs text-ash"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Manual 2026
          </span>
          <span className="ticks w-4 h-10 opacity-40" aria-hidden="true" />
        </div>
      </aside>

      {/* cabecera */}
      <header className="fixed top-0 left-0 lg:left-20 right-0 z-50 bg-paper/92 backdrop-blur-sm border-b border-ink/15">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12 h-16 flex items-center gap-5">
          <a href="#portada" className="flex items-center gap-3 shrink-0">
            <Mono className="w-6 h-6 lg:hidden" />
            <span className="lab">Belén Tani</span>
            <span className="lab-xs text-ash hidden sm:inline">Staff Product Designer</span>
          </a>
          <div className="flex-1" />
          <a
            href="https://github.com/belentani7"
            target="_blank"
            rel="noreferrer"
            className="lab-xs text-ash hover:text-ink transition-colors hidden sm:inline"
          >
            github.com/belentani7
          </a>
          <a
            href="#contacto"
            className="lab-xs bg-ink text-paper px-4 py-2.5 hover:bg-spot transition-colors"
          >
            Encargar marca
          </a>
        </div>
        <nav
          aria-label="Índice del manual (móvil)"
          className="lg:hidden flex gap-px overflow-x-auto border-t border-ink/10 bg-paper-2/50"
        >
          {NAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`lab-xs px-3 py-2.5 whitespace-nowrap transition-colors ${
                active === s.id ? "bg-ink text-paper" : "text-ash hover:text-ink"
              }`}
            >
              {s.n} {s.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="lg:pl-20">
        <Hero />
        <Perfil />
        <Marquee items={CINTA} />
        <Estudio />
        <Construccion />
        <Trabajo />
        <Sistema />
        <Marquee items={["Identidad que se puede imprimir", "Sistemas que se pueden mantener", "Código que no se deforma"]} />
        <Contacto />
      </main>
    </div>
  );
}
