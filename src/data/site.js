import { assetPath } from '../utils/assets.js'

/**
 * Identity, contact and top-level links.
 * Shared identity and external links. Change once, update everywhere.
 */
export const identity = {
  name: 'Swapnil Sinha',
  role: 'Game Audio Designer',
  roles: ['Game Audio Designer', 'Technical Sound Designer'],
  location: 'Dehradun, Uttarakhand, India',
  timezone: 'IST (UTC+5:30)',
  availability: 'Open to full-time and contract game audio roles — remote or relocation',
  email: 'swapnil.wav555@gmail.com',
  phone: '+91 7011250225',
  resumePdf: assetPath('resume/SwapnilSinha_GameAudio_Resume_2026.pdf'),
}

export const links = {
  linkedin: 'https://www.linkedin.com/in/swapnil-sinha-a283472a5',
  youtube: 'https://www.youtube.com/@SwapnilSinha-SoundDesigner',
  github: 'https://github.com/ComicColt973',
  obscura: 'https://jabsz-studios.itch.io/obscura-horror-toolkit',
  pocketFm: 'https://drive.google.com/file/d/11BjMxV3lKBdRzrhk2HjdgoNko7hJSe7l/view?usp=drive_link',
  bkrDkr: 'https://drive.google.com/file/d/17lF8SYE6qMIesoJBZS_YIAX-rVFNlLU8/view?usp=drive_link',
  sourcePortfolio: 'https://drive.google.com/drive/folders/14sELWWfI1Veox6l0x-bbpn38jmxUw_li',
}

const tool = (name, logo, href, detail) => ({
  name,
  logo: assetPath(`tool-logos/${logo}`),
  href,
  detail,
})

const tools = {
  h1e: tool(
    'H1e',
    'zoom.png',
    'https://zoomcorp.com/en/us/handheld-recorders/handheld-recorders/h1essential/',
    'ZOOM RECORDER',
  ),
  waves: tool('Waves', 'waves.png', 'https://www.waves.com/'),
  fabfilter: tool('FabFilter', 'fabfilter.svg', 'https://www.fabfilter.com/'),
  izotope: tool('iZotope RX', 'izotope.svg', 'https://www.izotope.com/products/rx'),
  reaper: tool('Reaper', 'reaper.jpg', 'https://www.reaper.fm/'),
  ableton: tool('Ableton', 'abletonlive.svg', 'https://www.ableton.com/en/live/'),
  protools: tool('Pro Tools', 'protools.svg', 'https://www.avid.com/pro-tools', 'AVID'),
  soundtoys: tool('SoundToys', 'soundtoys.png', 'https://www.soundtoys.com/'),
  voxengo: tool('Voxengo', 'voxengo.svg', 'https://www.voxengo.com/'),
  fmod: tool('FMOD', 'fmod.svg', 'https://www.fmod.com/studio'),
  wwise: tool('Wwise', 'wwise.svg', 'https://www.audiokinetic.com/en/wwise/overview/'),
  csharp: tool('C#', 'csharp.svg', 'https://learn.microsoft.com/en-us/dotnet/csharp/'),
  blueprints: tool(
    'Blueprints',
    'blueprints.svg',
    'https://dev.epicgames.com/documentation/en-us/unreal-engine/blueprints-visual-scripting-in-unreal-engine',
    'UNREAL ENGINE',
  ),
  unity: tool('Unity', 'unity.svg', 'https://unity.com/'),
  unreal: tool('Unreal', 'unrealengine.svg', 'https://www.unrealengine.com/'),
}

export const toolchain = [
  {
    group: 'Record & Repair',
    items: [tools.h1e, tools.waves, tools.fabfilter, tools.izotope],
  },
  {
    group: 'Design',
    items: [
      tools.reaper,
      tools.ableton,
      tools.protools,
      tools.soundtoys,
      tools.waves,
      tools.fabfilter,
      tools.voxengo,
    ],
  },
  {
    group: 'Implementation',
    items: [tools.fmod, tools.wwise, tools.csharp, tools.blueprints],
  },
  {
    group: 'Game Engine',
    items: [tools.unity, tools.unreal],
  },
]

export const philosophy = {
  lines: [
    'I’m a story-drifter with an H1e, way too many plugins and a growing hoard of field recordings I swear I’ll use one day.',
  ],
  body: `I work across game audio, music, dialogue and implementation — usually somewhere between Reaper, FMOD and Unity. And yes, I’ve absolutely wandered around at 2 a.m. recording something just because it sounded interesting.`,
  principles: [
    'Audio should guide the player without shouting.',
    'Silence is a tool, not empty space.',
    'Gameplay comes before realism.',
    'The best sound often goes unnoticed — until it is missing.',
    'Every sound needs a reason to be there.',
  ],
}
