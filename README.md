# Swapnil Sinha — Game Audio Portfolio

A Vite + React portfolio for Swapnil Sinha, a game audio and technical sound designer. It presents verified YouTube reels, shipped-game credits, implementation notes, and playable samples from the Obscura horror toolkit.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. Create a production build with `npm run build`.

## Media policy

Only compressed, published samples belong in `public/`. Lossless masters and long-form source media should remain outside the deployed site. Obscura samples use load-on-play behavior from `public/audio/obscura/`; YouTube hosts the reels.

| Location                    | Purpose                                                        |
| --------------------------- | -------------------------------------------------------------- |
| `src/data/site.js`          | Identity, contact information, links, tools, and approach copy |
| `src/data/projects.js`      | Shipped game credits and store links                           |
| `src/data/capturedWorks.js` | Verified YouTube reel IDs and supporting category counts       |
| `src/data/experience.js`    | Experience and education                                       |
| `public/audio/obscura/`     | Compressed playable Obscura samples                            |

## Commands

| Command               | Use                                                       |
| --------------------- | --------------------------------------------------------- |
| `npm run dev`         | Start the local development server                        |
| `npm run lint`        | Run ESLint                                                |
| `npm run build`       | Generate the production build in `dist/`                  |
| `npm run preview`     | Serve the production build locally                        |
| `npm run fetch:media` | Download store imagery into `public/media/` when required |
