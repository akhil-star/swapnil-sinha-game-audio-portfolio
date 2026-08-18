import { useEffect, useRef } from 'react'

const interactiveSelector =
  'a, button, input, select, textarea, label, [role="button"], [contenteditable="true"]'

export default function AncientCursor() {
  const pointerRef = useRef(null)
  const orbitRef = useRef(null)

  useEffect(() => {
    const pointer = pointerRef.current
    const orbit = orbitRef.current
    const root = document.documentElement
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

    if (!pointer || !orbit || !finePointer.matches || reducedMotion.matches) return

    let frame = 0
    let pointerX = innerWidth / 2
    let pointerY = innerHeight / 2
    let orbitX = pointerX
    let orbitY = pointerY

    root.classList.add('ancient-cursor-enabled')

    const render = () => {
      orbitX += (pointerX - orbitX) * 0.16
      orbitY += (pointerY - orbitY) * 0.16
      pointer.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      orbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const handleMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      pointer.classList.add('is-visible')
      orbit.classList.add('is-visible')
      const overControl = Boolean(event.target.closest?.(interactiveSelector))
      pointer.classList.toggle('is-hovering', overControl)
      orbit.classList.toggle('is-hovering', overControl)
    }
    const handleDown = () => {
      pointer.classList.add('is-pressed')
      orbit.classList.add('is-pressed')
    }
    const handleUp = () => {
      pointer.classList.remove('is-pressed')
      orbit.classList.remove('is-pressed')
    }
    const handleLeave = () => {
      pointer.classList.remove('is-visible')
      orbit.classList.remove('is-visible')
    }

    document.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerdown', handleDown, { passive: true })
    document.addEventListener('pointerup', handleUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerdown', handleDown)
      document.removeEventListener('pointerup', handleUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      root.classList.remove('ancient-cursor-enabled')
    }
  }, [])

  return (
    <>
      <div ref={orbitRef} className="ancient-cursor__orbit" aria-hidden="true">
        <span className="ancient-cursor__orbit-ring" />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div ref={pointerRef} className="ancient-cursor" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false">
          <path className="ancient-cursor__shadow" d="M5 3 25 13 16.8 16.2 21.7 25.8 17.4 28 12.7 18.2 6 24Z" />
          <path className="ancient-cursor__blade" d="M5 3 25 13 16.8 16.2 21.7 25.8 17.4 28 12.7 18.2 6 24Z" />
          <path className="ancient-cursor__inlay" d="m8.2 7.3 11.5 5.8-6 1.9-5 5.2 2-7.1Z" />
          <path className="ancient-cursor__rune" d="m13.8 17 4.9 9.6M8.1 6.8l3.2 6.4-4.9 8.2" />
        </svg>
      </div>
    </>
  )
}
