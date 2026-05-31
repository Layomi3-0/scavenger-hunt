import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { normalizeName, TOTAL_QUESTIONS } from "./questions";

function validateDobPin(raw: string): string {
  const cleaned = raw.replace(/\D/g, "");
  if (cleaned.length !== 6) {
    throw new ConvexError("Enter your birthday as 6 digits — MM DD YY.");
  }
  const mm = parseInt(cleaned.slice(0, 2), 10);
  const dd = parseInt(cleaned.slice(2, 4), 10);
  if (mm < 1 || mm > 12) {
    throw new ConvexError("That doesn't look like a real month. Use MM DD YY.");
  }
  if (dd < 1 || dd > 31) {
    throw new ConvexError("That doesn't look like a real day. Use MM DD YY.");
  }
  return cleaned;
}

export const registerOrLogin = mutation({
  args: { displayName: v.string(), dobPin: v.string() },
  handler: async (ctx, { displayName, dobPin }) => {
    const trimmed = displayName.trim();
    if (trimmed.length < 2) {
      throw new ConvexError("Please enter at least 2 characters for your name.");
    }
    if (trimmed.length > 40) {
      throw new ConvexError("Names are limited to 40 characters.");
    }
    const pin = validateDobPin(dobPin);

    const normalized = normalizeName(trimmed);
    const existing = await ctx.db
      .query("players")
      .withIndex("by_normalized", (q) => q.eq("normalizedName", normalized))
      .unique();
    if (existing) {
      if (existing.dobPin !== pin) {
        throw new ConvexError(
          "That name's already in the hunt — and the birthday doesn't match. Try using your fuller name (e.g. first + last).",
        );
      }
      return existing._id;
    }
    return await ctx.db.insert("players", {
      displayName: trimmed,
      normalizedName: normalized,
      dobPin: pin,
    });
  },
});

export const me = query({
  args: { playerId: v.optional(v.id("players")) },
  handler: async (ctx, { playerId }) => {
    if (!playerId) return null;
    const player = await ctx.db.get(playerId);
    if (!player) return null;
    const finds = await ctx.db
      .query("finds")
      .withIndex("by_player", (q) => q.eq("playerId", playerId))
      .collect();
    return {
      _id: player._id,
      displayName: player.displayName,
      completedAt: player.completedAt,
      completionDurationMs: player.completionDurationMs,
      foundCount: finds.length,
      totalQuestions: TOTAL_QUESTIONS,
      finds: finds.map((f) => ({
        questionId: f.questionId,
        targetDisplayName: f.targetDisplayName,
        note: f.note,
        createdAt: f._creationTime,
      })),
    };
  },
});
