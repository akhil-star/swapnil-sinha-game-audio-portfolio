import { useEffect, useRef, useState } from 'react'
import { useSound } from './SoundContext'

const SECTIONS = [
  ['work', 'Work'],
  ['tech', 'Tech'],
  ['lab', 'Lab'],
  ['about', 'About'],
  ['contact', 'Contact'],
]

export default function Nav() {
  const progressRef = useRef(null)
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

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0
      progressRef.current?.style.setProperty('--scroll-progress', progress)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
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
        title={`${soundOn ? 'Disable' : 'Enable'} background music and interface sounds`}
      >
        <span className={soundOn ? 'led led--on' : 'led'} /> SITE AUDIO {soundOn ? 'ON' : 'OFF'}
      </button>
      <span className="nav__progress" ref={progressRef} aria-hidden="true">
        <i />
      </span>
    </nav>
  )
}
