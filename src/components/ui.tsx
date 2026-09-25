import type { ReactNode } from "react";
import type { BrandKit } from "../lib/brand";

export function MarkSVG({
  kit,
  mono = false,
  className = "",
}: {
  kit: BrandKit;
  mono?: boolean;
  className?: string;
}) {
  const ink = mono ? "currentColor" : kit.palette.swatches[0].hex;
  const acc = mono ? "currentColor" : kit.palette.swatches[kit.palette.accentIndex].hex;
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Símbolo vectorial generado">
      {kit.mark.parts.map((p, i) => {
        const color = p.role === "accent" ? acc : ink;
        return p.fill ? (
          <path key={i} d={p.d} fill={color} />
        ) : (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={color}
            strokeWidth={kit.mark.sw}
            strokeLinecap={p.cap ?? "butt"}
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  italic,
  lede,
}: {
  index: string;
  kicker: string;
  title: string;
  italic?: string;
  lede?: string;
}) {
  return (
    <header className="mb-14 md:mb-20" data-reveal>
      <div className="flex items-baseline gap-4 rule pt-3">
        <span className="lab text-spot tnum">{index}</span>
        <span className="lab text-ash">{kicker}</span>
        <span className="flex-1 ticks h-[6px] opacity-40" aria-hidden="true" />
      </div>
      <h2 className="mt-6 font-display uppercase leading-[0.85] tracking-[-0.04em] text-[clamp(2.6rem,7.2vw,6.2rem)]">
        {title}
        {italic ? <em className="voice lowercase text-spot tracking-[-0.01em]"> {italic}</em> : null}
      </h2>
      {lede ? (
        <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.55] text-ink-soft">{lede}</p>
      ) : null}
    </header>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden bg-ink py-3 select-none" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="lab text-paper px-6 whitespace-nowrap">
                {t}
                <span className="text-spot px-6">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="lab-xs text-paper/70">{label}</span>
      <div className="mt-2">{children}</div>
      {hint ? <span className="mt-2 block lab-xs text-paper/60">{hint}</span> : null}
    </label>
  );
}
