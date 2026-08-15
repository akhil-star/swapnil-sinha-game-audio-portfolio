import { useRef, useState } from 'react'
import { Section, ModuleHeader, MediaImage } from './ui'
import { useSound } from './SoundContext'
import { assetPath } from '../utils/assets'
import { links } from '../data/site'

const categories = [
  ['AMBIENCE / DRONES', '30+', 'Loopable beds for sustained tension.'],
  ['CREATURES', '10+', 'Vocal and designed creature material.'],
  ['IMPACTS + DESIGNED', '25+', 'Hits, transitions and processed horror sounds.'],
  ['IMPULSE RESPONSES', '4', 'Spaces captured for convolution reverb.'],
]
const samples = [
  {
    title: 'Deep Sea',
    category: 'AMBIENCE / DRONE',
    src: assetPath('audio/obscura/amb-deep-sea.mp3'),
    note: 'A sustained environmental bed with subtle movement and no obvious repeating pulse.',
    loopable: true,
  },
  {
    title: 'Creature 03',
    category: 'CREATURE',
    src: assetPath('audio/obscura/creature-03.mp3'),
    note: 'A designed creature voice shaped for weight and non-human texture.',
  },
  {
    title: 'Swarm Rise',
    category: 'DESIGNED SOUND',
    src: assetPath('audio/obscura/designed-swarm-rise.mp3'),
    note: 'A rising transition built around density and accumulating motion.',
  },
  {
    title: 'Impact 05',
    category: 'IMPACT',
    src: assetPath('audio/obscura/impact-05.mp3'),
    note: 'A one-shot impact combining a fast transient with a short designed tail.',
  },
]

function Sample({ title, category, src, note, loopable }) {
  const audioRef = useRef(null)
  const { requestPlay } = useSound()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [looping, setLooping] = useState(false)
  const toggle = async () => {
    const audio = audioRef.current
    if (!audio.paused) return audio.pause()
    audio.volume = volume
    setError('')
    setLoading(true)
    try {
      await requestPlay(audio)
    } catch {
      setPlaying(false)
      setError('Audio unavailable.')
      setLoading(false)
    }
  }
  const time = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
  return (
    <article className={playing ? 'obscura-sample is-playing' : 'obscura-sample'}>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration)
          setLoading(false)
        }}
        onCanPlay={() => setLoading(false)}
        onError={() => {
          setError('Audio unavailable.')
          setLoading(false)
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime)
          setProgress(
            e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration : 0,
          )
        }}
        onPlay={() => {
          setPlaying(true)
          setLoading(false)
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          setCurrentTime(0)
          setProgress(0)
        }}
      />
      <div className="player-display">
        <div className="player-display__status">
          <span
            className={playing ? 'bars bars--player bars--live' : 'bars bars--player'}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
          <span aria-live="polite">
            {error || (loading ? 'LOADING' : playing ? 'PLAYING' : 'READY')}
          </span>
          <span>MP3 · 48 KHZ</span>
        </div>
        <div className="player-display__track">
          <div>
            <span className="field-label">{category}</span>
            <h3>{title}</h3>
          </div>
          <strong>{time(currentTime)}</strong>
        </div>
        <div className="player-seek">
          <input
            type="range"
            min="0"
            max="1000"
            value={progress * 1000}
            aria-label={`Seek ${title}`}
            onChange={(e) => {
              const audio = audioRef.current
              if (audio.duration)
                audio.currentTime = (audio.duration * Number(e.target.value)) / 1000
            }}
          />
          <span>{duration ? time(duration) : '—:—'}</span>
        </div>
      </div>
      <p className="sample-note">{note}</p>
      <div className="player-controls">
        <button
          className="transport"
          data-sonic="stone"
          onClick={() => {
            const audio = audioRef.current
            audio.currentTime = Math.max(0, audio.currentTime - 5)
          }}
          aria-label={`Rewind ${title} five seconds`}
        >
          −5
        </button>
        <button
          className="transport transport--primary"
          data-sonic="stone"
          onClick={toggle}
          aria-label={`${playing ? 'Pause' : 'Play'} ${title}`}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <button
          className="transport"
          data-sonic="stone"
          onClick={() => {
            const audio = audioRef.current
            audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5)
          }}
          aria-label={`Forward ${title} five seconds`}
        >
          +5
        </button>
        {loopable && (
          <button
            className="loop-control"
            aria-pressed={looping}
            onClick={() => {
              const next = !looping
              setLooping(next)
              audioRef.current.loop = next
            }}
          >
            LOOP {looping ? 'ON' : 'OFF'}
          </button>
        )}
        <label className="volume-control">
          <span>VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            aria-label={`Volume for ${title}`}
            onChange={(e) => {
              const next = Number(e.target.value)
              setVolume(next)
              audioRef.current.volume = next
            }}
          />
        </label>
      </div>
    </article>
  )
}

export default function SoundLibrary() {
  return (
    <Section id="lab">
      <ModuleHeader
        id="06 / SOUND LIBRARY"
        title="OBSCURA"
        sub="A horror SFX toolkit shaped around tension, movement and spatial character."
        status="HORROR TOOLKIT"
      />
      <div className="obscura-product" data-reveal>
        <div className="obscura-product__art">
          <MediaImage
            src={assetPath('media/obscura-header.jpg')}
            alt="Obscura Horror Toolkit artwork by Artsycaves"
            loading="lazy"
          />
        </div>
        <div className="obscura__intro">
          <span className="field-label">DESIGNED SOUND LIBRARY</span>
          <h3>Designed for dread, creatures and spaces with a presence of their own.</h3>
          <p>Layered textures, expressive creature voices, impacts and captured spaces.</p>
          <div className="obscura-product__actions">
            <a
              className="btn btn--solid"
              data-sonic="stone"
              href={links.obscura}
              target="_blank"
              rel="noreferrer noopener"
            >
              VIEW ON ITCH.IO ↗
            </a>
            <span>60+ SFX · 48 KHZ / 24-BIT · WAV / MP3 / OGG</span>
          </div>
        </div>
      </div>
      <div className="obscura__counts" data-reveal>
        {categories.map(([name, count, note]) => (
          <article key={name}>
            <strong>{count}</strong>
            <span>{name}</span>
            <p>{note}</p>
          </article>
        ))}
      </div>
      <div className="obscura-samples">
        <div className="obscura-samples__head">
          <span className="field-label">LISTENING SAMPLES</span>
          <p>Ambience, creature, transition and impact selections.</p>
        </div>
        {samples.map((sample) => (
          <Sample key={sample.src} {...sample} />
        ))}
      </div>
    </Section>
  )
}
