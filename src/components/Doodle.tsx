// Playful coral doodles in the spirit of publicworship.life — flags, sparkles, hearts.

export function FlagDoodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M 22 14 L 22 88" />
        <path
          d="M 22 18 C 38 14, 54 30, 70 20 L 70 48 C 54 58, 38 42, 22 50 Z"
          fill="currentColor"
          fillOpacity="0.18"
        />
      </g>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="22" cy="14" r="2.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export function SparkleCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M 50 12 L 50 32 M 40 22 L 60 22" />
        <path d="M 22 56 L 22 70 M 16 63 L 28 63" opacity="0.7" />
        <path d="M 78 60 L 78 78 M 70 69 L 86 69" opacity="0.8" />
      </g>
      <g fill="currentColor" fillOpacity="0.6">
        <circle cx="44" cy="76" r="2.4" />
        <circle cx="62" cy="44" r="2" />
      </g>
    </svg>
  );
}

export function CloudDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path
          d="M 22 56 C 14 56, 12 42, 24 40 C 24 26, 46 24, 50 36 C 60 28, 80 32, 80 46 C 92 46, 96 60, 84 60 Z"
          fill="currentColor"
          fillOpacity="0.16"
        />
        <path d="M 12 70 L 24 70" opacity="0.6" />
        <path d="M 32 76 L 60 76" opacity="0.5" />
      </g>
    </svg>
  );
}

export function ScrollDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="4"
          fill="currentColor"
          fillOpacity="0.14"
        />
        <path d="M 32 38 L 68 38" />
        <path d="M 32 50 L 62 50" />
        <path d="M 32 62 L 56 62" />
      </g>
    </svg>
  );
}
