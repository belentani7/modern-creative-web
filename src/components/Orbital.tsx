/**
 * Key visual NOIACORE LAB: glifo Λ dentro de tres anillos concéntricos
 * con resplandor radial. Vector puro, animación en CSS.
 */
export default function OrbitalCore({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      className={className}
      role="img"
      aria-label="Núcleo lambda con tres anillos orbitales"
    >
      <defs>
        <radialGradient id="coreGlow">
          <stop offset="0%" stopColor="#9DC4FF" stopOpacity="0.5" />
          <stop offset="38%" stopColor="#4D8DFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4D8DFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="210" cy="210" r="205" fill="url(#coreGlow)" className="orb-glow" />

      <g className="orb-ring" stroke="#4D8DFF" fill="none">
        <circle cx="210" cy="210" r="96" strokeOpacity="0.8" strokeWidth="1" strokeDasharray="3 8" />
        <circle cx="210" cy="114" r="3.4" fill="#9DC4FF" stroke="none" />
      </g>

      <g className="orb-ring orb-ring-2" stroke="#4D8DFF" fill="none">
        <circle cx="210" cy="210" r="140" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="24 12" />
        <circle cx="350" cy="210" r="2.6" fill="#E7EDF7" stroke="none" />
      </g>

      <g className="orb-ring orb-ring-3" stroke="#7C8AA1" fill="none">
        <circle cx="210" cy="210" r="184" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="1 6" />
        <circle cx="210" cy="26" r="2.2" fill="#4D8DFF" stroke="none" />
      </g>

      <g stroke="#E7EDF7" strokeWidth="22" fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M 158 268 L 210 128 L 262 268" />
      </g>
    </svg>
  );
}
