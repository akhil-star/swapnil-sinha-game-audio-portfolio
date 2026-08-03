const media = (category, file) => `/captured/${category}/${encodeURIComponent(file)}`

export const youtubeReels = [
  {
    title: 'FPS Microgame Sound Design | Unity + FMOD',
    videoId: 'ZbYTQvhNOa0',
    thumbnail: '/captured/youtube/fps-microgame.jpg',
  },
  {
    title: 'Game Sound Design DemoReel (2024)',
    videoId: 'A8HKA82_aiQ',
    thumbnail: '/captured/youtube/game-sound-demoreel-2024.jpg',
  },
  {
    title: 'Creature Re-Sound Design Demo Reel',
    videoId: 'G22mdl-vOJY',
    thumbnail: '/captured/youtube/creature-resound.jpg',
  },
  {
    title: 'Genshin Impact Re-Sound Design',
    videoId: 'xJOebMmU0F0',
    thumbnail: '/captured/youtube/genshin-resound.jpg',
  },
]

export const capturedWorkGroups = [
  {
    id: 'score-sound-design',
    label: 'Score & Sound Design',
    note: 'Film, game, promos and ads',
    type: 'video',
    works: [
      {
        title: 'BKR–DKR',
        detail: 'Supplied film / promo / ad reel.',
        src: media('score-sound-design', 'BKR-DKR_Mix_16Jan.mp4'),
      },
    ],
  },
  {
    id: 'music-production',
    label: 'Music Production',
    note: 'Original sketches, ideas and productions',
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
