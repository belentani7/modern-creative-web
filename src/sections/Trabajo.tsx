import { SectionHead } from "../components/ui";

interface Caso {
  n: string;
  nombre: string;
  sector: string;
  anio: string;
  img: string;
  alt: string;
  texto: string;
  metricas: [string, string][];
  servicios: string[];
  band?: boolean;
}

const CASOS: Caso[] = [
  {
    n: "01",
    nombre: "Cardume",
    sector: "Tostador de café de especialidad · Vigo",
    anio: "2025",
    img: "images/collateral.jpg",
    alt: "Papelería corporativa impresa en papel de algodón con emblema en relieve y banda de color frío",
    texto:
      "Identidad completa para un tostador que vende a hostelería y por suscripción. Símbolo construido sobre módulo de grano, paleta de dos tintas y etiquetas que se imprimen en una sola pasada para bajar coste sin bajar nivel.",
    metricas: [
      ["34", "SKU etiquetados"],
      ["+41%", "Recuerdo de marca"],
      ["6", "Semanas de proyecto"],
    ],
    servicios: ["Naming", "Símbolo", "Packaging", "Web"],
  },
  {
    n: "02",
    nombre: "Mercado de San Fernando",
    sector: "Señalética municipal · 21.000 visitas/semana",
    anio: "2024",
    img: "images/signage.jpg",
    alt: "Panel direccional de color frío y rótulo metálico oscuro sobre fachada de hormigón",
    texto:
      "Sistema de señalética para un mercado de 84 paradas: jerarquía de tres niveles, pictogramas dibujados a mano y contraste verificado en laboratorio de accesibilidad. Todo el sistema cabe en un manual de 18 láminas.",
    metricas: [
      ["78", "Rótulos producidos"],
      ["100%", "Contraste AA verificado"],
      ["18", "Láminas de manual"],
    ],
    servicios: ["Wayfinding", "Pictogramas", "Normas", "Producción"],
    band: true,
  },
  {
    n: "03",
    nombre: "Terrón",
    sector: "Cosmética sólida · packaging compostable",
    anio: "2026",
    img: "images/packaging.jpg",
    alt: "Barras de jabón sólido y envoltorio de papel con banda oscura y sello circular",
    texto:
      "Marca y packaging para cosmética sin agua: tipografía grabada a fuego sobre papel kraft, sello de cera vegetal y una ficha de materiales que viaja dentro de cada caja. Meno cartón, más criterio.",
    metricas: [
      ["12", "Referencias"],
      ["−38%", "Cartón por unidad"],
      ["4", "Materias certificadas"],
    ],
    servicios: ["Marca", "Packaging", "Ficha de materiales", "Fotografía"],
  },
];

function CasoLamina({ caso, flip, dark = false }: { caso: Caso; flip: boolean; dark?: boolean }) {
  const line = dark ? "border-paper/25" : "border-ink/25";
  const meta = dark ? "text-paper/75" : "text-ash";
  const body = dark ? "text-paper/75" : "text-ink-soft";
  const cell = dark ? "bg-paper/15 border-paper/20" : "bg-ink/15 border-ink/15";
  const cellBg = dark ? "bg-ink" : "bg-paper";
  return (
    <article className="grid grid-cols-12 gap-x-8 gap-y-8 items-start">
      <figure
        className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="relative overflow-hidden bg-paper-2 aspect-[3/2]">
          <img
            src={caso.img}
            alt={caso.alt}
            loading="lazy"
            className="absolute inset-0 h-[120%] w-full object-cover -top-[10%] duotone"
            data-parallax="0.5"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent mix-blend-multiply" />
          <span className="absolute left-4 top-4 lab-xs bg-paper/90 px-2 py-1 tnum">Lám. 04-{caso.n}</span>
        </div>
      </figure>

      <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-1" : ""}`} data-reveal>
        <div className={`flex items-baseline gap-4 border-t ${line} pt-3`}>
          <span className="lab text-spot tnum">{caso.n}</span>
          <span className={`lab ${meta}`}>{caso.anio}</span>
        </div>
        <h3 className="mt-4 font-display uppercase leading-[0.88] tracking-[-0.035em] text-[clamp(2.1rem,5vw,3.6rem)]">
          {caso.nombre}
        </h3>
        <p className={`mt-2 lab-xs ${meta}`}>{caso.sector}</p>
        <p className={`mt-5 text-[1rem] leading-[1.55] ${body} max-w-[46ch]`}>{caso.texto}</p>

        <dl className={`mt-7 grid grid-cols-3 gap-px border ${cell}`}>
          {caso.metricas.map(([v, k]) => (
            <div key={k} className={`${cellBg} px-3 py-4`}>
              <dt className="tnum text-[clamp(1.4rem,3vw,2rem)] leading-none">{v}</dt>
              <dd className={`lab-xs ${meta} mt-2 leading-tight`}>{k}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {caso.servicios.map((s) => (
            <li key={s} className={`lab-xs border ${line} px-3 py-2 ${body}`}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Trabajo() {
  return (
    <section id="trabajo" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <SectionHead
          index="04"
          kicker="Trabajo / láminas seleccionadas"
          title="Marcas en"
          italic="producción"
          lede="Tres expedientes cerrados: del tostador al mercado municipal. Identidad que aguanta el papel, la fachada y la pantalla del panel de administración."
        />
      </div>

      <div className="mx-auto max-w-[1500px] px-6 md:px-12 space-y-24 md:space-y-32">
        <CasoLamina caso={CASOS[0]} flip={false} />
      </div>

      {/* banda a sangre */}
      <div className="relative my-24 md:my-32 bg-ink text-paper py-16 md:py-24 grain">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <CasoLamina caso={CASOS[1]} flip dark />
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <CasoLamina caso={CASOS[2]} flip={false} />
      </div>
    </section>
  );
}
