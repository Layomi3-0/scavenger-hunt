import { internalMutation } from "./_generated/server";

// Internal-only — not exposed to the client. Call with:
//   npx convex run --prod admin:clearAll
// Wipes every player and find.
export const clearAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    const finds = await ctx.db.query("finds").collect();
    for (const f of finds) await ctx.db.delete(f._id);
    const players = await ctx.db.query("players").collect();
    for (const p of players) await ctx.db.delete(p._id);
    return { players: players.length, finds: finds.length };
  },
});
