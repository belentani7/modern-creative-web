import OrbitalCore from "../components/Orbital";

const META: [string, string][] = [
  ["Nombre", "Belén Tani"],
  ["Función", "Staff Product Designer"],
  ["Laboratorio", "NOIACORE LAB"],
  ["Práctica", "Marca + SaaS GUI"],
  ["Archivo", "github.com/belentani7"],
];

export default function Hero() {
  return (
    <section id="portada" className="relative grain overflow-hidden bg-paper">
      {/* fondo: consola del laboratorio */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="images/lab.jpg"
          alt=""
          className="absolute inset-0 h-[112%] w-full object-cover duotone -top-[6%] opacity-85"
          data-parallax="0.3"
          loading="eager"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070c] via-[#05070c]/85 to-[#05070c]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-[#05070c]/70" />
        <div className="absolute inset-0 sheet-grid opacity-60" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 pt-[124px] lg:pt-32 pb-10">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 rule pt-3">
          <span className="lab text-spot tnum">00</span>
          <span className="lab">Manual de normas gráficas</span>
          <span className="lab text-ash">Edición 2026 · v1.0</span>
          <span className="flex-1 ticks h-[6px] opacity-40 hidden sm:block" aria-hidden="true" />
          <span className="lab text-ash tnum">core · 2 900 K</span>
        </div>

        <div className="mt-10 md:mt-16 grid grid-cols-12 gap-x-8 gap-y-12 items-center">
          {/* titular */}
          <div className="col-span-12 lg:col-span-7">
            <p className="lab text-spot mb-6">NOIACORE LAB · creadora de marcas profesional</p>
            <h1 className="font-display uppercase leading-[0.8] tracking-[-0.05em] text-[clamp(3.2rem,13vw,11rem)] md:w-[112%]">
              <span className="block" data-reveal>
                Creador
              </span>
              <span className="block" data-reveal>
                de <em className="voice lowercase tracking-[-0.02em] text-spot">marcas</em>
              </span>
            </h1>
            <div className="mt-8 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-ink-soft" data-reveal>
              <p>
                Identidad visual de nivel <strong className="font-semibold text-ink">Staff</strong> y
                producto digital construido a mano: sistemas de diseño, interfaces SaaS y código React
                que no se deforma entre la lámina y la pantalla.
              </p>
              <p className="mt-4 voice text-[1.35rem] leading-[1.35] text-ink">
                Un logo no es un dibujo: es una decisión de negocio con medidas.
              </p>
            </div>

            <p className="mt-7 lab caret text-ash" data-reveal>
              &gt; core.init --mark Λ --palette "mínima, sin tonos cálidos"
            </p>

            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <a
                href="#estudio"
                className="lab bg-ink text-paper px-6 py-4 hover:bg-spot hover:text-paper transition-colors duration-200"
              >
                Crear mi marca →
              </a>
              <a
                href="#trabajo"
                className="lab border border-ink/30 px-6 py-4 hover:border-spot hover:bg-spot/10 transition-colors duration-200"
              >
                Ver láminas 04
              </a>
            </div>
          </div>

          {/* núcleo orbital */}
          <figure className="col-span-12 lg:col-span-5 relative">
            <div className="relative">
              {/* material: anillos mecanizados bajo el vector */}
              <img
                src="images/core.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover duotone opacity-45"
                style={{
                  maskImage: "radial-gradient(circle at center, #000 38%, transparent 72%)",
                  WebkitMaskImage: "radial-gradient(circle at center, #000 38%, transparent 72%)",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 glow-core" aria-hidden="true" />
              <OrbitalCore className="relative w-full max-w-[460px] mx-auto h-auto" />
            </div>
            <figcaption className="mt-4 flex justify-between lab-xs text-ash">
              <span>Key visual · núcleo Λ</span>
              <span className="tnum">3 anillos · r 96 / 140 / 184</span>
            </figcaption>
          </figure>
        </div>

        {/* ficha técnica */}
        <dl
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-5 gap-px bg-ink/15 border border-ink/15"
          data-reveal
        >
          {META.map(([k, v]) => (
            <div key={k} className="bg-paper/85 px-4 py-5">
              <dt className="lab-xs text-ash">{k}</dt>
              <dd className="mt-2 text-[0.95rem] font-medium leading-tight">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
