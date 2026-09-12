# veronika-gabrielova

Personal site of Veronika Gabrielová  -  two faces, one page:

- **Studio** (default): websites, portfolios, CMS rescue, Lovable → production. For people & brands.
- **`< DEV />`** (toggle top-right, or `?dev=1`): SaaS track record, hard skills, culture & slackmoji. For companies & tech teams.

Czech + English. Deployed to Netlify on every push to `main`.

## Stack

Vite · React 19 · TypeScript · Tailwind 3 · lucide-react. No backend.

## Develop

```sh
npm install
npm run dev
npm run build   # tsc -b && vite build
npm run lint    # oxlint
```

## Where to edit things

| What | Where |
| --- | --- |
| All visible copy (cs/en) | `src/data/translations.ts` |
| Hourly rate, IČO/DIČ, email, links | `src/data/site.ts` |
| Portfolio items + screenshots | `src/data/site.ts` → `work`, images in `public/work/` |
| Experience timeline, skills, slackmoji | `src/data/site.ts` |
| Theme colours per mode | `src/index.css` (`:root` / `:root[data-mode="dev"]`) |
| Pixel Veronika sprite (pixel grid, colours) | `src/data/sprite.ts` |
| Hero sprite + rainbow (click → game) | `src/components/PixelDev.tsx` |
| Easter-egg game (tags to dodge, physics) | `src/components/dev/DevGame.tsx` |
| Game chiptune + sound effects | `src/lib/gameAudio.ts` |
