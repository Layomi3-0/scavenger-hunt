"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { readableError } from "@/lib/convexError";
import {
  CloudDoodle,
  FlagDoodle,
  ScrollDoodle,
  SparkleCluster,
} from "./Doodle";

function formatPinDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 6);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)} / ${d.slice(2)}`;
  return `${d.slice(0, 2)} / ${d.slice(2, 4)} / ${d.slice(4)}`;
}

export function SignIn({
  onSignedIn,
}: {
  onSignedIn: (id: Id<"players">, name: string) => void;
}) {
  const register = useMutation(api.players.registerOrLogin);
  const [name, setName] = useState("");
  const [pinDigits, setPinDigits] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pinDisplay = formatPinDisplay(pinDigits);
  const pinValid = pinDigits.length === 6;
  const canSubmit = name.trim().length >= 2 && pinValid && !pending;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setPending(true);
    try {
      const id = await register({ displayName: name, dobPin: pinDigits });
      onSignedIn(id, name.trim());
    } catch (err: unknown) {
      setError(readableError(err, "Couldn't sign in."));
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="relative flex-1 flex flex-col">
      {/* decorative doodles — corners on mobile, floating positions on tablet+ */}
      <FlagDoodle className="pointer-events-none absolute top-3 left-3 w-9 sm:top-24 sm:left-3 sm:w-16 text-coral opacity-80" />
      <SparkleCluster className="pointer-events-none absolute top-3 right-3 w-9 sm:top-36 sm:right-4 sm:w-14 text-coral opacity-80" />
      <ScrollDoodle className="pointer-events-none absolute bottom-3 left-3 w-9 sm:bottom-32 sm:left-5 sm:w-14 text-coral opacity-70" />
      <CloudDoodle className="pointer-events-none absolute bottom-3 right-3 w-14 sm:bottom-24 sm:right-6 sm:w-24 text-coral opacity-70" />

      <div className="flex-1 flex flex-col px-6 pt-12 pb-10 relative z-10 max-w-md w-full mx-auto">
        <p className="eyebrow text-[11px] text-coral">eden community</p>
        <p className="eyebrow text-[11px] text-coral/70 mt-1">
          a scavenger hunt
        </p>

        <h1
          className="font-display text-ink mt-6"
          style={{
            fontSize: "clamp(46px, 14vw, 76px)",
            lineHeight: 0.96,
            letterSpacing: "-0.015em",
          }}
        >
          Find <span className="text-coral">someone</span> who…
        </h1>

        <p className="mt-6 text-ink-soft text-[15px] leading-relaxed max-w-[32ch]">
          Twenty prompts. Mingle, ask questions, and write down the names of
          the people who fit each one. First to fill the card wins.
        </p>

        <form onSubmit={submit} className="mt-9">
          <label className="eyebrow text-[10.5px] text-coral block mb-2">
            your name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoCapitalize="words"
            autoComplete="given-name"
            spellCheck={false}
            enterKeyHint="next"
            placeholder="first and last"
            className="w-full bg-transparent border-0 border-b-2 border-ink/25 focus:border-coral font-display text-[28px] text-ink py-2 outline-none placeholder:text-ink/25 placeholder:font-display"
          />

          <div className="mt-7">
            <label className="eyebrow text-[10.5px] text-coral block mb-2">
              birthday — your pin
            </label>
            <input
              value={pinDisplay}
              onChange={(e) =>
                setPinDigits(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="go"
              placeholder="MM / DD / YY"
              className="w-full bg-transparent border-0 border-b-2 border-ink/25 focus:border-coral font-display text-[28px] text-ink py-2 outline-none placeholder:text-ink/25 placeholder:font-display tracking-[0.05em]"
              maxLength={12}
              aria-describedby="pin-hint"
            />
            <p
              id="pin-hint"
              className="mt-2 text-[11.5px] text-ink-mute leading-relaxed"
            >
              Your birthday is your PIN — so nobody else can sign in as you.
              Use the same one if you come back later.
            </p>
          </div>

          {error && (
            <p className="mt-4 text-[13.5px] text-coral-deep leading-snug">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-7 w-full h-14 rounded-full bg-coral text-white font-semibold tracking-wide text-[15px] disabled:opacity-40 transition-opacity"
          >
            {pending ? "Opening the hunt…" : "Begin the hunt"}
          </button>
          <p className="mt-3 text-[11.5px] text-ink-mute/85 italic text-center">
            Use the name your friends will type to find you.
          </p>
        </form>

        <footer className="mt-auto pt-12">
          <div className="rule mb-3" />
          <p className="eyebrow text-[10px] text-ink-mute/70">
            eden · in the spirit of public worship
          </p>
        </footer>
      </div>
    </main>
  );
}
