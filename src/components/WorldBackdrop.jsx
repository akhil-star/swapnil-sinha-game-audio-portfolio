import { useEffect, useRef } from 'react'
export default function WorldBackdrop() {
  const backdropRef = useRef(null)

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      const shift = Math.max(-56, Math.min(128, -40 + scrollY * 0.045))
      backdrop.style.setProperty('--world-shift', `${shift}px`)
      frame = 0
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
    <div
      ref={backdropRef}
      className="world-backdrop"
      style={{
        '--world-image': 'url("/artwork/deep-ocean-ringworld-backdrop.jpg")',
      }}
      aria-hidden="true"
    />
  )
}
