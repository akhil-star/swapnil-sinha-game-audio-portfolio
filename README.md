# Swapnil Sinha — Game Audio Portfolio

A Vite + React portfolio for Swapnil Sinha, a game audio and technical sound designer. It presents verified YouTube reels, shipped-game credits, and playable work across score and sound design, music production, mixing and mastering, and recording/restoration.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`.

Create a production build with:

```bash
npm run build
```

## Media and Git LFS

The captured-work library lives in `public/captured/`. These are the supplied source files that the portfolio plays directly, including WAV, MP3, MP4, and YouTube thumbnail images.

Media is tracked with Git LFS. Install Git LFS before cloning or contributing:

```bash
git lfs install
git clone <repository-url>
cd swapnil-game-audio-portfolio
git lfs pull
npm ci
```

Do not move or rename a captured asset without updating `src/data/capturedWorks.js`.

## Content locations

| Location | Purpose |
| --- | --- |
| `src/data/site.js` | Identity, contact information, links, tools, and approach copy |
| `src/data/projects.js` | Shipped game credits and store links |
| `src/data/capturedWorks.js` | Playable portfolio entries and verified YouTube reel IDs |
| `src/data/experience.js` | Experience and education |
| `public/captured/` | Local audio, video, and thumbnail assets |

## Source-backed work

The Captured Work section contains the supplied portfolio material in four categories:

- Score & Sound Design
- Music Production
- Mixing & Mastering
- Recording, Editing & Restoration

The YouTube reel shelf links to Swapnil’s public channel at [@SwapnilSinha-SoundDesigner](https://www.youtube.com/@SwapnilSinha-SoundDesigner).

## Project scripts

| Command | Use |
| --- | --- |
| `npm run dev` | Start the local Vite server |
| `npm run build` | Generate the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run fetch:media` | Download store imagery into `public/media/` when required |
