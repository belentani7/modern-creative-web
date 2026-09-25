/**
 * Motor de marcas vectoriales.
 * Toda la geometría se calcula aquí: no hay ningún mapa de bits en la salida,
 * solo path data escrita por código sobre una retícula de 100 × 100.
 */

export type StyleKey = "minimalista" | "clasico" | "moderno" | "divertido";

export interface Part {
  d: string;
  role: "container" | "core" | "accent";
  fill?: boolean;
  cap?: "butt" | "round";
}

export interface MarkSpec {
  parts: Part[];
  sw: number;
  recipe: string;
  rot: number;
}

export interface Swatch {
  hex: string;
  role: string;
  name: string;
}

export interface Palette {
  name: string;
  swatches: Swatch[];
  accentIndex: number;
}

export interface Pairing {
  display: string;
  text: string;
  cssDisplay: string;
  cssText: string;
  scale: string;
}

export interface BrandKit {
  mark: MarkSpec;
  palette: Palette;
  pairing: Pairing;
  concepto: string;
  aplicaciones: string[];
}

/* ── utilidades ─────────────────────────────────────────────────── */

const R = (n: number) => Math.round(n * 100) / 100;

export function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFrom(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const pt = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [R(cx + r * Math.cos(a)), R(cy + r * Math.sin(a))];
};

export function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

export function circlePath(cx: number, cy: number, r: number): string {
  return `M ${R(cx - r)} ${R(cy)} A ${r} ${r} 0 1 0 ${R(cx + r)} ${R(cy)} A ${r} ${r} 0 1 0 ${R(cx - r)} ${R(cy)} Z`;
}

export function polyPath(pts: [number, number][], close = true): string {
  const head = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${R(p[0])} ${R(p[1])}`).join(" ");
  return close ? `${head} Z` : head;
}

export function roundRectPath(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M ${R(x + rr)} ${R(y)}`,
    `H ${R(x + w - rr)}`,
    `A ${rr} ${rr} 0 0 1 ${R(x + w)} ${R(y + rr)}`,
    `V ${R(y + h - rr)}`,
    `A ${rr} ${rr} 0 0 1 ${R(x + w - rr)} ${R(y + h)}`,
    `H ${R(x + rr)}`,
    `A ${rr} ${rr} 0 0 1 ${R(x)} ${R(y + h - rr)}`,
    `V ${R(y + rr)}`,
    `A ${rr} ${rr} 0 0 1 ${R(x + rr)} ${R(y)}`,
    "Z",
  ].join(" ");
}

export function barPath(x: number, y: number, w: number, h: number): string {
  return roundRectPath(x, y, w, h, Math.min(h / 2, 2));
}

/* ── recetas de símbolo ─────────────────────────────────────────── */

const RECIPES = ["Órbita", "Cuña", "Ritmo", "Vértice"] as const;

const SW: Record<StyleKey, number> = {
  minimalista: 3.2,
  clasico: 6,
  moderno: 11,
  divertido: 8,
};

function recipeOrbita(rnd: () => number, sw: number): Part[] {
  const a0 = Math.round(rnd() * 120);
  const span = 190 + Math.round(rnd() * 90);
  const inner = 20 + rnd() * 6;
  const dot = pt(50, 50, 38, a0 + span + 26);
  return [
    { d: arcPath(50, 50, 38, 0, 359.9), role: "container" },
    { d: arcPath(50, 50, inner, a0, a0 + span), role: "core", cap: "round" },
    { d: polyPath([pt(50, 50, 4, a0 + span / 2), pt(50, 50, 30, a0 + span / 2)], false), role: "core" },
    { d: circlePath(dot[0], dot[1], sw * 0.75 + 2), role: "accent", fill: true },
  ];
}

function recipeCuna(rnd: () => number, sw: number): Part[] {
  const rot = Math.round(rnd() * 45);
  const tip = pt(50, 50, 32, rot);
  const l = pt(50, 50, 32, rot + 132);
  const rr = pt(50, 50, 32, rot + 228);
  return [
    { d: roundRectPath(11, 11, 78, 78, 8 + Math.round(rnd() * 14)), role: "container" },
    { d: polyPath([tip, l, rr]), role: "core", fill: true },
    { d: polyPath([pt(50, 50, 12, rot + 180), pt(50, 50, 12, rot), pt(50, 50, 22, rot)], true), role: "accent", fill: true },
    { d: barPath(24, 76, 52 - sw, sw * 0.6), role: "core", fill: true },
  ];
}

function recipeRitmo(rnd: () => number, sw: number): Part[] {
  const n = 3 + Math.floor(rnd() * 2);
  const parts: Part[] = [
    { d: arcPath(50, 50, 38, 200 + rnd() * 40, 340 + rnd() * 40), role: "container" },
  ];
  const top = 50 - ((n - 1) * 15) / 2;
  for (let i = 0; i < n; i++) {
    const w = 26 + Math.floor(rnd() * 24) + i * 4;
    parts.push({
      d: barPath(20 + i * 2, top + i * 15, Math.min(62, w), 8 + sw * 0.35),
      role: i === n - 1 ? "accent" : "core",
      fill: true,
    });
  }
  return parts;
}

function recipeVertice(rnd: () => number, sw: number): Part[] {
  const rise = 22 + rnd() * 10;
  const flip = rnd() > 0.5;
  const p: [number, number][] = flip
    ? [
        [18, 72],
        [50, rise],
        [82, 72],
      ]
    : [
        [18, 28],
        [50, 100 - rise],
        [82, 28],
      ];
  return [
    { d: circlePath(50, 50, 39), role: "container" },
    { d: polyPath(p, false), role: "core", cap: "round" },
    { d: barPath(26, flip ? 82 : 12, 48, sw * 0.5 + 3), role: "core", fill: true },
    { d: circlePath(flip ? 82 : 18, flip ? 28 : 72, sw * 0.7 + 1.6), role: "accent", fill: true },
  ];
}

const RECIPE_FNS = [recipeOrbita, recipeCuna, recipeRitmo, recipeVertice];

/* ── paletas y tipografía ───────────────────────────────────────── */

/* Auditoría de armonía visual: ningún tono cálido ni saturado en la identidad
   por defecto. Los temas plasma (rojo) y neon (verde) son variantes opcionales,
   igual que en la terminal de NOIACORE. */
const PALETTES: Record<StyleKey, Palette> = {
  minimalista: {
    name: "Nieve y Cobalto",
    accentIndex: 2,
    swatches: [
      { hex: "#0B101A", role: "Tinta principal", name: "Grafito" },
      { hex: "#EDF1F8", role: "Soporte", name: "Nieve" },
      { hex: "#1F4FD8", role: "Acento", name: "Cobalto" },
      { hex: "#9AA7BC", role: "Neutro", name: "Bruma" },
    ],
  },
  clasico: {
    name: "Acero y Hielo",
    accentIndex: 3,
    swatches: [
      { hex: "#0E1420", role: "Tinta principal", name: "Acero" },
      { hex: "#DCE4F0", role: "Soporte", name: "Hielo" },
      { hex: "#46566F", role: "Secundario", name: "Pizarra" },
      { hex: "#8FA6C6", role: "Acento", name: "Zinc" },
    ],
  },
  moderno: {
    name: "NOIΛCORE",
    accentIndex: 3,
    swatches: [
      { hex: "#05070C", role: "Tinta principal", name: "Núcleo" },
      { hex: "#E7EDF7", role: "Soporte", name: "Señal" },
      { hex: "#7C8AA1", role: "Neutro", name: "Frío" },
      { hex: "#4D8DFF", role: "Acento", name: "Azul núcleo" },
    ],
  },
  divertido: {
    name: "Plasma y Neón",
    accentIndex: 2,
    swatches: [
      { hex: "#0A0F1A", role: "Tinta principal", name: "Abisal" },
      { hex: "#EAF0FA", role: "Soporte", name: "Vapor" },
      { hex: "#FF5C6E", role: "Acento", name: "Plasma" },
      { hex: "#4EE39A", role: "Secundario", name: "Neón" },
    ],
  },
};

const PAIRINGS: Record<StyleKey, Pairing> = {
  minimalista: {
    display: "Space Grotesk 300",
    text: "JetBrains Mono",
    cssDisplay: "var(--font-display)",
    cssText: "var(--font-mono)",
    scale: "1.333 · cuarta justa",
  },
  clasico: {
    display: "Space Grotesk 500",
    text: "Inter 400",
    cssDisplay: "var(--font-serif)",
    cssText: "var(--font-sans)",
    scale: "1.250 · tercera menor",
  },
  moderno: {
    display: "Space Grotesk 700",
    text: "Inter 400",
    cssDisplay: "var(--font-display)",
    cssText: "var(--font-sans)",
    scale: "1.333 · cuarta justa",
  },
  divertido: {
    display: "Space Grotesk 700",
    text: "JetBrains Mono",
    cssDisplay: "var(--font-display)",
    cssText: "var(--font-serif)",
    scale: "1.414 · cuarta aumentada",
  },
};

const APLICACIONES: Record<StyleKey, string[]> = {
  minimalista: ["App SaaS y dashboard", "Papelería A4", "Firma de correo", "Ícono 16 px"],
  clasico: ["Etiqueta troquelada", "Sello en seco", "Carta de restaurante", "Rótulo latón"],
  moderno: ["Producto digital", "Valla 8 × 3 m", "Tarjeta 85 × 55", "Pantalla de carga"],
  divertido: ["Packaging ligero", "Sticker troquelado", "Merch textil", "Avatar social"],
};

export const STYLES: { key: StyleKey; label: string; nota: string }[] = [
  { key: "minimalista", label: "Minimalista", nota: "Trazo fino, aire, geometría abierta" },
  { key: "clasico", label: "Clásico", nota: "Contenedor cerrado, peso editorial" },
  { key: "moderno", label: "Moderno", nota: "Masa sólula, alto contraste, señalética" },
  { key: "divertido", label: "Divertido", nota: "Ritmo irregular, acento cálido" },
];

export function buildKit(nombre: string, sector: string, style: StyleKey, seedSalt: number): BrandKit {
  const seed = hash(`${nombre}|${sector}|${style}|${seedSalt}`);
  const rnd = rngFrom(seed);
  const idx = seed % 4;
  const parts = RECIPE_FNS[idx](rnd, SW[style]);
  const rot = Math.round(rnd() * 30);
  const palette = PALETTES[style];
  const palabra = (nombre.trim() || "Marca").toUpperCase();
  const sec = sector.trim().toLowerCase() || "tu sector";
  const conceptos = [
    `${palabra}: un cuerpo en órbita y su vector. La promesa de ${sec} medida sobre una retícula de 100 × 100.`,
    `${palabra}: una cuña que corta el contenedor. El punto exacto donde ${sec} deja de ser genérico.`,
    `${palabra}: tres barras en crescendo. El ritmo de ${sec} traducido a módulos de 15.`,
    `${palabra}: dos diagonales que se encuentran. La bisagra entre ${sec} y su público.`,
  ];
  return {
    mark: { parts, sw: SW[style], recipe: RECIPES[idx], rot },
    palette,
    pairing: PAIRINGS[style],
    concepto: conceptos[idx],
    aplicaciones: APLICACIONES[style],
  };
}

/* ── exportación real del SVG ───────────────────────────────────── */

export function markToSvg(kit: BrandKit, name: string, opts?: { mono?: boolean; pad?: number }): string {
  const pad = opts?.pad ?? 8;
  const ink = opts?.mono ? "#05070C" : kit.palette.swatches[0].hex;
  const acc = opts?.mono ? "#05070C" : kit.palette.swatches[kit.palette.accentIndex].hex;
  const body = kit.mark.parts
    .map((p) => {
      const color = p.role === "accent" ? acc : ink;
      return p.fill
        ? `<path d="${p.d}" fill="${color}"/>`
        : `<path d="${p.d}" fill="none" stroke="${color}" stroke-width="${kit.mark.sw}" stroke-linecap="${p.cap ?? "butt"}" stroke-linejoin="round"/>`;
    })
    .join("\n  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${pad} ${pad} ${100 - pad * 2} ${100 - pad * 2}" width="512" height="512" role="img" aria-label="Símbolo ${name}">
  <title>${name} — símbolo</title>
  ${body}
</svg>`;
}

export function downloadSvg(kit: BrandKit, name: string) {
  const safe = (name || "marca").trim().replace(/\s+/g, "-").toLowerCase();
  const blob = new Blob([markToSvg(kit, name)], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safe}-simbolo.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* ── Glifo Λ del núcleo (path data dibujada a mano) ───────────────── */

export const LAMBDA_MARK = {
  viewBox: "0 0 240 200",
  strokes: ["M 52 172 L 120 32 L 188 172"],
  accent: circlePath(120, 208, 7),
};

export const BT_MARK = LAMBDA_MARK;
