"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export type Milestone = "halfway" | "complete" | null;

export function MilestoneSeal({
  milestone,
  onDismiss,
  duration,
  playerName,
}: {
  milestone: Milestone;
  onDismiss: () => void;
  duration?: number;
  playerName?: string;
}) {
  useEffect(() => {
    if (!milestone) return;
    if (milestone === "halfway") {
      const t = setTimeout(onDismiss, 2400);
      return () => clearTimeout(t);
    }
  }, [milestone, onDismiss]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(210,59,58,0.92), rgba(33,9,9,0.96))",
            }}
          />

          {milestone === "complete" &&
            Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${(i * 73) % 100}%`,
                  top: "-10%",
                  color: i % 3 === 0 ? "#f7d7a4" : "#fdf6f6",
                }}
                initial={{ y: -40, opacity: 0, rotate: 0 }}
                animate={{
                  y: "120vh",
                  opacity: [0, 1, 1, 0],
                  rotate: 360 + (i % 2 === 0 ? 80 : -80),
                }}
                transition={{
                  duration: 4 + (i % 5) * 0.4,
                  delay: i * 0.12,
                  ease: "linear",
                  repeat: 1,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                  <path
                    d="M 11 2 L 13 9 L 20 11 L 13 13 L 11 20 L 9 13 L 2 11 L 9 9 Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                </svg>
              </motion.div>
            ))}

          <motion.div
            className="relative text-center px-8"
            initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <div className="mx-auto mb-6 w-44 h-44 rounded-full flex items-center justify-center border-[3px] border-blush/85 relative">
              <div
                className="absolute inset-2 rounded-full border border-blush/45"
                aria-hidden
              />
              <div className="text-blush">
                <p className="eyebrow text-[11px] opacity-85">
                  {milestone === "halfway" ? "halfway" : "complete"}
                </p>
                <p
                  className="font-display text-[56px] leading-none mt-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {milestone === "halfway" ? "12" : "24"}
                </p>
                <p className="eyebrow text-[10.5px] opacity-85 mt-1">of 24</p>
              </div>
            </div>

            {milestone === "halfway" ? (
              <>
                <h2 className="font-display text-blush text-[30px] leading-tight">
                  You're halfway across the room.
                </h2>
                <p className="text-blush/80 mt-2 italic text-[16px]">
                  Twelve more souls to meet.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-blush text-[40px] leading-tight">
                  {playerName ? `Well done, ${playerName}.` : "Well done."}
                </h2>
                <p className="text-blush/85 mt-2 text-[18px] italic font-display-regular">
                  Every square filled — show this to a host.
                </p>
                {duration !== undefined && (
                  <p className="eyebrow text-blush/75 mt-4 text-[11px]">
                    finished in{" "}
                    {(() => {
                      const m = Math.floor(duration / 60000);
                      const s = Math.floor((duration % 60000) / 1000);
                      return `${m}m ${String(s).padStart(2, "0")}s`;
                    })()}
                  </p>
                )}
                <button
                  onClick={onDismiss}
                  className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-blush text-coral-deep font-semibold tracking-wide"
                >
                  Back to my card
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
