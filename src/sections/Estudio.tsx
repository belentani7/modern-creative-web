import { useMemo, useState } from "react";
import { Download, Shuffle, Check, Copy } from "lucide-react";
import { buildKit, downloadSvg, STYLES, type StyleKey } from "../lib/brand";
import { MarkSVG, Field } from "../components/ui";

const VARIANTES = [
  { key: "simbolo", label: "Símbolo" },
  { key: "horizontal", label: "Horizontal" },
  { key: "vertical", label: "Vertical" },
  { key: "mono", label: "Monocromo" },
] as const;
type VariantKey = (typeof VARIANTES)[number]["key"];

export default function Estudio() {
  const [nombre, setNombre] = useState("Cardume");
  const [sector, setSector] = useState("café de especialidad");
  const [style, setStyle] = useState<StyleKey>("moderno");
  const [salt, setSalt] = useState(0);
  const [variant, setVariant] = useState<VariantKey>("simbolo");
  const [copied, setCopied] = useState<string | null>(null);

  const kit = useMemo(() => buildKit(nombre, sector, style, salt), [nombre, sector, style, salt]);
  const mono = variant === "mono";
  const displayStyle = { fontFamily: kit.pairing.cssDisplay };
  const textStyle = { fontFamily: kit.pairing.cssText };

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).then(
      () => {
        setCopied(hex);
        window.setTimeout(() => setCopied(null), 1400);
      },
      () => setCopied(null),
    );
  };

  return (
    <section id="estudio" className="relative py-24 md:py-32 bg-ink text-paper grain">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <header className="mb-14 md:mb-20" data-reveal>
          <div className="flex items-baseline gap-4 border-t border-paper/25 pt-3">
            <span className="lab text-spot tnum">02</span>
            <span className="lab text-paper/70">Estudio de marca / generador</span>
            <span className="flex-1 ticks h-[6px] opacity-20 hidden sm:block" aria-hidden="true" />
            <span className="lab-xs text-paper/70 tnum">Salida vectorial · SVG 1.1</span>
          </div>
          <h2 className="mt-6 font-display uppercase leading-[0.85] tracking-[-0.04em] text-[clamp(2.6rem,7.2vw,6.2rem)]">
            Creador de marcas
            <em className="voice lowercase text-spot tracking-[-0.01em]"> profesional</em>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-paper/75">
            Escribe el nombre y la actividad, elige el registro. El motor calcula geometría sobre una
            retícula de 100 × 100 y devuelve símbolo, logotipo, paleta y normas de uso. Descárgalo en
            vector real, no en imagen.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          {/* ── Panel de control ─────────────────────────────── */}
          <form
            className="col-span-12 lg:col-span-4 border border-paper/20 bg-paper/[0.04] p-6 self-start"
            onSubmit={(e) => e.preventDefault()}
            data-reveal
          >
            <div className="lab-xs text-paper/70 mb-6">Panel de control · exp. 2026-BT</div>
            <div className="space-y-6">
              <Field label="Nombre comercial">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  maxLength={22}
                  className="w-full bg-transparent border-b border-paper/30 focus:border-spot pb-2 text-[1.4rem] font-semibold outline-none placeholder:text-paper/30"
                  placeholder="Tu marca"
                />
              </Field>
              <Field label="Actividad principal">
                <input
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  maxLength={40}
                  className="w-full bg-transparent border-b border-paper/30 focus:border-spot pb-2 text-[1rem] outline-none placeholder:text-paper/30"
                  placeholder="panadería de barrio"
                />
              </Field>
              <fieldset>
                <legend className="lab-xs text-paper/70">Registro visual</legend>
                <div className="mt-3 grid grid-cols-2 gap-px bg-paper/20 border border-paper/20">
                  {STYLES.map((s) => {
                    const on = s.key === style;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setStyle(s.key)}
                        aria-pressed={on}
                        className={`text-left px-3 py-3 transition-colors duration-200 ${
                          on ? "bg-spot text-paper" : "bg-ink text-paper/80 hover:bg-paper/10"
                        }`}
                      >
                        <span className="lab-xs block">{s.label}</span>
                        <span className="mt-1 block text-[0.7rem] leading-tight opacity-75">{s.nota}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSalt((s) => s + 1)}
                  className="lab-xs flex items-center gap-2 border border-paper/30 px-4 py-3 hover:bg-paper hover:text-ink transition-colors duration-200"
                >
                  <Shuffle size={13} strokeWidth={2} /> Regenerar
                </button>
                <button
                  type="button"
                  onClick={() => downloadSvg(kit, nombre)}
                  className="lab-xs flex items-center gap-2 bg-spot text-paper px-4 py-3 hover:bg-paper hover:text-ink transition-colors duration-200"
                >
                  <Download size={13} strokeWidth={2} /> Descargar .svg
                </button>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-paper/20">
              <div className="lab-xs text-paper/70">Concepto de marca</div>
              <p className="mt-3 voice text-[1.3rem] leading-[1.3] text-paper">{kit.concepto}</p>
            </div>
          </form>

          {/* ── Lámina de resultado ──────────────────────────── */}
          <div className="col-span-12 lg:col-span-8">
            <div className="border border-paper/20 bg-paper text-ink" data-reveal>
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-ink/15">
                <span className="lab-xs">Lámina 02-A · Sistema generado</span>
                <div className="flex gap-px bg-ink/15 border border-ink/15">
                  {VARIANTES.map((v) => (
                    <button
                      key={v.key}
                      onClick={() => setVariant(v.key)}
                      aria-pressed={variant === v.key}
                      className={`lab-xs px-3 py-2 transition-colors duration-200 ${
                        variant === v.key ? "bg-ink text-paper" : "bg-paper hover:bg-ink/5"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-12">
                {/* muestra */}
                <div className="col-span-12 md:col-span-6 border-b md:border-b-0 md:border-r border-ink/15">
                  <div
                    key={`${kit.mark.recipe}-${salt}-${style}-${variant}`}
                    className="sheet-grid-fine mark-in aspect-[4/3] flex items-center justify-center p-8"
                    style={{ background: mono ? "#05070C" : kit.palette.swatches[1].hex }}
                  >
                    {variant === "horizontal" ? (
                      <div className={`flex items-center gap-5 ${mono ? "text-ink" : ""}`}>
                        <MarkSVG kit={kit} mono={mono} className="w-[72px] h-[72px] shrink-0" />
                        <span
                          className={`uppercase leading-[0.9] tracking-[-0.03em] break-words text-[clamp(1.6rem,4vw,2.6rem)] ${mono ? "text-ink" : ""}`}
                          style={displayStyle}
                        >
                          {nombre || "Marca"}
                        </span>
                      </div>
                    ) : variant === "vertical" ? (
                      <div className="flex flex-col items-center gap-4 text-center">
                        <MarkSVG kit={kit} mono={mono} className="w-[110px] h-[110px]" />
                        <span
                          className="uppercase leading-[0.9] tracking-[-0.03em] break-words max-w-[16ch] text-[clamp(1.3rem,3.4vw,2rem)]"
                          style={{ ...displayStyle, color: mono ? "#E7EDF7" : kit.palette.swatches[0].hex }}
                        >
                          {nombre || "Marca"}
                        </span>
                      </div>
                    ) : (
                      <MarkSVG
                        kit={kit}
                        mono={mono}
                        className={`w-[62%] max-w-[260px] aspect-square ${mono ? "text-ink" : ""}`}
                      />
                    )}
                  </div>
                  <div className="px-5 py-4 border-t border-ink/15 flex items-baseline justify-between">
                    <span className="lab-xs text-ash">
                      Receta {kit.mark.recipe} · trazo {kit.mark.sw} u
                    </span>
                    <span className="lab-xs text-ash tnum">100 × 100</span>
                  </div>
                </div>

                {/* paleta + tipografía */}
                <div className="col-span-12 md:col-span-6">
                  <div className="px-5 py-4 border-b border-ink/15 flex items-baseline justify-between">
                    <span className="lab-xs">Paleta · {kit.palette.name}</span>
                    <span className="lab-xs text-ash">clic para copiar</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-px bg-ink/15">
                    {kit.palette.swatches.map((s) => (
                      <li key={s.hex}>
                        <button
                          onClick={() => copy(s.hex)}
                          className="w-full text-left bg-paper px-4 py-3 hover:bg-ink/5 transition-colors group"
                        >
                          <span
                            className="block h-10 border border-ink/10"
                            style={{ background: s.hex }}
                            aria-hidden="true"
                          />
                          <span className="mt-2 flex items-center justify-between">
                            <span className="lab-xs">{s.name}</span>
                            {copied === s.hex ? (
                              <Check size={12} className="text-spot" />
                            ) : (
                              <Copy size={12} className="opacity-25 group-hover:opacity-60" />
                            )}
                          </span>
                          <span className="tnum text-[0.72rem] text-ash">{s.hex}</span>
                          <span className="block lab-xs text-ash/70 mt-1">{s.role}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-5 py-5 border-t border-ink/15">
                    <div className="lab-xs text-ash">Tipografía · {kit.pairing.scale}</div>
                    <div
                      className="mt-3 uppercase leading-[0.85] tracking-[-0.035em] text-[clamp(2rem,5vw,3.4rem)] truncate"
                      style={displayStyle}
                    >
                      {nombre || "Marca"}
                    </div>
                    <div className="lab-xs text-ash mt-2">{kit.pairing.display} · titulares</div>
                    <p className="mt-4 text-[0.95rem] leading-[1.5]" style={textStyle}>
                      Texto corriente a 16 px sobre {kit.palette.swatches[1].name.toLowerCase()}.{" "}
                      {kit.pairing.text} para desarrollo de párrafo y datos.
                    </p>
                    <div className="lab-xs text-ash mt-2">{kit.pairing.text} · texto</div>
                  </div>
                </div>
              </div>
            </div>

            {/* normas de uso */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4" data-reveal>
              {[
                { ok: true, label: "Uso correcto", note: "Tamaño y contraste plenos", style: {} },
                { ok: false, label: "No deformar", note: "Escalado no proporcional", style: { transform: "scaleX(1.45) scaleY(0.8)" } },
                { ok: false, label: "No rotar", note: "Ejes fijos a 0° y 90°", style: { transform: "rotate(22deg)" } },
                {
                  ok: false,
                  label: "No bajar contraste",
                  note: "Mínimo 4.5:1 sobre fondo",
                  style: { opacity: 0.18 },
                },
              ].map((r) => (
                <figure key={r.label} className="border border-paper/20 bg-paper/[0.04] p-4">
                  <div
                    className="aspect-square flex items-center justify-center relative overflow-hidden"
                    style={{ background: kit.palette.swatches[1].hex }}
                  >
                    <div style={r.style} className="w-[58%]">
                      <MarkSVG kit={kit} className="w-full aspect-square" />
                    </div>
                    <span
                      className={`absolute top-2 right-2 lab-xs px-2 py-1 ${
                        r.ok ? "bg-ink text-paper" : "bg-spot text-paper"
                      }`}
                    >
                      {r.ok ? "Sí" : "No"}
                    </span>
                  </div>
                  <figcaption className="mt-3">
                    <span className="lab-xs block">{r.label}</span>
                    <span className="mt-1 block text-[0.72rem] text-paper/75 leading-tight">{r.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 lab-xs text-paper/70" data-reveal>
              Aplicaciones previstas: {kit.aplicaciones.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
