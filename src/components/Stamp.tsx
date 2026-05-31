export function Stamp({
  label = "FOUND",
  rotation = -8,
  size = 92,
  className = "",
}: {
  label?: string;
  rotation?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="3"
            />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
        </defs>
        <g
          filter="url(#rough)"
          stroke="var(--coral)"
          fill="none"
          strokeWidth="2.4"
          opacity="0.78"
        >
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="38" />
        </g>
        <g opacity="0.82">
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fill="var(--coral)"
            className="stamp-text"
            style={{ fontSize: 16 }}
          >
            {label}
          </text>
        </g>
        <g fill="var(--coral)" opacity="0.7">
          <circle cx="20" cy="50" r="1.6" />
          <circle cx="80" cy="50" r="1.6" />
        </g>
      </svg>
    </div>
  );
}
