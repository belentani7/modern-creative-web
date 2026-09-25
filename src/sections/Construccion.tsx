import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LAMBDA_MARK } from "../lib/brand";
import { SectionHead } from "../components/ui";

const NOTAS: [string, string][] = [
  ["Retícula", "Módulo 24 u · trazo de 22 u"],
  ["Vértice", "Ángulo de 38° con junta en inglete"],
  ["Anillos", "3 × radio 64 / 92 / 120 u, sentidos alternos"],
  ["Resplandor", "Radial 50 % · azul núcleo #4D8DFF"],
  ["Área de respeto", "1× el grosor de trazo por cada lado"],
  ["Tamaño mínimo", "16 px digital · 9 mm impreso"],
];

export default function Construccion() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const strokes = gsap.utils.toArray<SVGPathElement>("[data-draw]");
      gsap.set(strokes, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to(strokes, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.2,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      });
      gsap.fromTo(
        "[data-guide]",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top 85%", end: "top 45%", scrub: true },
        },
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section id="construccion" className="relative py-24 md:py-32 bg-paper-2/60 grain">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <SectionHead
          index="03"
          kicker="Núcleo / construcción del glifo"
          title="Geometría de la"
          italic="lambda"
          lede="El glifo Λ de NOIACORE LAB sustituye a la A del wordmark: dos diagonales de 38° sobre retícula de 24 u, envueltas por tres anillos concéntricos. Sin curvas, sin degradados cálidos, sin excepciones."
        />

        <div ref={scope} className="grid grid-cols-12 gap-x-8 gap-y-12 items-start">
          <figure className="col-span-12 lg:col-span-8 bg-paper border border-ink/15 relative">
            <div className="flex items-center justify-between px-5 py-3 border-b border-ink/15">
              <span className="lab-xs">Lámina 03-A · Trazado</span>
              <span className="lab-xs text-ash tnum">Escala 1:1 · u = 1 mm</span>
            </div>
            <svg
              viewBox="0 0 300 260"
              className="w-full h-auto sheet-grid-fine"
              role="img"
              aria-label="Construcción geométrica del glifo lambda con anillos orbitales"
            >
              <g data-guide stroke="#4D8DFF" strokeWidth="0.6" opacity="0.4" fill="none">
                <line x1="0" y1="52" x2="300" y2="52" strokeDasharray="3 3" />
                <line x1="0" y1="192" x2="300" y2="192" strokeDasharray="3 3" />
                <line x1="140" y1="10" x2="140" y2="238" strokeDasharray="3 3" />
                <line x1="72" y1="10" x2="72" y2="238" strokeDasharray="3 3" />
                <line x1="208" y1="10" x2="208" y2="238" strokeDasharray="3 3" />
              </g>

              {/* anillos orbitales */}
              <g fill="none" stroke="#4D8DFF">
                <circle cx="140" cy="132" r="64" strokeOpacity="0.75" strokeWidth="0.9" data-draw pathLength={1} />
                <circle cx="140" cy="132" r="92" strokeOpacity="0.5" strokeWidth="0.9" strokeDasharray="0" data-draw pathLength={1} />
                <circle cx="140" cy="132" r="120" strokeOpacity="0.32" strokeWidth="0.9" data-draw pathLength={1} />
              </g>

              {/* glifo Λ */}
              <g
                transform="translate(20 20)"
                stroke="#E7EDF7"
                strokeWidth="22"
                fill="none"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                {LAMBDA_MARK.strokes.map((d, i) => (
                  <path key={i} d={d} data-draw pathLength={1} />
                ))}
              </g>

              {/* cotas */}
              <g
                data-guide
                stroke="#7C8AA1"
                strokeWidth="0.7"
                fill="none"
                fontFamily="JetBrains Mono, monospace"
              >
                <line x1="72" y1="212" x2="208" y2="212" />
                <line x1="72" y1="207" x2="72" y2="217" />
                <line x1="208" y1="207" x2="208" y2="217" />
                <text x="118" y="228" fill="#7C8AA1" stroke="none" fontSize="8" letterSpacing="1.5">
                  136 u
                </text>
                <line x1="262" y1="52" x2="262" y2="192" />
                <line x1="257" y1="52" x2="267" y2="52" />
                <line x1="257" y1="192" x2="267" y2="192" />
                <text x="270" y="126" fill="#7C8AA1" stroke="none" fontSize="8" letterSpacing="1.5">
                  140 u
                </text>
                <text x="10" y="46" fill="#4D8DFF" stroke="none" fontSize="8" letterSpacing="1.5">
                  38°
                </text>
                <text x="10" y="205" fill="#7C8AA1" stroke="none" fontSize="8" letterSpacing="1.5">
                  TRAZO 22 u
                </text>
              </g>
            </svg>
          </figure>

          <div className="col-span-12 lg:col-span-4">
            <div className="border border-ink/15 bg-paper" data-reveal>
              <div className="px-5 py-3 border-b border-ink/15 lab-xs">Lámina 03-B · Normas</div>
              <dl>
                {NOTAS.map(([k, v], i) => (
                  <div key={k} className="px-5 py-4 border-b border-ink/10 last:border-0 flex gap-4">
                    <span className="tnum text-spot text-[0.7rem] pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <dt className="lab-xs">{k}</dt>
                      <dd className="mt-1 text-[0.9rem] leading-snug text-ink-soft">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-6 voice text-[1.25rem] leading-[1.35]" data-reveal>
              Todo lo que sobra en un símbolo se convierte en ruido a 16 píxeles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
