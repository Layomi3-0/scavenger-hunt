"use client";

import { Stamp } from "./Stamp";

export function HuntCard({
  id,
  emoji,
  text,
  short,
  completed,
  targetName,
  targetNote,
  onTap,
  index,
}: {
  id: number;
  emoji: string;
  text: string;
  short: string;
  completed: boolean;
  targetName?: string;
  targetNote?: string;
  onTap: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onTap}
      className="card-lift group relative w-full text-left rounded-[16px] overflow-hidden focus:outline-none"
      style={{
        background: completed
          ? "linear-gradient(180deg, var(--coral-tint), var(--blush-deep))"
          : "linear-gradient(180deg, var(--cream-card), var(--blush))",
        boxShadow: completed
          ? "0 1px 0 rgba(33,9,9,0.06), inset 0 0 0 1px rgba(210,59,58,0.22)"
          : "0 1px 0 rgba(33,9,9,0.06), 0 10px 24px -18px rgba(33,9,9,0.3), inset 0 0 0 1px rgba(33,9,9,0.10)",
        animationDelay: `${index * 28}ms`,
      }}
    >
      <div className="absolute inset-x-3.5 top-[34px] perf opacity-50" />

      <div className="flex items-start justify-between px-4 pt-3 pb-2">
        <span
          className="eyebrow text-[10px] text-coral"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          № {String(id).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="text-[18px] leading-none"
          style={{ filter: completed ? "none" : "saturate(0.9)" }}
        >
          {emoji}
        </span>
      </div>

      <div className="px-4 pt-3 pb-4 min-h-[150px] flex flex-col">
        <p
          className="font-display text-[17px] leading-[1.15] text-ink"
          style={{ letterSpacing: "-0.005em" }}
        >
          {short}
        </p>
        <p className="mt-1.5 text-[11.5px] leading-[1.4] text-ink-mute">
          {text}
        </p>

        <div className="mt-auto pt-3">
          {completed && targetName ? (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="eyebrow text-[9.5px] text-coral">found</span>
                <span className="font-display text-[14px] text-coral-deep">
                  {targetName}
                </span>
              </div>
              {targetNote && (
                <p className="mt-1 text-[11px] text-ink-mute italic leading-snug line-clamp-2">
                  {targetNote}
                </p>
              )}
            </div>
          ) : (
            <span className="eyebrow text-[10px] text-ink-mute/70">
              tap to mark
            </span>
          )}
        </div>
      </div>

      {completed && (
        <div className="pointer-events-none absolute top-3 right-2 animate-stamp origin-center">
          <Stamp label="FOUND" rotation={-9} size={70} />
        </div>
      )}
    </button>
  );
}
