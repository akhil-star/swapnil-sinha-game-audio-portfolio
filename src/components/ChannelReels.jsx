import { useEffect, useRef, useState } from 'react'
import { Section, ModuleHeader, MediaImage, VideoEmbed } from './ui'
import { youtubeReels } from '../data/capturedWorks'
import { links } from '../data/site'

export default function ChannelReels() {
  const channelReels = youtubeReels.filter((reel) => !reel.featured)
  const dialogRef = useRef(null)
  const [selectedReel, setSelectedReel] = useState(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (selectedReel && dialog?.showModal && !dialog.open) dialog.showModal()
  }, [selectedReel])

  const playReel = (reel) => {
    setSelectedReel(reel)
  }

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
            <button
              type="button"
              className="channel-card"
              key={reel.videoId}
              data-sonic="stone"
              data-reveal
              onClick={() => playReel(reel)}
              aria-label={`Play ${reel.title} on this page`}
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
            </button>
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
      {selectedReel && (
        <dialog
          className="reel-viewer"
          ref={dialogRef}
          aria-labelledby="reel-viewer-title"
          onClose={() => setSelectedReel(null)}
        >
          <div className="reel-viewer__header">
            <div>
              <span className="field-label">PLAYING ON SITE</span>
              <h3 id="reel-viewer-title">{selectedReel.title}</h3>
            </div>
            <div className="reel-viewer__actions">
              <a
                href={`https://www.youtube.com/watch?v=${selectedReel.videoId}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                YOUTUBE ↗
              </a>
              <button
                type="button"
                className="dialog-close"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close video player"
              >
                <span>CLOSE</span>
                <span className="close-mark" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
          </div>
          <div className="reel-viewer__player">
            <VideoEmbed
              key={selectedReel.videoId}
              videoId={selectedReel.videoId}
              title={selectedReel.title}
              poster={selectedReel.thumbnail}
              autoActivate
            />
          </div>
        </dialog>
      )}
    </Section>
  )
}
