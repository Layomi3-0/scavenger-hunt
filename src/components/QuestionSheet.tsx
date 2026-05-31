"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type SheetState = {
  questionId: number;
  text: string;
  short: string;
  alreadyCompleted: boolean;
  targetName?: string;
};

export function QuestionSheet({
  state,
  onClose,
  onSubmit,
  onUndo,
  pending,
}: {
  state: SheetState | null;
  onClose: () => void;
  onSubmit: (name: string) => Promise<string | null>;
  onUndo: () => Promise<void>;
  pending: boolean;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state) {
      setValue("");
      setError(null);
      const t = setTimeout(() => inputRef.current?.focus(), 240);
      return () => clearTimeout(t);
    }
  }, [state]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const err = await onSubmit(value);
    if (err) setError(err);
  }

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full sm:max-w-md mx-auto bg-cream-card rounded-t-[28px] sm:rounded-[20px] shadow-[0_-20px_60px_rgba(33,9,9,0.18)] overflow-hidden"
            variants={{
              hidden: { y: 80, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
          >
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1.5 w-12 rounded-full bg-ink/20" />
            </div>

            <div className="px-6 pt-5 pb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow text-[10.5px] text-coral">
                  № {String(state.questionId).padStart(2, "0")}
                </span>
                <button
                  onClick={onClose}
                  className="text-ink-mute hover:text-ink text-sm eyebrow"
                  aria-label="Close"
                >
                  close
                </button>
              </div>

              <h2
                id="sheet-title"
                className="font-display text-ink leading-[1.1] text-[26px]"
                style={{ letterSpacing: "-0.01em" }}
              >
                Find someone who…
              </h2>
              <p className="text-ink-soft mt-2 text-[16px] leading-snug">
                {state.text.replace(/^Find someone who /i, "")}
              </p>

              <div className="rule my-5" />

              {state.alreadyCompleted ? (
                <div>
                  <p className="text-sm text-ink-soft">
                    You marked this with{" "}
                    <span className="font-display text-coral-deep">
                      {state.targetName}
                    </span>
                    .
                  </p>
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 h-12 rounded-full bg-coral text-white font-semibold tracking-wide"
                    >
                      Keep hunting
                    </button>
                    <button
                      onClick={async () => {
                        await onUndo();
                      }}
                      className="h-12 px-5 rounded-full border border-coral/30 text-coral eyebrow text-[11px]"
                    >
                      undo
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className="eyebrow text-[10.5px] text-coral block mb-2">
                    their name
                  </label>
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoCapitalize="words"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="done"
                    inputMode="text"
                    placeholder="type it out…"
                    className="w-full bg-transparent border-0 border-b-2 border-ink/25 focus:border-coral font-display text-[24px] text-ink py-2 outline-none placeholder:text-ink/25 placeholder:font-display"
                  />
                  {error && (
                    <p className="mt-3 text-[13.5px] text-coral-deep leading-snug">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={pending || value.trim().length < 2}
                    className="mt-6 w-full h-12 rounded-full bg-coral text-white font-semibold tracking-wide disabled:opacity-40 transition-opacity"
                  >
                    {pending ? "Stamping…" : "Mark as found"}
                  </button>
                  <p className="mt-3 text-center text-[11.5px] text-ink-mute/85 italic">
                    Each person can only fill one square — make new friends.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
