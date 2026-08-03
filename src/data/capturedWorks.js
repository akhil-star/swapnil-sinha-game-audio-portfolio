// Captured source files are stored in Git LFS. GitHub's media endpoint serves
// the actual bytes (including range requests) even when a static host serves
// the small LFS pointer file instead.
const mediaRepository = 'akhil-star/swapnil-sinha-game-audio-portfolio'
const media = (category, file) =>
  `https://media.githubusercontent.com/media/${mediaRepository}/main/public/captured/${category}/${encodeURIComponent(file)}`

export const youtubeReels = [
  {
    title: 'FPS Microgame Sound Design | Unity + FMOD',
    videoId: 'ZbYTQvhNOa0',
    thumbnail: 'https://i.ytimg.com/vi/ZbYTQvhNOa0/maxresdefault.jpg',
  },
  {
    title: 'Game Sound Design DemoReel (2024)',
    videoId: 'A8HKA82_aiQ',
    thumbnail: 'https://i.ytimg.com/vi/A8HKA82_aiQ/maxresdefault.jpg',
  },
  {
    title: 'Creature Re-Sound Design Demo Reel',
    videoId: 'G22mdl-vOJY',
    thumbnail: 'https://i.ytimg.com/vi/G22mdl-vOJY/maxresdefault.jpg',
  },
  {
    title: 'Genshin Impact Re-Sound Design',
    videoId: 'xJOebMmU0F0',
    thumbnail: 'https://i.ytimg.com/vi/xJOebMmU0F0/maxresdefault.jpg',
  },
]

export const capturedWorkGroups = [
  {
    id: 'score-sound-design',
    label: 'Score & Sound Design',
    note: 'Film, game, promos and ads',
    type: 'audio',
    works: [
      {
        title: 'BKR–DKR — Sound Design & Mix',
        detail: 'Extracted audio from the supplied BKR–DKR film / promo / ad reel.',
        cover: '/artwork/bkr-dkr-dragon-cover.png',
        coverAlt: 'Conceptual moonlit dragon scene for BKR–DKR',
        src: '/audio/bkr-dkr-extracted-audio.mp3',
      },
    ],
  },
  {
    id: 'music-production',
    label: 'Music Production',
    note: 'Original sketches, ideas and productions',
    artwork: '/artwork/music-production-studio.png',
    type: 'audio',
    works: [
      'E ionian Aug Sickkkk.mp3', '+-=.mp3', 'DayDreamer - New Chapter.mp3',
      'Swapnil Sinha, 2022, A walk..mp3', 'Drown.mp3', 'Tera jahan.mp3',
      'Flip the sample - Swapnil Sinha.wav', 'DayDreamer - 555.wav',
    ].map((title) => ({ title: title.replace(/\.(mp3|wav)$/i, ''), src: media('music-production', title) })),
  },
  {
    id: 'mixing-mastering',
    label: 'Mixing & Mastering',
    note: 'Selected delivered mixes and masters',
    artwork: '/artwork/mixing-mastering-console.png',
    type: 'audio',
    works: [
      'Jammu Da Shahar - Virender Kapadia (Master)_.mp3', 'Swapnil Sinha, 2022, A walk..mp3',
      'Prabh Anmol - Thank God .wav', 'Cigarettes after Sex - Sunsetz (Cover).wav',
      'Crossbeat - Look Deep Into It.wav', 'Jaan Waliya (Master) (Cover) .wav', 'Crossbeat - Moment .wav',
    ].map((title) => ({ title: title.replace(/\.(mp3|wav)$/i, ''), src: media('mixing-mastering', title) })),
  },
  {
    id: 'recording-restoration',
    label: 'Recording, Editing & Restoration',
    note: 'Dialogue, podcast and restoration examples',
    type: 'audio',
    works: [
      'News Package Interview.mp3', 'Podcast .wav', 'Copy of Cigarettes after Sex - Sunsetz (Cover).wav',
    ].map((title) => ({ title: title.replace(/\.(mp3|wav)$/i, ''), src: media('recording-restoration', title) })),
  },
]
