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

export const toolchain = {
  'daily drivers': ['FMOD Studio', 'Unity', 'Reaper', 'Ableton Live'],
  'also working with': ['Wwise'],
  'currently learning': ['Unreal Engine'],
  'record + repair': ['Zoom H1e', 'iZotope RX', 'FabFilter Pro-Q4'],
}

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
import { assetPath } from '../utils/assets'
