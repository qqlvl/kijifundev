# Kiji.fun – One-screen Roulette (Next.js + Tailwind)

Minimal starter for Kiji.fun with a circular PvP roulette component.

## Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3

## Dev
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy
- Push to GitHub
- Import to Vercel
- Or run: `npx vercel`

## Notes
- `components/Roulette.tsx` draws an SVG wheel with segments weighted by stake.
- `onResult` callback is ready for integrations (VRF, backend logging, etc.).