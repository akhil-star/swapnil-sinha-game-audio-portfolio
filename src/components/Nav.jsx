import { useEffect, useState } from 'react'

/** [id, label, keepOnMobile] — the small screen keeps only the two that convert. */
const SECTIONS = [
  ['captured-works', 'Captured work', true],
  ['work', 'Game credits', false],
  ['experience', 'Experience', false],
  ['contact', 'Contact', true],
]

export default function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = SECTIONS.map(([id]) => id)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav className="nav">
      <a className="nav__brand" href="#top">
        <span className="bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        SWAPNIL SINHA
      </a>

      <div className="nav__links">
        {SECTIONS.map(([id, label, keepOnMobile]) => (
          <a
            key={id}
            href={`#${id}`}
            className={keepOnMobile ? 'nav__link nav__link--keep' : 'nav__link'}
            aria-current={active === id}
          >
            {label.toUpperCase()}
          </a>
        ))}
      </div>
    </nav>
  )
}
