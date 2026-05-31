# Eden · Find Someone Who

A "Find Someone Who…" scavenger hunt for the Eden community event.
Built with **Next.js 16**, **Convex** (real-time backend), **Tailwind 4**, and
**Framer Motion**. Designed mobile-first as a warm, editorial garden almanac.

## How the game works

- Players sign in with just their name.
- They tap any of 24 prompts and type the name of someone in the room who fits.
- Names are validated against the actual player pool — no autocomplete.
- Each person can only be used once across the whole card.
- First to fill all 24 squares wins. Leaderboard updates live.

## Local development

The project ships with a Convex local deployment already provisioned (see
`.env.local`). To run the app:

```bash
# 1. Backend (Convex, watches `convex/` and hot-reloads)
npx convex dev

# 2. In a second terminal — frontend
npm run dev
```

Open <http://localhost:3000> (or whatever port Next chose).

To clear data between test rounds, open the Convex dashboard (the URL is
printed by `convex dev`) and use the data browser. Or:

```bash
npx convex data players    # inspect
npx convex data finds      # inspect
```

## Deploying to production (Vercel + Convex Cloud)

The local Convex deployment is great for development, but for a real event you
want it on Convex Cloud so attendees on phones can hit it from anywhere.

### 1. Provision a Convex Cloud deployment

```bash
npx convex deploy
```

The first time, this prompts to pick a team/project and creates a *production*
deployment in the cloud. It prints the production URL (something like
`https://<name>.convex.cloud`).

### 2. Push the frontend to Vercel

```bash
# from the project root
vercel              # link to a new or existing Vercel project
vercel env add NEXT_PUBLIC_CONVEX_URL production
# paste the production URL from step 1, then:
vercel --prod
```

Or via the Vercel dashboard: import this repo, then set
`NEXT_PUBLIC_CONVEX_URL` in **Project Settings → Environment Variables** to
the production Convex URL, and redeploy.

### Subsequent deploys

```bash
npx convex deploy   # if you changed anything in convex/
vercel --prod       # if you changed the frontend
```

You can chain them automatically by editing `package.json`:

```json
"scripts": {
  "build": "convex deploy --cmd 'next build'"
}
```

Vercel's build step will then deploy both at once.

## Project layout

```
convex/                  Backend (schema, queries, mutations)
  schema.ts              Tables: players, finds
  players.ts             registerOrLogin, me
  finds.ts               submit, undo (validates exact name match, no reuse)
  leaderboard.ts         Top players query
  questions.ts           The 24 prompts (server copy)
src/
  app/
    layout.tsx           Loads Fraunces + Instrument Sans, ConvexProvider
    page.tsx             Sign-in vs hunt board switch
    globals.css          Eden palette, paper grain, stamp/wreath animations
  components/
    SignIn.tsx           Name entry, vine illustrations
    HuntBoard.tsx        Main grid + header + sticky CTA
    HuntCard.tsx         Seed-packet prompt card + stamp
    QuestionSheet.tsx    Bottom-sheet modal for entering a name
    Leaderboard.tsx      Right-side drawer with live rankings
    MilestoneSeal.tsx    Halfway (12/24) + complete (24/24) celebration
    ProgressWreath.tsx   Circular progress with a leaf at the arc tip
    Stamp.tsx            Rough-edged "FOUND" stamp
    Vine.tsx             Hand-drawn vine SVG
  lib/
    usePlayerId.ts       localStorage-backed player id
    convexError.ts       Clean error messages from ConvexError
    questions.ts         The 24 prompts (client copy with short labels)
```

## Design notes

- **Typography**: Fraunces (display, optical sizing + SOFT/WONK axes) paired
  with Instrument Sans (body). Avoids the usual Inter/Roboto.
- **Palette**: warm parchment background, deep forest green ink, terracotta
  stamp red, gold accents.
- **Texture**: SVG noise overlay for paper grain, dashed perforations on cards.
- **Motion**: stamp drops on success (CSS keyframes), leaderboard slides from
  right, milestone seals zoom in with falling leaves.
- **Mobile-first**: 2-column card grid, large tap targets, sticky bottom CTA,
  no horizontal scroll.
- **Accessibility**: focus rings on inputs, `prefers-reduced-motion` collapses
  animation durations.

## Customizing the prompts

Edit the `QUESTIONS` array in **two** places (keep them in sync):

- `src/lib/questions.ts` — client copy, includes a `short` field used as the
  card headline.
- `convex/questions.ts` — server copy used for validation.

The `id` numbers must match between the two files.
