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
    let pointerX = 0
    let pointerY = 0
    let orbitX = 0
    let orbitY = 0
    let previousTime = performance.now()
    let hasPosition = false

    root.classList.add('ancient-cursor-enabled')

    const render = (time) => {
      const elapsed = Math.min(time - previousTime, 32)
      const smoothing = 1 - Math.exp(-elapsed / 150)
      previousTime = time
      orbitX += (pointerX - orbitX) * smoothing
      orbitY += (pointerY - orbitY) * smoothing
      orbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const handleMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      pointer.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`

      if (!hasPosition) {
        orbitX = pointerX
        orbitY = pointerY
        orbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`
        hasPosition = true
      }

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
      hasPosition = false
      pointer.classList.remove('is-visible')
      orbit.classList.remove('is-visible')
      handleUp()
    }

    document.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerdown', handleDown, { passive: true })
    document.addEventListener('pointerup', handleUp, { passive: true })
    document.addEventListener('pointercancel', handleUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    window.addEventListener('blur', handleLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerdown', handleDown)
      document.removeEventListener('pointerup', handleUp)
      document.removeEventListener('pointercancel', handleUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('blur', handleLeave)
      root.classList.remove('ancient-cursor-enabled')
    }
  }, [])

  return (
    <>
      <div ref={orbitRef} className="ancient-cursor__orbit" aria-hidden="true">
        <span className="ancient-cursor__orbit-ring" />
      </div>
      <div ref={pointerRef} className="ancient-cursor" aria-hidden="true">
        <span className="ancient-cursor__tip" />
      </div>
    </>
  )
}
