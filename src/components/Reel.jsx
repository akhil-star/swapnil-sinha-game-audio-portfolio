import { Section, ModuleHeader } from './ui'
import { youtubeReels } from '../data/capturedWorks'

export default function Reel() {
  const reel = youtubeReels[0]
  return (
    <Section id="reel">
      <ModuleHeader
        id="03 / FEATURED REEL"
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
          <p>Sound design and real-time implementation for an FPS environment in Unity and FMOD.</p>
          <div className="chips">
            <span className="chip">SOUND DESIGN</span>
            <span className="chip">UNITY</span>
            <span className="chip">FMOD</span>
          </div>
        </div>
        <div className="reel">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${reel.videoId}?rel=0`}
            title={reel.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </Section>
  )
}
