import { useRef } from 'react'
import { Section, ModuleHeader } from './ui'
import { supportingCategories } from '../data/capturedWorks'
import { links } from '../data/site'
import AudioArchive from './AudioArchive'
import { useSound } from './SoundContext'

export default function CapturedWorks() {
  const archiveRef = useRef(null)
  const { notify } = useSound()
  const categories = supportingCategories.map(([label, count]) => `${label} · ${count}`)
  const openArchive = () => {
    const dialog = archiveRef.current
    if (!dialog?.showModal) {
      notify('This browser cannot open the listening room.')
      return
    }
    try {
      if (!dialog.open) dialog.showModal()
    } catch {
      notify('The listening room could not be opened. Please try again.')
    }
  }
  return (
    <Section id="other-work">
      <ModuleHeader
        id="09 / MIXING + POST"
        title="MIXING & MASTERING PORTFOLIO"
        sub="Selected mixes, masters, dialogue editing and audio restoration."
      />
      <div className="pocket" data-reveal>
        <div>
          <span className="field-label">POCKET FM</span>
          <h3>30+ promos</h3>
        </div>
        <p>Voice direction, fantasy character voices, SFX, BGM, final mixes and audio QC.</p>
        <div className="chips">
          <span className="chip">VOICE DIRECTION</span>
          <span className="chip">CHARACTER VOICES</span>
          <span className="chip">SFX</span>
          <span className="chip">BGM</span>
          <span className="chip">MIX</span>
          <span className="chip">AUDIO QC</span>
        </div>
        <a className="game-link" href={links.pocketFm} target="_blank" rel="noreferrer noopener">
          WATCH POCKETFM REEL ↗
        </a>
      </div>
      <div className="post-links" data-reveal>
        <a href={links.bkrDkr} target="_blank" rel="noreferrer noopener">
          <span className="field-label">FILM + PROMO MIX</span>
          <strong>BKR–DKR</strong>
          <em>WATCH PROJECT ↗</em>
        </a>
        <button type="button" onClick={openArchive}>
          <span className="field-label">PLAYABLE AUDIO</span>
          <strong>11 playable mixes, masters + post pieces</strong>
          <em>OPEN LISTENING ROOM ↗</em>
        </button>
      </div>
      <p className="category-line">{categories.join('  /  ')}</p>
      <AudioArchive dialogRef={archiveRef} />
    </Section>
  )
}
