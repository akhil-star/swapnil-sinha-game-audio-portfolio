import { useEffect, useRef } from 'react'

function Signal() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0,
      time = 0,
      pointer = 0.5,
      visible = false
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = (e) => {
      pointer = e.clientX / innerWidth
    }
    const draw = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight,
        mid = h * 0.55
      ctx.clearRect(0, 0, w, h)
      time += reduced ? 0 : 0.008
      ctx.beginPath()
      for (let x = 0; x <= w; x += 4) {
        const u = x / w,
          envelope = Math.sin(u * Math.PI),
          proximity = 1 + Math.max(0, 1 - Math.abs(u - pointer) * 5) * 0.32
        const y =
          mid +
          (Math.sin(u * 18 + time) * 0.55 +
            Math.sin(u * 43 - time * 1.7) * 0.25 +
            Math.sin(u * 91 + time * 0.6) * 0.1) *
            h *
            0.15 *
            envelope *
            proximity
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
      }
      ctx.strokeStyle = 'rgba(166,215,91,.68)'
      ctx.lineWidth = 1.35
      ctx.stroke()
      if (!reduced && visible) raf = requestAnimationFrame(draw)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) draw()
      if (!visible) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    resize()
    observer.observe(canvas)
    addEventListener('resize', resize)
    if (!reduced) addEventListener('pointermove', move, { passive: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      if (!reduced) removeEventListener('pointermove', move)
    }
  }, [])
  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}

export default function Hero() {
  const heroRef = useRef(null)
  useEffect(() => {
    const hero = heroRef.current
    if (
      !hero ||
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      matchMedia('(max-width: 768px)').matches
    )
      return
    let raf = 0
    const update = () => {
      raf = 0
      const progress = Math.min(
        1,
        Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight),
      )
      hero.style.setProperty('--hero-scroll', progress)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <header className="hero" id="top" ref={heroRef}>
      <Signal />
      <div className="hero__scrim" />
      <div className="shell hero__inner">
        <p className="hero__name">SWAPNIL SINHA</p>
        <p className="hero__role">
          Sound Designer <span>·</span> Technical Sound Designer <span>·</span> Music Composer
        </p>
        <h1 className="hero__title hero__title--voice">
          I MAKE GAMES SOUND
          <br />
          LIKE THEY BELONG
          <br />
          <em>TO THEIR WORLD.</em>
        </h1>
        <div className="hero__grid">
          <p className="hero__lede">
            A Sound Designer and professional story-drifter, crafting worlds and shaping stories
            through sound.
          </p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#reel" data-sonic="stone">
              ▶ Play game audio reel
            </a>
            <a className="btn" href="#work" data-sonic="stone">
              View shipped games ↓
            </a>
          </div>
          <p className="hero__disciplines">
            FMOD <span>/</span> WWISE <span>/</span> UNITY <span>/</span> UNREAL <span>/</span>{' '}
            REAPER <span>/</span> ABLETON <span>/</span> PRO TOOLS
          </p>
        </div>
        <div className="hero__system" aria-hidden="true">
          <span>GAME AUDIO SYSTEM</span>
          <i />
          <span>DESIGN</span>
          <span>IMPLEMENT</span>
          <span>PLAYTEST</span>
          <strong>READY</strong>
        </div>
      </div>
    </header>
  )
}
