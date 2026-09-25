import { ArrowUpRight } from "lucide-react";

export default function Contacto() {
  return (
    <footer id="contacto" className="relative bg-ink text-paper grain pt-24 md:pt-32 pb-10">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="flex items-baseline gap-4 border-t border-paper/25 pt-3">
          <span className="lab text-spot tnum">06</span>
          <span className="lab text-paper/70">Contacto / colofón</span>
          <span className="flex-1 ticks h-[6px] opacity-20 hidden sm:block" aria-hidden="true" />
        </div>

        <h2 className="mt-10 font-display uppercase leading-[0.82] tracking-[-0.05em] text-[clamp(2.8rem,11vw,9rem)]">
          Hagamos
          <span className="voice lowercase text-spot"> tu marca</span>
        </h2>

        <div className="mt-14 grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="voice text-[1.5rem] leading-[1.35] max-w-[34ch]">
              Cuéntame el nombre y la actividad: devuelvo símbolo, sistema y plazos en cinco días hábiles.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-px bg-paper/20 border border-paper/20">
              {[
                ["Correo", "hola@belentani7.studio", "mailto:hola@belentani7.studio"],
                ["GitHub", "github.com/belentani7", "https://github.com/belentani7"],
                ["Disponibilidad", "2 proyectos · Q3 2026", ""],
                ["Base", "Vigo · trabajo en remoto", ""],
              ].map(([k, v, href]) => (
                <div key={k} className="bg-ink px-5 py-5">
                  <div className="lab-xs text-paper/70">{k}</div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[1rem] hover:text-spot transition-colors"
                    >
                      {v} <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <div className="mt-2 text-[1rem]">{v}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pl-8 lg:border-l border-paper/20">
            <div className="lab-xs text-paper/70">Colofón</div>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-paper/75">
              Manual de normas compuesto en Space Grotesk, Inter y JetBrains Mono, impreso digitalmente en
              pantalla a 16 px de base. Retícula de 28 px. Paleta mínima de dos tintas: núcleo #05070C y azul
              núcleo #4D8DFF, sin tonos cálidos ni saturados. Glifo Λ trazado sobre retícula de 24 u.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-y-5">
              {[
                ["Edición", "2026 · v1.0"],
                ["Láminas", "06 de 06"],
                ["Formato", "SVG · 100 × 100"],
                ["Derechos", "© Belén Tani"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="lab-xs text-paper/70">{k}</dt>
                  <dd className="tnum text-[0.85rem] mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </footer>
  );
}
