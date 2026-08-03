export const experience = [
  {
    company: 'BattleBucks — Singularity Games',
    role: 'Sound Designer',
    period: 'Feb 2026 — Present',
    current: true,
    points: [
      'Building the sound and musical identity across a launcher full of very different games, while keeping rewards and UI feeling like they belong to one place.',
      'Working beside developers in Unity so feedback responds to play instead of simply firing on cue.',
    ],
  },
  {
    company: 'Jabsz Studios',
    role: 'Sound Designer',
    period: 'Apr 2025 — Jul 2026',
    points: [
      'Owned the sound of Rahasya from the air in the rooms to the cues that let a player sense danger without a HUD.',
      'Built and tuned interactive FMOD systems in Unity, then profiled the work against the game rather than trusting the timeline.',
      'Helped two more mobile games find clear, responsive feedback for the small moments players repeat most.',
      'Put naming, asset handoff and Git habits in place so audio could move with the rest of the team instead of becoming a last-minute mystery.',
    ],
  },
  {
    company: 'PocketFM',
    role: 'Consultant Sound Engineer',
    period: 'Apr 2025 — Mar 2026',
    points: [
      'Delivered sound for 30+ promotional pieces where the first second had to earn attention.',
      'Worked with voice artists on the tiny choices — pace, breath, emphasis — that make a line feel lived in.',
      'Took BGM, SFX and VO from raw sessions to mixes that held together on the platforms people actually use.',
      'Kept a close ear on the full handoff, from brief through final delivery.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Audio Engineer — Mixing & Mastering',
    period: 'Aug 2023 — Apr 2025',
    points: ['Learned to make decisions that survive outside the studio — on phones, in cars and on whatever speaker a listener already owns.'],
  },
]

export const education = [
  { school: 'Ajeenkya DY Patil, Pune (SEAMEDU)', qualification: 'BSc Sound Engineering', period: '2022 — 2025' },
  { school: 'ILM Academy, Gurgaon', qualification: 'Certificate in Music Production', period: '2018 — 2019' },
]

/**
 * Audio Breakdown — the stem mixer.
 *
 * Each layer is synthesised in the browser by default, so this works with zero
 * asset files. To use your real stems instead: export each layer as a matched
 * loop, drop it in /public/audio/breakdown/, and set `file` below. The mixer
 * will prefer the file and fall back to synthesis if it fails to load.
 */
export const breakdownLayers = [
  {
    id: 'music',
    name: 'Music',
    detail: 'Low drone bed + fifth. Ducks under the creature bus.',
    color: 'violet',
    file: null, // e.g. '/audio/breakdown/rahasya-music.wav'
  },
  {
    id: 'ambience',
    name: 'Environment',
    detail: 'Wind through the courtyard, modulated bandpass on filtered noise.',
    color: 'cyan',
    file: null,
  },
  {
    id: 'creature',
    name: 'Creature',
    detail: 'Three-layer vocal bed. Gain and cutoff ride the proximity parameter.',
    color: 'amber',
    file: null,
  },
  {
    id: 'foley',
    name: 'Footsteps',
    detail: 'Surface-switched steps. Publishes a noise value the entity AI reads.',
    color: 'cyan',
    file: null,
  },
  {
    id: 'ui',
    name: 'UI',
    detail: 'Short blips, bypasses the reverb send entirely.',
    color: 'violet',
    file: null,
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    detail: 'Rate and depth driven by player health. Unducked while hiding.',
    color: 'amber',
    file: null,
  },
]
