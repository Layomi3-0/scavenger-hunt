"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { QUESTIONS } from "@/lib/questions";
import { readableError } from "@/lib/convexError";
import { HuntCard } from "./HuntCard";
import { ProgressWreath } from "./ProgressWreath";
import { QuestionSheet, type SheetState } from "./QuestionSheet";
import { Leaderboard } from "./Leaderboard";
import { MilestoneSeal, type Milestone } from "./MilestoneSeal";

export function HuntBoard({
  playerId,
  onSignOut,
}: {
  playerId: Id<"players">;
  onSignOut: () => void;
}) {
  const me = useQuery(api.players.me, { playerId });
  const submitFind = useMutation(api.finds.submit);
  const undoFind = useMutation(api.finds.undo);
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [milestone, setMilestone] = useState<Milestone>(null);
  const [seenMilestones, setSeenMilestones] = useState<Set<Milestone>>(
    new Set(),
  );
  const [pending, setPending] = useState(false);

  const findsByQuestion = useMemo(() => {
    const map = new Map<number, { name: string; note?: string }>();
    me?.finds.forEach((f) =>
      map.set(f.questionId, { name: f.targetDisplayName, note: f.note }),
    );
    return map;
  }, [me]);

  useEffect(() => {
    if (me === null) onSignOut();
  }, [me, onSignOut]);

  if (me === undefined || me === null) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="eyebrow text-ink-mute/70 text-[11px]">opening the card…</p>
      </div>
    );
  }

  const found = me.foundCount;
  const total = me.totalQuestions;
  const halfway = Math.ceil(total / 2);

  function maybeFireMilestone(newCount: number) {
    if (newCount >= halfway && newCount < total && !seenMilestones.has("halfway")) {
      setMilestone("halfway");
      setSeenMilestones((s) => new Set(s).add("halfway"));
    }
    if (newCount === total && !seenMilestones.has("complete")) {
      setMilestone("complete");
      setSeenMilestones((s) => new Set(s).add("complete"));
    }
  }

  async function handleSubmit(name: string, note: string) {
    if (!sheet) return null;
    setPending(true);
    try {
      const res = await submitFind({
        playerId,
        questionId: sheet.questionId,
        targetName: name,
        note: note.trim() ? note : undefined,
      });
      setSheet(null);
      maybeFireMilestone(res.foundCount);
      return null;
    } catch (err: unknown) {
      return readableError(err);
    } finally {
      setPending(false);
    }
  }

  async function handleUndo() {
    if (!sheet) return;
    await undoFind({ playerId, questionId: sheet.questionId });
    setSheet(null);
  }

  return (
    <main className="relative flex-1 flex flex-col">
      <header className="sticky top-0 z-30 bg-blush/85 backdrop-blur supports-[backdrop-filter]:bg-blush/75 border-b border-ink/8">
        <div className="max-w-[560px] mx-auto px-5 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="eyebrow text-[10px] text-coral">eden</p>
            <p className="font-display text-[17px] leading-tight text-ink truncate">
              {me.displayName}
            </p>
          </div>
          <button
            onClick={() => setLeaderboardOpen(true)}
            className="eyebrow text-[10.5px] text-coral hover:text-coral-deep px-3 py-2 rounded-full border border-coral/35"
            aria-label="Open leaderboard"
          >
            field
          </button>
          <ProgressWreath found={found} total={total} size={56} />
        </div>
      </header>

      <section className="relative">
        <div className="max-w-[560px] mx-auto px-5 pt-6 pb-2">
          <p className="eyebrow text-[10.5px] text-coral">volume i · prompts</p>
          <h1
            className="font-display text-ink mt-1"
            style={{
              fontSize: "clamp(34px, 10vw, 48px)",
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
            }}
          >
            Find <span className="text-coral">someone</span> who…
          </h1>
          <p className="mt-3 text-[13.5px] text-ink-mute leading-relaxed max-w-[36ch]">
            Tap a square, ask the question out loud, and stamp it with the
            name of whoever fits. Each person only counts once.
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="max-w-[560px] mx-auto px-3.5 mt-5 grid grid-cols-2 gap-2.5">
          {QUESTIONS.map((q, i) => {
            const completedFind = findsByQuestion.get(q.id);
            return (
              <HuntCard
                key={q.id}
                id={q.id}
                emoji={q.emoji}
                text={q.text}
                short={q.short}
                completed={!!completedFind}
                targetName={completedFind?.name}
                targetNote={completedFind?.note}
                index={i}
                onTap={() =>
                  setSheet({
                    questionId: q.id,
                    emoji: q.emoji,
                    text: q.text,
                    short: q.short,
                    instruction: q.instruction,
                    noteLabel: q.noteLabel,
                    notePlaceholder: q.notePlaceholder,
                    alreadyCompleted: !!completedFind,
                    targetName: completedFind?.name,
                    targetNote: completedFind?.note,
                  })
                }
              />
            );
          })}
        </div>

        <div className="mt-10 max-w-[560px] mx-auto px-5">
          <div className="rule mb-3" />
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[10px] text-ink-mute/70">
              {found === total ? "card complete" : `${total - found} to go`}
            </p>
            <button
              onClick={onSignOut}
              className="eyebrow text-[10px] text-ink-mute/70 hover:text-ink"
            >
              sign out
            </button>
          </div>
        </div>
      </section>

      {found < total && (
        <div className="fixed bottom-0 inset-x-0 z-20 pointer-events-none">
          <div className="max-w-[560px] mx-auto px-5 pb-5">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-coral text-white pl-5 pr-2 py-2 shadow-[0_18px_38px_-18px_rgba(168,41,40,0.6)]">
              <span className="eyebrow text-[10px] text-white/80">
                progress
              </span>
              <span className="font-display text-[20px]">
                {found} / {total}
              </span>
              <button
                onClick={() => setLeaderboardOpen(true)}
                className="ml-auto h-10 px-4 rounded-full bg-white text-coral-deep text-[13px] font-semibold tracking-wide"
              >
                Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}

      <QuestionSheet
        state={sheet}
        pending={pending}
        onClose={() => setSheet(null)}
        onSubmit={handleSubmit}
        onUndo={handleUndo}
      />
      <Leaderboard
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        selfId={playerId}
      />
      <MilestoneSeal
        milestone={milestone}
        total={total}
        halfway={halfway}
        onDismiss={() => setMilestone(null)}
        duration={me.completionDurationMs}
        playerName={me.displayName.split(" ")[0]}
      />
    </main>
  );
}
