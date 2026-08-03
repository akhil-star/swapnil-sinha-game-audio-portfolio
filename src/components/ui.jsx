import { useEffect, useRef } from 'react'

/** Section header styled like an inspector module bar. */
export function ModuleHeader({ id, title, sub, status }) {
  return (
    <header className="modhead">
      <div className="modhead__id">{id}</div>
      <div className="modhead__main">
        <h2 className="modhead__title">{title}</h2>
        {sub && <p className="modhead__sub">{sub}</p>}
      </div>
      {status && <div className="modhead__status">{status}</div>}
    </header>
  )
}

export function Panel({ label, right, children, accent, style }) {
  return (
    <div className="panel" data-accent={accent} style={style}>
      {(label || right) && (
        <div className="panel__bar">
          <span>{label}</span>
          {right && <span>{right}</span>}
        </div>
      )}
      <div className="panel__body">{children}</div>
    </div>
  )
}

export function Chip({ children }) {
  return <span className="chip">{children}</span>
}

export function Chips({ items }) {
  return (
    <div className="chips">
      {items.map((i) => (
        <Chip key={i}>{i}</Chip>
      ))}
    </div>
  )
}

/** Adds .is-in to [data-reveal] descendants as they scroll into view. */
export function useReveal() {
  const root = useRef(null)
  useEffect(() => {
    const node = root.current
    if (!node) return
    const targets = node.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return root
}

export function Section({ id, children, flush }) {
  return (
    <section id={id} className={flush ? 'section section--flush' : 'section'}>
      <div className="shell">{children}</div>
    </section>
  )
}
