"use client";

export function ProgressWreath({
  found,
  total,
  size = 88,
}: {
  found: number;
  total: number;
  size?: number;
}) {
  const stroke = 4;
  const r = (size - stroke) / 2 - 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, found / total));
  const offset = c * (1 - pct);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`${found} of ${total} found`}
      >
        <defs>
          <linearGradient id="wreath" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--coral)" />
            <stop offset="100%" stopColor="var(--coral-deep)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r + 4}
          fill="none"
          stroke="var(--warm-line)"
          strokeWidth="0.8"
          strokeDasharray="2 4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(33,9,9,0.10)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#wreath)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 700ms cubic-bezier(0.2,0.7,0.2,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span
          className="font-display text-ink"
          style={{ fontSize: size * 0.32, fontWeight: 700 }}
        >
          {found}
        </span>
        <span className="text-ink-mute text-[9.5px] mt-0.5 eyebrow">
          of {total}
        </span>
      </div>
    </div>
  );
}
