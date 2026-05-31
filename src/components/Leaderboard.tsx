"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

function formatDuration(ms?: number) {
  if (!ms) return "—";
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  if (minutes < 60) return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
  const h = Math.floor(minutes / 60);
  return `${h}h ${minutes % 60}m`;
}

export function Leaderboard({
  open,
  onClose,
  selfId,
}: {
  open: boolean;
  onClose: () => void;
  selfId: Id<"players"> | null;
}) {
  const data = useQuery(api.leaderboard.top, open ? {} : "skip");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute right-0 top-0 bottom-0 w-[88%] max-w-md bg-blush shadow-2xl flex flex-col"
            variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            aria-label="Leaderboard"
          >
            <header className="px-6 pt-7 pb-3 flex items-baseline justify-between">
              <div>
                <p className="eyebrow text-[10.5px] text-coral">the field</p>
                <h2
                  className="font-display text-[32px] leading-none text-ink mt-1"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  Leaderboard
                </h2>
              </div>
              <button
                onClick={onClose}
                className="eyebrow text-[11px] text-ink-mute hover:text-ink"
              >
                close
              </button>
            </header>
            <div className="rule mx-6" />
            <div className="flex-1 overflow-y-auto px-6 pt-3 pb-10 scroll-hide">
              {!data ? (
                <p className="text-sm text-ink-mute italic mt-6">
                  Gathering names…
                </p>
              ) : data.players.length === 0 ? (
                <p className="text-sm text-ink-mute italic mt-6">
                  No hunters have logged in yet.
                </p>
              ) : (
                <ol className="mt-4 space-y-3">
                  {data.players.map((p, i) => {
                    const isMe = p.playerId === selfId;
                    const isComplete = !!p.completedAt;
                    return (
                      <li
                        key={p.playerId}
                        className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-2"
                      >
                        <span
                          className="eyebrow text-coral text-[11px]"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p
                            className="font-display text-[17px] leading-tight truncate"
                            style={{
                              color: isMe ? "var(--coral-deep)" : "var(--ink)",
                            }}
                          >
                            {p.displayName}
                            {isMe && (
                              <span className="eyebrow text-[10px] text-coral ml-2">
                                you
                              </span>
                            )}
                          </p>
                          <p className="text-[11.5px] text-ink-mute mt-0.5">
                            {isComplete
                              ? `finished in ${formatDuration(p.completionDurationMs)}`
                              : `${p.foundCount} of ${data.total} found`}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isComplete && (
                            <span
                              aria-hidden
                              className="block w-2.5 h-2.5 rounded-full bg-coral"
                            />
                          )}
                          <span
                            className="font-display text-[20px] tabular-nums"
                            style={{
                              color: isComplete
                                ? "var(--coral-deep)"
                                : "var(--ink-soft)",
                            }}
                          >
                            {p.foundCount}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
            <footer className="px-6 py-4 border-t border-ink/10 eyebrow text-[10px] text-ink-mute/80">
              first to fill all {data?.total ?? 24} wins · live updates
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
