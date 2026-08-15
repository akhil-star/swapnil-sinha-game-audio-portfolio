import { Section, ModuleHeader, MediaImage } from './ui'
import { youtubeReels } from '../data/capturedWorks'
import { links } from '../data/site'

export default function ChannelReels() {
  const channelReels = youtubeReels.filter((reel) => !reel.featured)

  return (
    <Section id="channel-reels">
      <ModuleHeader
        id="03 / AUDIO REELS"
        title="SELECTED RE-SOUND"
        sub="Game audio, creature design and cinematic sound."
        status={`${channelReels.length} REELS`}
      />
      {channelReels.length ? (
        <div className="channel-shelf">
          {channelReels.map((reel, index) => (
            <a
              className="channel-card"
              href={`https://www.youtube.com/watch?v=${reel.videoId}`}
              target="_blank"
              rel="noreferrer noopener"
              key={reel.videoId}
              data-sonic="stone"
              data-reveal
            >
              <span className="channel-card__visual">
                <MediaImage src={reel.thumbnail} alt="" loading="lazy" />
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
      ) : (
        <div className="empty-state" role="status">
          <span>NO ADDITIONAL REELS</span>
          <p>New sound-design reels will appear here when published.</p>
        </div>
      )}
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
