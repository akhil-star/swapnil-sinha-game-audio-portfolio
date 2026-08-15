import { useEffect, useState } from 'react'
import { useSound } from './SoundContext'

const SECTIONS = [
  ['work', 'Work'],
  ['tech', 'Tech'],
  ['lab', 'Lab'],
  ['about', 'About'],
  ['contact', 'Contact'],
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { soundOn, toggleSound } = useSound()
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-35% 0px -55%' },
    )
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="nav" aria-label="Primary navigation">
      <a className="nav__brand" href="#top">
        <span className="bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        SWAPNIL SINHA
      </a>
      <button
        className="nav__menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="primary-links"
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>
      <div className={menuOpen ? 'nav__links is-open' : 'nav__links'} id="primary-links">
        {SECTIONS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setMenuOpen(false)}
            aria-current={active === id}
          >
            {label}
          </a>
        ))}
      </div>
      <button
        className="sound-toggle"
        data-sonic="manual"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={`Turn site audio ${soundOn ? 'off' : 'on'}`}
        title={`${soundOn ? 'Disable' : 'Enable'} atmospheric and interface audio`}
      >
        <span className={soundOn ? 'led led--on' : 'led'} /> SITE AUDIO {soundOn ? 'ON' : 'OFF'}
      </button>
    </nav>
  )
}
