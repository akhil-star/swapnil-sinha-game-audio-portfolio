import { Section, ModuleHeader, VideoEmbed } from './ui'
import { youtubeReels } from '../data/capturedWorks'

export default function Reel() {
  const reel = youtubeReels.find((item) => item.featured) ?? youtubeReels[0]

  if (!reel) {
    return (
      <Section id="reel">
        <ModuleHeader id="02 / FEATURED REEL" title="GAME AUDIO, IN MOTION." />
        <div className="empty-state" role="status">
          <span>REEL OFFLINE</span>
          <p>The featured reel is being updated. Please check back soon.</p>
        </div>
      </Section>
    )
  }

  return (
    <Section id="reel">
      <ModuleHeader
        id="02 / FEATURED REEL"
        title={
          <>
            GAME AUDIO,
            <br />
            <em>IN MOTION.</em>
          </>
        }
        status="VIDEO · YOUTUBE"
      />
      <div className="reel-feature" data-reveal>
        <div className="reel-feature__context">
          <span className="field-label">FEATURED IMPLEMENTATION</span>
          <h3>{reel.title}</h3>
          <p>A selection of game audio, sound design and implementation work from 2024.</p>
          <div className="chips">
            <span className="chip">SOUND DESIGN</span>
            <span className="chip">GAME AUDIO</span>
            <span className="chip">2024 REEL</span>
          </div>
          <a
            className="text-link reel-feature__fallback"
            href={`https://www.youtube.com/watch?v=${reel.videoId}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            OPEN ON YOUTUBE ↗
          </a>
        </div>
        <div className="reel">
          <VideoEmbed videoId={reel.videoId} title={reel.title} />
        </div>
      </div>
    </Section>
  )
}
