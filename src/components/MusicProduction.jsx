import { useRef, useState } from 'react'
import { ModuleHeader, Section } from './ui'
import { useSound } from './SoundContext'
import { assetPath } from '../utils/assets'
import { links } from '../data/site'

const tracks = [
  ['E Ionian', 'e-ionian.mp3', 'Original composition + production'],
  ['Plus / Minus', 'plus-minus.mp3', 'Original composition + production'],
  ['DayDreamer — New Chapter', 'daydreamer-new-chapter.mp3', 'Original composition + production'],
  ['A Walk', 'a-walk.mp3', 'Original composition + production'],
  ['Drown', 'drown.mp3', 'Original composition + production'],
  ['Tera Jahan', 'tera-jahan.mp3', 'Original composition + production'],
  ['Flip the Sample', 'flip-the-sample.mp3', 'Sample-based production'],
  ['DayDreamer — 555', 'daydreamer-555.mp3', 'Original composition + production'],
].map(([title, file, credit]) => ({
  title,
  credit,
  src: assetPath(`audio/music-production/${file}`),
}))

const formatTime = (seconds) =>
  Number.isFinite(seconds)
    ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
    : '0:00'

export default function MusicProduction() {
  const audioRef = useRef(null)
  const playIntentRef = useRef(false)
  const switchingTrackRef = useRef(false)
  const { requestPlay } = useSound()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [playRequested, setPlayRequested] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [status, setStatus] = useState('READY')
  const [loading, setLoading] = useState(false)
  const track = tracks[active]

  const setPlayIntent = (next) => {
    playIntentRef.current = next
    setPlayRequested(next)
  }

  const pause = () => {
    switchingTrackRef.current = false
    setPlayIntent(false)
    setLoading(false)
    setStatus('PAUSED')
    audioRef.current.pause()
  }

  const selectTrack = async (index, autoplay = true) => {
    const audio = audioRef.current
    switchingTrackRef.current = true
    setPlayIntent(false)
    audio.pause()
    setActive(index)
    setCurrentTime(0)
    setDuration(0)
    setStatus('LOADING')
    setLoading(true)
    audio.src = tracks[index].src
    audio.volume = volume
    audio.load()
    if (autoplay) {
      setPlayIntent(true)
      try {
        const started = await requestPlay(audio)
        if (!started && playIntentRef.current) {
          switchingTrackRef.current = false
          setPlayIntent(false)
          setLoading(false)
          setStatus('PRESS PLAY')
        }
      } catch {
        switchingTrackRef.current = false
        setPlayIntent(false)
        setLoading(false)
        setStatus('PRESS PLAY')
      }
    } else {
      switchingTrackRef.current = false
    }
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (playIntentRef.current || !audio.paused) {
      pause()
      return
    }
    audio.volume = volume
    setPlayIntent(true)
    setStatus('LOADING')
    setLoading(true)
    try {
      const started = await requestPlay(audio)
      if (!started && playIntentRef.current) {
        setPlayIntent(false)
        setLoading(false)
        setStatus('PRESS PLAY')
      }
    } catch {
      setPlayIntent(false)
      setLoading(false)
      setStatus('AUDIO UNAVAILABLE')
    }
  }

  const activateTrack = (index) => {
    if (index === active) return toggle()
    return selectTrack(index)
  }

  return (
    <Section id="music-production">
      <ModuleHeader
        id="07 / MUSIC PRODUCTION"
        title="ORIGINALS + EXPERIMENTS"
        sub="Original composition, production and sample-based exploration."
        status="8 TRACKS"
      />
      <div className="retro-deck" data-reveal>
        <audio
          ref={audioRef}
          src={tracks[0].src}
          preload="metadata"
          onLoadStart={() => {
            setLoading(true)
            setStatus('LOADING')
          }}
          onPlay={() => {
            switchingTrackRef.current = false
            setPlayIntent(true)
            setPlaying(true)
            setLoading(false)
            setStatus('PLAYING')
          }}
          onPlaying={() => {
            switchingTrackRef.current = false
            setPlayIntent(true)
            setPlaying(true)
            setLoading(false)
            setStatus('PLAYING')
          }}
          onWaiting={() => {
            setLoading(true)
            setStatus('BUFFERING')
          }}
          onCanPlay={(event) => {
            if (!playIntentRef.current) {
              setLoading(false)
              if (event.currentTarget.paused) setStatus('READY')
            }
          }}
          onPause={() => {
            setPlaying(false)
            if (!switchingTrackRef.current) {
              setPlayIntent(false)
              setLoading(false)
              setStatus('PAUSED')
            }
          }}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration)
            if (event.currentTarget.paused && !playIntentRef.current) setStatus('READY')
          }}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onEnded={() => selectTrack((active + 1) % tracks.length)}
          onError={() => {
            switchingTrackRef.current = false
            setPlaying(false)
            setLoading(false)
            if (playIntentRef.current) {
              setPlayIntent(false)
              setStatus('AUDIO UNAVAILABLE')
            } else {
              setStatus('READY')
            }
          }}
        />
        <div className="retro-deck__topbar">
          <span>SS_PLAYER // MUSIC PRODUCTION</span>
          <span className={playing || loading ? 'deck-led is-live' : 'deck-led'}>{status}</span>
        </div>
        <div className="retro-deck__main">
          <div className="retro-screen">
            <div className="retro-screen__meta">
              <span>TRACK {String(active + 1).padStart(2, '0')}</span>
              <span>STEREO</span>
            </div>
            <h3>{track.title}</h3>
            <p className="retro-screen__credit">{track.credit}</p>
            <div className={playing ? 'deck-spectrum is-live' : 'deck-spectrum'} aria-hidden="true">
              {Array.from({ length: 24 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
            <div className="retro-time">
              <strong>{formatTime(currentTime)}</strong>
              <span>−{formatTime(Math.max(0, duration - currentTime))}</span>
            </div>
            <input
              className="retro-seek"
              type="range"
              min="0"
              max={duration || 0}
              step="0.01"
              value={currentTime}
              aria-label={`Seek ${track.title}`}
              onChange={(event) => {
                const next = Number(event.target.value)
                audioRef.current.currentTime = next
                setCurrentTime(next)
              }}
            />
          </div>
          <div className="retro-controls">
            <button
              data-sonic="stone"
              onClick={() => selectTrack((active - 1 + tracks.length) % tracks.length)}
              aria-label="Previous track"
            >
              ◀◀
            </button>
            <button
              className="retro-controls__play"
              data-sonic="stone"
              onClick={toggle}
              aria-pressed={playing || playRequested}
              aria-label={`${playing || playRequested ? 'Pause' : 'Play'} ${track.title}`}
            >
              {playing || playRequested ? 'Ⅱ' : '▶'}
            </button>
            <button
              data-sonic="stone"
              onClick={() => selectTrack((active + 1) % tracks.length)}
              aria-label="Next track"
            >
              ▶▶
            </button>
            <label>
              VOL
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                aria-label="Music production volume"
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setVolume(next)
                  audioRef.current.volume = next
                }}
              />
            </label>
          </div>
        </div>
        <ol className="retro-playlist">
          {tracks.map((item, index) => (
            <li key={item.src} className={index === active ? 'is-active' : ''}>
              <button onClick={() => activateTrack(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="retro-playlist__track">
                  <strong>{item.title}</strong>
                  <small>{item.credit}</small>
                </span>
                <em>
                  {index === active
                    ? loading && playRequested
                      ? 'LOADING'
                      : playing
                        ? 'PLAYING'
                        : 'ACTIVE'
                    : 'PLAY'}
                </em>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <a
        className="text-link music-source-link"
        href={links.sourcePortfolio}
        target="_blank"
        rel="noreferrer noopener"
      >
        OPEN MUSIC PRODUCTION ARCHIVE ↗
      </a>
    </Section>
  )
}
