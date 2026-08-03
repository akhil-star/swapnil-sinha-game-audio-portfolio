import { useEffect, useRef, useState } from 'react'
import { Section, ModuleHeader } from './ui'
import { capturedWorkGroups, youtubeReels } from '../data/capturedWorks'
import { links } from '../data/site'

function AudioSample({ src, title, activeId, onActiveChange }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (activeId !== src && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [activeId, src])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      onActiveChange(null)
      return
    }
    try {
      await audio.play()
      setIsPlaying(true)
      onActiveChange(src)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} preload="metadata" onEnded={() => { setIsPlaying(false); onActiveChange(null) }}>
        <source src={src} />
      </audio>
      <button className={isPlaying ? 'sample-play sample-play--on' : 'sample-play'} onClick={toggle} aria-pressed={isPlaying}>
        <span>{isPlaying ? 'Ⅱ' : '▶'}</span>
        {isPlaying ? 'PAUSE SAMPLE' : `PLAY ${title}`}
      </button>
    </>
  )
}

export default function CapturedWorks() {
  const count = capturedWorkGroups.reduce((total, group) => total + group.works.length, 0)
  const [activeSample, setActiveSample] = useState(null)

  return (
    <Section id="captured-works">
      <ModuleHeader
        id="03 / CAPTURED WORK"
        title={<>Work you can <em>play for yourself</em></>}
        sub="A small, source-backed library of supplied work. Pick a category, press play, and hear the work without a synthetic demo standing in for it."
        status={`${count} FILES`}
      />

      <div className="captured-groups">
        <section className="captured-group" data-reveal>
          <div className="captured-group__head">
            <div>
              <div className="eyebrow">Verified public videos</div>
              <h3>Game audio reels</h3>
            </div>
            <span>{youtubeReels.length} VIDEOS</span>
          </div>
          <div className="captured-grid">
            {youtubeReels.map((reel) => (
              <a
                className="reel-link"
                key={reel.videoId}
                href={`https://www.youtube.com/watch?v=${reel.videoId}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="reel-link__image">
                  <img src={reel.thumbnail} alt="" />
                  <span className="reel-link__play">▶</span>
                </span>
                <span className="reel-link__title">{reel.title}</span>
                <span className="reel-link__meta">WATCH ON YOUTUBE ↗</span>
              </a>
            ))}
          </div>
        </section>
        {capturedWorkGroups.map((group) => (
          <section className="captured-group" key={group.id} data-reveal>
            <div className="captured-group__head">
              <div>
                <div className="eyebrow">{group.note}</div>
                <h3>{group.label}</h3>
              </div>
              <span>{group.works.length} {group.works.length === 1 ? 'PIECE' : 'PIECES'}</span>
              {group.artwork && <img className="captured-group__art" src={group.artwork} alt="" />}
            </div>
            <div className="captured-grid">
              {group.works.map((work) => (
                <article className="captured-item" key={work.src}>
                  {work.cover && <img className="captured-item__cover" src={work.cover} alt={work.coverAlt || ''} />}
                  <div className="captured-item__title">{work.title}</div>
                  {work.detail && <p>{work.detail}</p>}
                  <AudioSample
                    src={work.src}
                    title={work.title}
                    activeId={activeSample}
                    onActiveChange={setActiveSample}
                  />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="captured-channel">
        More captured work lives on{' '}
        <a href={links.youtube} target="_blank" rel="noreferrer noopener">Swapnil&apos;s YouTube channel ↗</a>.
      </p>
    </Section>
  )
}
