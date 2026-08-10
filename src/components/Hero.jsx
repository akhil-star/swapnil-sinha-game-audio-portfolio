import { useEffect, useRef } from 'react'
import { assetPath } from '../utils/assets'
import { useSound } from './SoundContext'

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
      ctx.strokeStyle = 'rgba(52,231,220,.68)'
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
  const characterRef = useRef(null)
  const audioContextRef = useRef(null)
  const { soundOn } = useSound()

  const playBlob = (pan = 0) => {
    if (!soundOn) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const context = audioContextRef.current || new AudioContext()
    audioContextRef.current = context
    if (context.state === 'suspended') context.resume()
    const now = context.currentTime
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const filter = context.createBiquadFilter()
    const panner = context.createStereoPanner?.()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(165, now)
    oscillator.frequency.exponentialRampToValueAtTime(74, now + 0.19)
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(620, now)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.018)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
    oscillator.connect(filter)
    filter.connect(gain)
    if (panner) {
      panner.pan.value = Math.max(-0.7, Math.min(0.7, pan))
      gain.connect(panner)
      panner.connect(context.destination)
    } else {
      gain.connect(context.destination)
    }
    oscillator.start(now)
    oscillator.stop(now + 0.24)
  }

  const moveReveal = (event) => {
    const character = characterRef.current
    if (!character) return
    const bounds = character.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    character.style.setProperty('--reveal-x', `${x}%`)
    character.style.setProperty('--reveal-y', `${y}%`)
  }
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
  useEffect(
    () => () => {
      audioContextRef.current?.close()
    },
    [],
  )
  return (
    <header className="hero" id="top" ref={heroRef}>
      <Signal />
      <div
        ref={characterRef}
        className="hero-character"
        aria-hidden="true"
        style={{
          '--hero-character-image': `url(${assetPath('artwork/swapnil-signal-character-glass-v2.jpg')})`,
        }}
      >
        <img
          className="hero-character__base"
          src={assetPath('artwork/swapnil-signal-character-glass-v2.jpg')}
          alt=""
          fetchpriority="high"
        />
        <img
          className="hero-character__reveal"
          src={assetPath('artwork/swapnil-signal-character-glass-v2.jpg')}
          alt=""
          aria-hidden="true"
        />
        <span
          className="hero-character__face-map"
          onPointerEnter={(event) => {
            moveReveal(event)
            characterRef.current?.classList.add('is-revealing')
            const bounds = event.currentTarget.getBoundingClientRect()
            playBlob(((event.clientX - bounds.left) / bounds.width) * 2 - 1)
          }}
          onPointerMove={moveReveal}
          onPointerLeave={() => characterRef.current?.classList.remove('is-revealing')}
        />
        <span className="hero-character__lens" />
        <span className="hero-character__glitch" />
        <span className="hero-character__note">
          SIGNAL // 001
          <br />
          SWAPNIL.SINHA
          <br />
          AUDIO SYSTEM ONLINE
        </span>
      </div>
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
            I design, compose and implement game audio with <strong>FMOD + Unity</strong>.
          </p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#reel">
              ▶ Play game audio reel
            </a>
            <a className="btn" href="#work">
              View shipped games ↓
            </a>
          </div>
          <p className="hero__disciplines">
            FMOD <span>/</span> UNITY <span>/</span> REAPER <span>/</span> ABLETON
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
