import { useEffect, useRef, useState } from 'react'
import { assetPath } from '../utils/assets'
import { useSound } from './SoundContext'

const collections = {
  mix: {
    label: 'Mixing + Mastering',
    note: 'Final mixes and masters across covers, independent releases and client work.',
    tracks: [
      ['Cigarettes After Sex — Sunsetz (Cover)', 'sunsetz-cover.m4a', 'Mix + master'],
      ['Crossbeat — Look Deep Into It', 'crossbeat-look-deep-into-it.m4a', 'Mix + master'],
      ['Crossbeat — Moment', 'crossbeat-moment.m4a', 'Mix + master'],
      ['Jaan Waliya (Cover)', 'jaan-waliya-cover.m4a', 'Master'],
      ['Jammu Da Shahar — Virender Kapadia', 'jammu-da-shahar.mp3', 'Master'],
      ['Prabh Anmol — Thank God', 'prabh-anmol-thank-god.m4a', 'Mix + master'],
      ['Prabh Anmol — Tsunami', 'prabh-anmol-tsunami.m4a', 'Mix + master'],
      ['A Walk', 'a-walk.mp3', 'Mix + master'],
    ].map(([title, file, credit]) => ({
      title,
      credit,
      src: assetPath(`audio/mixing-mastering/${file}`),
    })),
  },
  post: {
    label: 'Recording + Post',
    note: 'Dialogue editing, restoration and final delivery for spoken-word material.',
    tracks: [
      [
        'Cigarettes After Sex — Sunsetz',
        'sunsetz-edit-restoration.m4a',
        'Recording + editing + restoration',
      ],
      ['News Package Interview', 'news-package-interview.mp3', 'Dialogue edit + mix'],
      ['Podcast', 'podcast-edit.m4a', 'Recording + edit + mix'],
    ].map(([title, file, credit]) => ({
      title,
      credit,
      src: assetPath(`audio/post-production/${file}`),
    })),
  },
}

const formatTime = (seconds) =>
  Number.isFinite(seconds)
    ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
    : '0:00'

export default function AudioArchive({ dialogRef }) {
  const audioRef = useRef(null)
  const { requestPlay } = useSound()
  const [collectionKey, setCollectionKey] = useState('mix')
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const collection = collections[collectionKey]
  const track = collection.tracks[active]

  const playTrack = async (index) => {
    const audio = audioRef.current
    if (index === active && !audio.paused) {
      audio.pause()
      return
    }
    if (index !== active) {
      audio.pause()
      setActive(index)
      audio.src = collection.tracks[index].src
      audio.load()
    }
    try {
      await requestPlay(audio)
    } catch {
      setPlaying(false)
    }
  }

  const switchCollection = (key) => {
    audioRef.current?.pause()
    setCollectionKey(key)
    setActive(0)
    setTime(0)
    setDuration(0)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const stop = () => audioRef.current?.pause()
    dialog?.addEventListener('close', stop)
    return () => dialog?.removeEventListener('close', stop)
  }, [dialogRef])

  return (
    <dialog className="audio-archive" ref={dialogRef} aria-labelledby="audio-archive-title">
      <div className="audio-archive__shell">
        <header className="audio-archive__header">
          <div>
            <span className="field-label">COMPLETE LISTENING ARCHIVE · 11 PIECES</span>
            <h2 id="audio-archive-title">Listen to the work.</h2>
          </div>
          <button className="audio-archive__close" onClick={() => dialogRef.current?.close()}>
            CLOSE ×
          </button>
        </header>

        <nav className="audio-archive__tabs" aria-label="Audio archive categories">
          {Object.entries(collections).map(([key, item]) => (
            <button
              key={key}
              className={collectionKey === key ? 'is-active' : ''}
              aria-pressed={collectionKey === key}
              onClick={() => switchCollection(key)}
            >
              {item.label} <span>{String(item.tracks.length).padStart(2, '0')}</span>
            </button>
          ))}
        </nav>

        <div className="audio-archive__body">
          <section className="audio-archive__now">
            <span className="field-label">NOW SELECTED · {track.credit}</span>
            <h3>{track.title}</h3>
            <p>{collection.note}</p>
            <audio
              ref={audioRef}
              src={track.src}
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onEnded={() => playTrack((active + 1) % collection.tracks.length)}
            />
            <div className="archive-transport">
              <button
                className="archive-transport__play"
                onClick={() => (playing ? audioRef.current.pause() : playTrack(active))}
                aria-label={`${playing ? 'Pause' : 'Play'} ${track.title}`}
              >
                {playing ? 'Ⅱ' : '▶'}
              </button>
              <div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.01"
                  value={time}
                  aria-label={`Seek ${track.title}`}
                  onChange={(event) => {
                    const next = Number(event.target.value)
                    audioRef.current.currentTime = next
                    setTime(next)
                  }}
                />
                <span>
                  {formatTime(time)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </section>

          <ol className="audio-archive__list">
            {collection.tracks.map((item, index) => (
              <li key={item.src} className={index === active ? 'is-active' : ''}>
                <button onClick={() => playTrack(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                  <em>{item.credit}</em>
                  <b>{index === active && playing ? 'PAUSE' : 'PLAY'}</b>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </dialog>
  )
}
