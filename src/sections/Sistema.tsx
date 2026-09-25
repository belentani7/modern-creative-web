import { useState } from "react";
import { Search, Bell, Sliders, LayoutGrid, Table2, Layers } from "lucide-react";
import { SectionHead } from "../components/ui";

const TABS = ["Tokens", "Componentes", "Estados"] as const;
type Tab = (typeof TABS)[number];

const TOKENS: [string, string, string][] = [
  ["color/nucleo", "#05070C", "Superficie base del producto"],
  ["color/senal", "#E7EDF7", "Texto principal y titulares"],
  ["color/panel", "#0B101A", "Cabecera de tabla, bandas"],
  ["color/azul-nucleo", "#4D8DFF", "Acento, foco y destructivo"],
  ["color/frio", "#7C8AA1", "Metadatos y etiquetas"],
  ["radio/base", "4 px", "Controles y campos"],
  ["espacio/modulo", "4 px", "Retícula de 4 × 4"],
  ["tipo/mono", "JetBrains Mono", "Cifras tabulares y cotas"],
];

const FILAS: [string, string, string, string][] = [
  ["INV-2041", "Cardume · etiqueta 250 g", "En imprenta", "12.480"],
  ["INV-2042", "Mercado · rótulo nave 3", "Aprobado", "8.900"],
  ["INV-2043", "Terrón · banda kraft", "Corrección", "3.250"],
  ["INV-2044", "Manual · láminas 01–18", "Cerrado", "21.700"],
];

export default function Sistema() {
  const [tab, setTab] = useState<Tab>("Tokens");
  const [compacta, setCompacta] = useState(true);
  const py = compacta ? "py-2" : "py-4";

  return (
    <section id="sistema" className="relative py-24 md:py-32 bg-paper-2/60 grain">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <SectionHead
          index="05"
          kicker="SaaS GUI / consola de diseño"
          title="Del token al"
          italic="componente"
          lede="La misma identidad, dentro del producto. Consola real construida en React sobre el sistema del manual: densidad alta, cifras tabulares, estados completos y foco visible."
        />

        <div className="border border-ink/20 bg-paper shadow-[0_24px_60px_-40px_rgba(20,18,16,0.55)]" data-reveal>
          {/* barra superior */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-ink/15 bg-paper-2/70">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-ink/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-spot" />
            </span>
            <span className="lab-xs hidden sm:inline">design-console · marca/cardume</span>
            <div className="flex-1" />
            <div className="flex items-center gap-2 border border-ink/20 px-3 py-1.5 bg-paper min-w-0">
              <Search size={13} className="text-ash shrink-0" />
              <span className="lab-xs text-ash truncate">Buscar token, componente…</span>
            </div>
            <button className="p-2 hover:bg-ink/5 transition-colors" aria-label="Avisos">
              <Bell size={15} />
            </button>
            <button className="p-2 hover:bg-ink/5 transition-colors" aria-label="Ajustes">
              <Sliders size={15} />
            </button>
          </div>

          <div className="grid grid-cols-12">
            {/* rail lateral del producto */}
            <nav className="col-span-12 md:col-span-3 lg:col-span-2 border-b md:border-b-0 md:border-r border-ink/15 p-3">
              <div className="lab-xs text-ash px-2 py-2">Espacios</div>
              {[
                { icon: LayoutGrid, label: "Marca", on: true },
                { icon: Layers, label: "Sistemas", on: false },
                { icon: Table2, label: "Producción", on: false },
              ].map(({ icon: Icon, label, on }) => (
                <button
                  key={label}
                  className={`w-full flex items-center gap-2.5 px-2 ${py} lab-xs transition-colors ${
                    on ? "bg-ink text-paper" : "hover:bg-ink/5"
                  }`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
              <div className="mt-6 lab-xs text-ash px-2 py-2">Estado</div>
              <div className="px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-spot" aria-hidden="true" />
                  <span className="lab-xs">Edición en vivo</span>
                </div>
                <p className="mt-2 tnum text-[0.7rem] text-ash">v3.2.1 · 04 · 2026</p>
              </div>
            </nav>

            {/* contenido */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <div className="flex items-center gap-px bg-ink/15 border-b border-ink/15">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    aria-pressed={tab === t}
                    className={`lab-xs px-5 ${compacta ? "py-3" : "py-4"} transition-colors ${
                      tab === t ? "bg-paper text-ink border-t-2 border-spot" : "bg-paper-2/70 text-ash hover:bg-paper"
                    }`}
                  >
                    {t}
                  </button>
                ))}
                <div className="flex-1 bg-paper-2/70" />
                <button
                  onClick={() => setCompacta((c) => !c)}
                  className="lab-xs px-4 py-2 mr-3 bg-paper border border-ink/20 hover:bg-ink hover:text-paper transition-colors"
                >
                  Densidad: {compacta ? "compacta" : "cómoda"}
                </button>
              </div>

              <div className="p-5 md:p-7">
                {tab === "Tokens" && (
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="lab-xs text-ash">
                        <th className="pb-3 font-medium">Token</th>
                        <th className="pb-3 font-medium">Valor</th>
                        <th className="pb-3 font-medium hidden sm:table-cell">Uso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOKENS.map(([tok, val, uso]) => (
                        <tr key={tok} className="border-t border-ink/15 hover:bg-ink/[0.04] transition-colors">
                          <td className={`${py} tnum text-[0.8rem]`}>{tok}</td>
                          <td className={py}>
                            <span className="flex items-center gap-2">
                              {val.startsWith("#") ? (
                                <span className="w-5 h-5 border border-ink/20" style={{ background: val }} />
                              ) : null}
                              <span className="tnum text-[0.8rem]">{val}</span>
                            </span>
                          </td>
                          <td className={`${py} text-[0.85rem] text-ink-soft hidden sm:table-cell`}>{uso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {tab === "Componentes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="lab-xs text-ash mb-3">Acciones</div>
                      <div className="flex flex-wrap gap-3">
                        <button className="lab-xs bg-ink text-paper px-4 py-3 hover:bg-spot transition-colors">Primaria</button>
                        <button className="lab-xs border border-ink/25 px-4 py-3 hover:bg-ink/5 transition-colors">Secundaria</button>
                        <button className="lab-xs border border-ink/15 px-4 py-3 text-ash cursor-not-allowed" disabled>Deshabilitada</button>
                      </div>
                      <div className="lab-xs text-ash mt-6 mb-3">Campos</div>
                      <label className="block">
                        <span className="lab-xs text-ash">Nombre del lote</span>
                        <input className="mt-2 w-full border border-ink/25 bg-paper px-3 py-2.5 text-[0.9rem] outline-none focus:border-spot" defaultValue="Etiqueta 250 g · tirada 2" />
                      </label>
                    </div>
                    <div>
                      <div className="lab-xs text-ash mb-3">Marcadores de estado</div>
                      <ul className="space-y-2">
                        {[
                          ["Aprobado", "bg-ink text-paper"],
                          ["En imprenta", "bg-spot text-paper"],
                          ["Corrección", "border border-ink/30 text-ink"],
                          ["Cerrado", "bg-ink/10 text-ash"],
                        ].map(([t, cls]) => (
                          <li key={t} className="flex items-center gap-3">
                            <span className={`lab-xs px-2.5 py-1.5 ${cls}`}>{t}</span>
                            <span className="tnum text-[0.72rem] text-ash">12 ops</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {tab === "Estados" && (
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="lab-xs text-ash">
                        <th className="pb-3 font-medium">Referencia</th>
                        <th className="pb-3 font-medium hidden sm:table-cell">Pieza</th>
                        <th className="pb-3 font-medium">Estado</th>
                        <th className="pb-3 font-medium text-right">Presupuesto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FILAS.map(([ref, pieza, est, imp]) => (
                        <tr key={ref} className="border-t border-ink/15 hover:bg-ink/[0.04] transition-colors">
                          <td className={`${py} tnum text-[0.8rem]`}>{ref}</td>
                          <td className={`${py} text-[0.85rem] hidden sm:table-cell`}>{pieza}</td>
                          <td className={py}>
                            <span
                              className={`lab-xs px-2 py-1 ${
                                est === "En imprenta"
                                  ? "bg-spot text-paper"
                                  : est === "Corrección"
                                    ? "border border-ink/30"
                                    : "bg-ink/10"
                              }`}
                            >
                              {est}
                            </span>
                          </td>
                          <td className={`${py} tnum text-right text-[0.8rem]`}>{imp} €</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-ink">
                        <td className={`${py} lab-xs`} colSpan={3}>
                          Total del trimestre
                        </td>
                        <td className={`${py} tnum text-right text-[0.95rem] font-semibold`}>46.330 €</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 lab-xs text-ash" data-reveal>
          Componentes accesibles por teclado · foco visible de 2 px en azul núcleo · contraste AA verificado
        </p>
      </div>
    </section>
  );
}
