import { Section, ModuleHeader } from './ui'
import { youtubeReels } from '../data/capturedWorks'
import { links } from '../data/site'

export default function ChannelReels() {
  const channelReels = youtubeReels.slice(1)

  return (
    <Section id="channel-reels">
      <ModuleHeader
        id="02 / AUDIO REELS"
        title="SELECTED RE-SOUND"
        sub="Game audio, creature design and cinematic sound."
        status="3 REELS"
      />
      <div className="channel-shelf">
        {channelReels.map((reel, index) => (
          <a
            className="channel-card"
            href={`https://www.youtube.com/watch?v=${reel.videoId}`}
            target="_blank"
            rel="noreferrer noopener"
            key={reel.videoId}
            data-reveal
          >
            <span className="channel-card__visual">
              <img src={reel.thumbnail} alt="" loading="lazy" />
              <span className="channel-card__play" aria-hidden="true">
                ▶
              </span>
              <span className="channel-card__index">0{index + 1}</span>
            </span>
            <span className="channel-card__body">
              <strong>{reel.title}</strong>
              <span>PLAY VIDEO ↗</span>
            </span>
          </a>
        ))}
      </div>
      <a
        className="text-link channel-shelf__link"
        href={links.youtube}
        target="_blank"
        rel="noreferrer noopener"
      >
        EXPLORE THE YOUTUBE CHANNEL ↗
      </a>
    </Section>
  )
}
