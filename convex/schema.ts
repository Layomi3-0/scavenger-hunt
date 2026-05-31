import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  players: defineTable({
    displayName: v.string(),
    normalizedName: v.string(),
    dobPin: v.string(), // MMDDYY — used as a per-account PIN at sign-in
    foundCount: v.optional(v.number()), // denormalized for fast leaderboard
    completedAt: v.optional(v.number()),
    completionDurationMs: v.optional(v.number()),
  })
    .index("by_normalized", ["normalizedName"])
    .index("by_completion", ["completedAt"]),

  finds: defineTable({
    playerId: v.id("players"),
    questionId: v.number(),
    targetPlayerId: v.id("players"),
    targetDisplayName: v.string(),
    note: v.optional(v.string()), // optional extra info for prompts that ask for it
  })
    .index("by_player", ["playerId"])
    .index("by_player_target", ["playerId", "targetPlayerId"])
    .index("by_player_question", ["playerId", "questionId"]),
});
