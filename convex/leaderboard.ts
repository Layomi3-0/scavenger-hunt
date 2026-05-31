import { query } from "./_generated/server";
import { TOTAL_QUESTIONS } from "./questions";

const MAX_ROWS = 50;

export const top = query({
  args: {},
  handler: async (ctx) => {
    const players = await ctx.db.query("players").collect();

    const ranked = players
      .map((p) => ({
        playerId: p._id,
        displayName: p.displayName,
        foundCount: p.foundCount ?? 0,
        completedAt: p.completedAt,
        completionDurationMs: p.completionDurationMs,
      }))
      .sort((a, b) => {
        if (a.completedAt && b.completedAt) {
          return (a.completionDurationMs ?? 0) - (b.completionDurationMs ?? 0);
        }
        if (a.completedAt) return -1;
        if (b.completedAt) return 1;
        if (b.foundCount !== a.foundCount) return b.foundCount - a.foundCount;
        return a.displayName.localeCompare(b.displayName);
      })
      .slice(0, MAX_ROWS);

    return {
      total: TOTAL_QUESTIONS,
      players: ranked,
    };
  },
});
