import { useEffect, useRef, useState } from 'react'
import { identity, links } from '../data/site'

const backgroundTrack =
  'https://media.githubusercontent.com/media/akhil-star/swapnil-sinha-game-audio-portfolio/main/public/captured/mixing-mastering/Cigarettes%20after%20Sex%20-%20Sunsetz%20(Cover).wav'

/**
 * A slow waveform keeps the page's motion language without asking a visitor
 * to enable a synthetic audio demo.
 */
function Spectrum() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      t += reduce ? 0 : 0.006

      const cols = Math.max(48, Math.floor(w / 11))
      const mid = h * 0.62

      ctx.lineWidth = 1
      for (let i = 0; i < cols; i++) {
        const u = i / cols
        let amp

        amp =
          (Math.sin(u * 9 + t * 3.1) * 0.32 +
            Math.sin(u * 23 - t * 1.7) * 0.2 +
            Math.sin(u * 51 + t * 4.3) * 0.1 +
            0.34) *
          (0.35 + 0.65 * Math.sin(u * Math.PI))

        const barH = Math.max(1.5, amp * h * 0.5)
        const x = u * w + 3

        const grad = ctx.createLinearGradient(0, mid - barH, 0, mid + barH)
        grad.addColorStop(0, 'rgba(122,90,248,0.55)')
        grad.addColorStop(0.5, 'rgba(0,200,255,0.85)')
        grad.addColorStop(1, 'rgba(122,90,248,0.35)')
        ctx.strokeStyle = grad
        ctx.beginPath()
        ctx.moveTo(x, mid - barH)
        ctx.lineTo(x, mid + barH * 0.62)
        ctx.stroke()
      }

      // Centre line, like a waveform editor
      ctx.strokeStyle = 'rgba(240,244,248,0.07)'
      ctx.beginPath()
      ctx.moveTo(0, mid)
      ctx.lineTo(w, mid)
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />
}

export default function Hero() {
  const trackRef = useRef(null)
  const [musicOn, setMusicOn] = useState(false)
  const [musicError, setMusicError] = useState(false)

  const toggleBackground = async () => {
    const track = trackRef.current
    if (!track) return
    if (!track.paused) {
      track.pause()
      return
    }
    track.volume = 0.12
    setMusicError(false)
    try {
      await track.play()
      setMusicOn(true)
    } catch {
      setMusicOn(false)
      setMusicError(true)
    }
  }

  return (
    <header className="hero" id="top">
      <audio
        ref={trackRef}
        loop
        preload="metadata"
        onPlay={() => setMusicOn(true)}
        onPause={() => setMusicOn(false)}
        onEnded={() => setMusicOn(false)}
        onError={() => { setMusicOn(false); setMusicError(true) }}
      >
        <source src={backgroundTrack} type="audio/wav" />
      </audio>
      <Spectrum />
      <div className="hero__scrim" />
      <div className="shell hero__inner">
        <div className="eyebrow">
          <span style={{ color: 'var(--signal)' }}>—</span> {identity.roles.join(' · ')}
        </div>

        <h1 className="hero__title">
          Before players see it,
          <br />
          they often <em>hear it.</em>
          <br />
        </h1>

        <div className="hero__grid">
          <p className="hero__lede">
            Hi, I&apos;m Swapnil. I design, compose and implement game audio for the moments a
            player notices before they have words for them — from the first sketch to the build
            in <strong>FMOD</strong> and <strong>Unity</strong>.
          </p>

          <div className="hero__cta">
            <button
              className={musicOn ? 'btn btn--armed' : 'btn'}
              onClick={toggleBackground}
              aria-pressed={musicOn}
            >
              <span className={musicOn ? 'led led--on' : 'led'} aria-hidden="true" />
              {musicError ? 'BACKGROUND UNAVAILABLE' : musicOn ? 'BACKGROUND ON' : 'PLAY BACKGROUND'}
            </button>
            <a className="btn btn--solid" href={links.youtube} target="_blank" rel="noreferrer noopener">
              My channel ↗
            </a>
            <a className="btn" href="#work">
              Explore projects
            </a>
          </div>

          <div className="eyebrow" style={{ textAlign: 'right', lineHeight: 1.9 }}>
            {identity.location}
            <br />
            {identity.timezone}
            <br />
            <span style={{ color: 'var(--signal)' }}>Open to new work</span>
          </div>
        </div>
      </div>
    </header>
  )
}
