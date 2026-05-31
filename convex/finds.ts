import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { normalizeName, QUESTIONS, TOTAL_QUESTIONS } from "./questions";

export const submit = mutation({
  args: {
    playerId: v.id("players"),
    questionId: v.number(),
    targetName: v.string(),
  },
  handler: async (ctx, { playerId, questionId, targetName }) => {
    const player = await ctx.db.get(playerId);
    if (!player) {
      throw new ConvexError("We can't find your player record. Try refreshing.");
    }

    if (!QUESTIONS.some((q) => q.id === questionId)) {
      throw new ConvexError("Unknown question.");
    }

    const trimmed = targetName.trim();
    if (trimmed.length < 2) {
      throw new ConvexError("Type the person's name to log this find.");
    }
    const normalized = normalizeName(trimmed);

    if (normalized === player.normalizedName) {
      throw new ConvexError("You can't pick yourself — go find someone else!");
    }

    const target = await ctx.db
      .query("players")
      .withIndex("by_normalized", (q) => q.eq("normalizedName", normalized))
      .unique();

    if (!target) {
      throw new ConvexError(
        `We couldn't find "${trimmed}" in the hunt. Double-check the spelling, or ask them to sign in first.`,
      );
    }

    const existingForQuestion = await ctx.db
      .query("finds")
      .withIndex("by_player_question", (q) =>
        q.eq("playerId", playerId).eq("questionId", questionId),
      )
      .unique();
    if (existingForQuestion) {
      throw new ConvexError("You've already filled this square.");
    }

    const reused = await ctx.db
      .query("finds")
      .withIndex("by_player_target", (q) =>
        q.eq("playerId", playerId).eq("targetPlayerId", target._id),
      )
      .first();
    if (reused) {
      throw new ConvexError(
        `${target.displayName} already counts for another square — each person can only be used once.`,
      );
    }

    await ctx.db.insert("finds", {
      playerId,
      questionId,
      targetPlayerId: target._id,
      targetDisplayName: target.displayName,
    });

    const newCount = (player.foundCount ?? 0) + 1;
    const completion: {
      foundCount: number;
      completedAt?: number;
      completionDurationMs?: number;
    } = { foundCount: newCount };

    if (newCount >= TOTAL_QUESTIONS && !player.completedAt) {
      const completedAt = Date.now();
      completion.completedAt = completedAt;
      completion.completionDurationMs = completedAt - player._creationTime;
    }

    await ctx.db.patch(playerId, completion);

    return { foundCount: newCount };
  },
});

export const undo = mutation({
  args: {
    playerId: v.id("players"),
    questionId: v.number(),
  },
  handler: async (ctx, { playerId, questionId }) => {
    const player = await ctx.db.get(playerId);
    if (!player) return;
    const existing = await ctx.db
      .query("finds")
      .withIndex("by_player_question", (q) =>
        q.eq("playerId", playerId).eq("questionId", questionId),
      )
      .unique();
    if (!existing) return;
    await ctx.db.delete(existing._id);
    const newCount = Math.max(0, (player.foundCount ?? 0) - 1);
    await ctx.db.patch(playerId, {
      foundCount: newCount,
      completedAt: undefined,
      completionDurationMs: undefined,
    });
  },
});
