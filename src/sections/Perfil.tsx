import { SectionHead } from "../components/ui";

const CAPACIDADES: [string, string, string, string, string][] = [
  ["01", "Dirección de identidad", "Marca", "12", "Naming, símbolo, sistema y manual de normas"],
  ["02", "Design systems", "Producto", "11", "Tokens, gobernanza, versionado semántico"],
  ["03", "Interfaces SaaS", "Producto", "10", "Onboarding, billing, dashboards, tablas densas"],
  ["04", "React · TypeScript", "Ingeniería", "9", "Componentes accesibles, render sin parpadeo"],
  ["05", "Motion · GSAP", "Interacción", "7", "Parallax, scroll-timeline, microinteracción"],
  ["06", "Accesibilidad", "Calidad", "6", "WCAG 2.2 AA, foco visible, lector de pantalla"],
  ["07", "Investigación", "Estrategia", "8", "Tests de marca, contraste, jerarquía visual"],
];

export default function Perfil() {
  return (
    <section id="perfil" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <SectionHead
          index="01"
          kicker="Perfil / alcance"
          title="Estrategia de"
          italic="marca"
          lede="Trabajo a la vez que el sistema: el símbolo, la retícula, los tokens y el código salen del mismo expediente. Sin intermediarios que pierdan las medidas por el camino."
        />

        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start" data-reveal>
            <p className="voice text-[1.6rem] leading-[1.3]">
              «Un Staff Product Designer no decide pantallas: decide el criterio con el que se deciden
              todas las pantallas.»
            </p>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.6] text-ink-soft">
              <p>
                Once años entre estudio de identidad y producto B2B. Hoy dirijo la estrategia visual de
                líneas enteras de producto y mantengo la coherencia entre el manual impreso y el
                componente en producción. Al frente de <strong className="font-semibold text-ink">NOIACORE LAB</strong>,
                un sistema de inteligencia multi-agente cuya identidad —núcleo Λ, azul frío, paleta
                mínima— ordena este mismo manual.
              </p>
              <p>
                Método: auditoría, hipótesis de posicionamiento, símbolo sobre retícula, sistema de
                tokens y entrega en código. Cada lámina de este manual es una decisión documentada, no
                una ocurrencia.
              </p>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-px bg-ink/15 border border-ink/15">
              {[
                ["Proyectos", "68"],
                ["Sistemas vivos", "9"],
                ["Sectores", "14"],
                ["Años", "11"],
              ].map(([k, v]) => (
                <li key={k} className="bg-paper px-4 py-4">
                  <span className="block tnum text-[2rem] leading-none">{v}</span>
                  <span className="lab-xs text-ash mt-2 block">{k}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-baseline justify-between rule pt-3" data-reveal>
              <span className="lab">Lámina 01-A · Registro de capacidades</span>
              <span className="lab-xs text-ash tnum">Escala 0–12 años</span>
            </div>
            <table className="w-full border-collapse text-left" data-reveal>
              <thead>
                <tr className="lab-xs text-ash">
                  <th className="py-3 font-medium w-10">N.º</th>
                  <th className="py-3 font-medium">Capacidad</th>
                  <th className="py-3 font-medium hidden sm:table-cell">Ámbito</th>
                  <th className="py-3 font-medium text-right w-16">Años</th>
                  <th className="py-3 font-medium w-[22%]">Dominio</th>
                </tr>
              </thead>
              <tbody>
                {CAPACIDADES.map(([n, cap, amb, anyos, nota]) => (
                  <tr key={n} className="border-t border-ink/15 group hover:bg-ink/[0.04] transition-colors">
                    <td className="py-4 tnum text-ash align-top">{n}</td>
                    <td className="py-4 align-top">
                      <span className="block text-[1.05rem] font-semibold leading-tight">{cap}</span>
                      <span className="block mt-1 text-[0.85rem] text-ash leading-snug">{nota}</span>
                    </td>
                    <td className="py-4 lab-xs text-ash align-top hidden sm:table-cell">{amb}</td>
                    <td className="py-4 tnum text-right align-top">{anyos}</td>
                    <td className="py-4 align-top">
                      <span className="flex gap-[3px] items-end h-4" aria-hidden="true">
                        {Array.from({ length: 12 }).map((_, k) => (
                          <span
                            key={k}
                            className={`w-[6px] transition-colors duration-300 ${
                              k < Number(anyos)
                                ? k > 8
                                  ? "bg-spot"
                                  : "bg-ink"
                                : "bg-ink/15"
                            }`}
                            style={{ height: `${6 + (k % 4) * 3}px` }}
                          />
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 lab-xs text-ash" data-reveal>
              Índice de dominio derivado de entregas en producción · revisión trimestral · {""}
              <span className="text-ink">última: 04 · 2026</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
