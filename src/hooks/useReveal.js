import { useEffect, useRef } from 'react'

/** Adds .is-in to [data-reveal] descendants as they enter the viewport. */
export function useReveal() {
  const root = useRef(null)

  useEffect(() => {
    const node = root.current
    if (!node) return

    const targets = node.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return root
}
