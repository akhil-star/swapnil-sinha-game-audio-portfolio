import { useEffect, useRef } from 'react'
import { absoluteAssetPath } from '../utils/assets'
export default function WorldBackdrop() {
  const backdropRef = useRef(null)

  useEffect(() => {
    const backdrop = backdropRef.current
    const root = document.documentElement
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const memory = Number(navigator.deviceMemory || 8)
    const cores = Number(navigator.hardwareConcurrency || 8)
    const lowPower = memory <= 4 || cores <= 4

    root.classList.toggle('performance-lite', lowPower)
    if (!backdrop || reducedMotion || lowPower) {
      return () => root.classList.remove('performance-lite')
    }

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
      root.classList.remove('performance-lite')
    }
  }, [])

  return (
    <div
      ref={backdropRef}
      className="world-backdrop"
      style={{
        '--world-image': `url("${absoluteAssetPath('artwork/verdant-ember-ringworld-backdrop.jpg')}")`,
      }}
      aria-hidden="true"
    />
  )
}
