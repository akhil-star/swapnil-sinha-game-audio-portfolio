/**
 * Shipped work.
 *
 * `media` URLs were pulled from the live Steam and Google Play listings for
 * each title. They point at the stores' CDNs, which is fine for a portfolio,
 * but store CDN paths do rotate when a developer re-uploads assets.
 *
 * Run `npm run fetch:media` once to download every remote image into
 * /public/media, then flip USE_LOCAL_MEDIA to true. After that the site is
 * fully self-hosted and nothing can 404 on you during an interview.
 */
export const USE_LOCAL_MEDIA = true

export const resolveMedia = (remoteUrl, localName) =>
  USE_LOCAL_MEDIA ? `/media/${localName}` : remoteUrl

export const projects = [
  {
    id: 'rahasya',
    title: 'Rahasya',
    subtitle: 'First-person psychological horror · 1992 India',
    studio: 'SuperHorizon Studios · published by Jabsz Studios',
    platform: 'PC / Steam',
    status: 'Released',
    featured: true,
    role: ['Audio Director', 'Sound Designer', 'Composer', 'FMOD Implementation'],
    stack: ['FMOD Studio', 'Unity', 'Reaper', 'Kontakt', 'Zoom H1e'],
    accent: 'cyan',
    href: 'https://store.steampowered.com/app/4280830/Rahasya/',
    hrefLabel: 'View on Steam',
    summary:
      'Full audio direction on a horror title with no combat. The player cannot fight the entity hunting them, so audio carries the entire threat model — where it is, whether it heard you, and how close it is to finding you.',
    media: {
      hero: {
        remote:
          'https://shared.akamai.steamstatic.com/community_assets/images/apps/4280830/c871edb021c90c4310cde838d6195fbb14fbdf0f.jpg',
        local: 'rahasya-hero.jpg',
      },
      header: {
        remote:
          'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4280830/be9b6895ee3940ae4db13955ad162f75a41dc136/header.jpg',
        local: 'rahasya-header.jpg',
      },
      shots: [
        {
          remote:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4280830/3b16551182c4b741922748b66720b3956bf3ecd8/ss_3b16551182c4b741922748b66720b3956bf3ecd8.1920x1080.jpg',
          local: 'rahasya-shot-01.jpg',
          caption: 'The haveli interior — reverb zone boundaries follow the courtyard walls',
        },
      ],
    },
  },

  {
    id: 'codebreakers',
    title: 'The CodeBreakers',
    subtitle: 'Top-down stealth · time manipulation',
    studio: 'Jabsz Studios',
    platform: 'Android',
    status: 'Released',
    featured: false,
    role: ['Sound Designer', 'Technical Sound Designer', 'Composer'],
    stack: ['FMOD Studio', 'Unity', 'C#', 'Serum', 'Kontakt'],
    accent: 'violet',
    href: 'https://play.google.com/store/apps/details?id=com.JabszGamingStudios.TheCodeBreaker',
    hrefLabel: 'View on Google Play',
    summary:
      'Stealth game where noise is a mechanic — surfaces have different noise sensitivity and guards react to it. Music intensifies with alert level, and time-freeze and rewind abilities each needed their own temporal audio treatment.',
    media: {
      icon: {
        remote:
          'https://play-lh.googleusercontent.com/JgwMaYcrpl6Nf_TusmYMMlBAKrEOJW3VL8P3dK0w7F_o8zg5phhQSbw69xEFrL5k7NDe_zASgLTvqWpWTP5bWio=w240',
        local: 'codebreakers-icon.png',
      },
      shots: [
        {
          remote:
            'https://play-lh.googleusercontent.com/pS8BbrUHBZ4bQU557CH3Tgzhc5dHUxuaMi1hZ8lBUT6kl--M7f6VB_N7HzhZuwTfY6-nN6zPCwckJ6If7kqv4Q=w1052-h592',
          local: 'codebreakers-shot-01.jpg',
          caption: 'Alert-level driven music layers',
        },
        {
          remote:
            'https://play-lh.googleusercontent.com/4Fqj3tFAO1unTNHrcsXqvI3bnhQH594nU1wYx9jzq-3hbHTFwI5xa79MqOrCI7feNnQlVQX1UIwIgg1X1xhK=w1052-h592',
          local: 'codebreakers-shot-02.jpg',
          caption: 'Guard vision and noise sensitivity',
        },
        {
          remote:
            'https://play-lh.googleusercontent.com/lDHV85qsj-JnGaboZj4cfwmoG2v-LWaXptAQRpd3Qx1Pyc-rHd4syrjrZUhJks8HNJb5pv_W_Q-AOsZglXxJ=w1052-h592',
          local: 'codebreakers-shot-03.jpg',
          caption: 'Time-freeze temporal effect',
        },
      ],
    },
    highlights: [
      'FMOD event logic deployed via C# alongside the lead developer',
      'Alert level drives a vertical music re-orchestration rather than a track swap',
      'Time-freeze pitches and filters the entire bus; rewind reverses a pre-rendered tail',
      'Per-surface footstep switch tied to the same noise value the guard AI reads',
    ],
  },

  {
    id: 'battlebucks',
    title: 'BattleBucks',
    subtitle: 'Skill-based game launcher · 7+ titles',
    studio: 'Singularity Games',
    platform: 'Android / iOS',
    status: 'Ongoing',
    featured: false,
    role: ['Sound Designer', 'Composer'],
    stack: ['Unity', 'Reaper', 'Ableton Live', 'Serum'],
    accent: 'cyan',
    href: 'https://play.google.com/store/apps/details?id=com.singularity.battlebucks',
    hrefLabel: 'View on Google Play',
    summary:
      'One sonic language across a launcher hosting multiple hypercasual titles. Each game needs its own character while sharing UI, reward and tournament sounds so the platform feels like a single product.',
    media: {
      icon: {
        remote:
          'https://play-lh.googleusercontent.com/RI8h6yQcBQq0sFH9OfBi1RFg9wIlaaRi0wc07_fWxDhCmxB_WpMXBfYjYorct9HHYQhv7QYDEPkpc_l4x_DVcQ=w240',
        local: 'battlebucks-icon.png',
      },
      shots: [
        {
          remote:
            'https://play-lh.googleusercontent.com/404rMlGQ-uoFbSsjeVnlTJY85aGxBrt8kxPDhxUDztgOkoWnFUGEDcXZXUe2s7L1a3d9jPftORnZbZ5FcAW6-g=w1052-h592',
          local: 'battlebucks-shot-01.jpg',
          caption: 'Shared UI and reward sound set',
        },
        {
          remote:
            'https://play-lh.googleusercontent.com/zlUXke3RlOiNCnbbGxGtDcZAv3DRnfrkjyOAwkwzz_KRDtTeqjGGHhMGEWyeMQa6qqjb38JQp4joTox1map1N1E=w1052-h592',
          local: 'battlebucks-shot-02.jpg',
          caption: 'Per-title music beds',
        },
        {
          remote:
            'https://play-lh.googleusercontent.com/2Qp1MX97BcXMmBO4VD0JWCSlBxIh-C_fz4mwVHw0305ywOV5MCI6u3Obmnx2wIVtsScK_0L9uk9PMwf-kV0=w1052-h592',
          local: 'battlebucks-shot-03.jpg',
          caption: 'Tournament and leaderboard feedback',
        },
      ],
    },
    highlights: [
      'Shared UI and reward palette so every title reads as one platform',
      'Per-title music identity built from a common harmonic set',
      'Asset budget tuned for mobile download size across the launcher',
      'Implementation tuned directly with developers in Unity',
    ],
  },

  {
    id: 'molotov-flip',
    title: 'Molotov Flip',
    subtitle: 'Low-poly arcade · physics flip mechanic',
    studio: 'Jabsz Studios',
    platform: 'Android',
    status: 'Released',
    featured: false,
    role: ['Sound Designer', 'Composer'],
    stack: ['Reaper', 'Ableton Live', 'iZotope RX', 'FabFilter Pro-Q4'],
    accent: 'violet',
    href: 'https://play.google.com/store/apps/details?id=com.JabszGamingStudios.MolotovFlip',
    hrefLabel: 'View on Google Play',
    summary:
      'Designed and composed from verbal references only — no temp track, no reference board. The whole feel of a one-tap flip mechanic rides on the landing sound, so most of the work went into the moment of contact.',
    media: {
      icon: {
        remote:
          'https://play-lh.googleusercontent.com/016jSvNpw0l9dJjIKzEzR-Ewyo1W2zb9mbMIm4ka5qIQ0cVUtfpc8Y7NMW3mqiTbABM5V4A6w3VQdnaK7Br4mxo=w240',
        local: 'molotov-icon.png',
      },
      shots: [
        {
          remote:
            'https://play-lh.googleusercontent.com/zGvUw60xqFMkYuIoM-yd35sXl2ticvBv1pf2kJjznqRhzSC8MjFjQhHNCz2oO0RBZ2AGPmU93kgBqXEtdtwFfw=w1052-h592',
          local: 'molotov-shot-01.jpg',
          caption: 'Desert base — flip and landing feedback',
        },
        {
          remote:
            'https://play-lh.googleusercontent.com/pEvTfmSVVFyCX7ynz2yaKd4fAGKiwx-yjCmfTOBaSnxzYOjEg2wfjj3St6CwSwkaYmoW_0V6WBcuV1dq_uAi=w1052-h592',
          local: 'molotov-shot-02.jpg',
          caption: 'Explosion layers and debris tails',
        },
        {
          remote:
            'https://play-lh.googleusercontent.com/LTHYiWOTfMBtkbRtMFm6c9NOqsBduQb8C26DvcnYwZF2C6TwfpFOqNqwnIUP9jLsyk4ReyGVG0ZVngdbjaFaQCM=w1052-h592',
          local: 'molotov-shot-03.jpg',
          caption: 'Snow outpost — surface-specific impacts',
        },
      ],
    },
    highlights: [
      'Landing sound pitched by rotation count so a double-flip reads as a bigger success',
      'Per-environment impact sets for desert and snow maps',
      'Explosion built in three layers — transient, body, debris tail — for mobile speaker translation',
      'Full brief delivered verbally; sound direction interpreted without reference audio',
    ],
  },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
export const otherProjects = projects.filter((p) => !p.featured)
