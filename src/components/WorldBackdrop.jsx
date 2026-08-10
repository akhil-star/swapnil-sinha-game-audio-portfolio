import { useEffect, useRef } from 'react'
import { assetPath } from '../utils/assets'

export default function WorldBackdrop() {
  const backdropRef = useRef(null)

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - innerHeight)
      const progress = Math.min(1, Math.max(0, scrollY / range))
      backdrop.style.setProperty('--world-shift', `${(progress - 0.5) * 90}px`)
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
        '--world-image': `url("${assetPath('artwork/deep-ocean-ringworld-backdrop.jpg')}")`,
      }}
      aria-hidden="true"
    />
  )
}
