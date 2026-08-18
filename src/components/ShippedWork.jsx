import { useRef, useState } from 'react'
import { Section, ModuleHeader, Chips, MediaImage } from './ui'
import { projects, resolveMedia } from '../data/projects'
import { useSound } from './SoundContext'

function ProjectCard({ project, index, onOpen }) {
  const previewRef = useRef(null)
  const { requestPlay } = useSound()
  const [previewSoundOn, setPreviewSoundOn] = useState(false)
  const shots = project.media?.shots ?? []
  const shot = shots[0]
  const hasGallery = shots.length > 1
  const hasVideoPreview = project.id === 'rahasya' && Boolean(project.demoVideo)
  const galleryLayout = project.media?.layout === 'portrait' ? 'portrait' : 'landscape'

  const playPreview = () => {
    const preview = previewRef.current
    if (!preview || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    preview.muted = !previewSoundOn
    preview.volume = 0.72
    preview.play().catch(() => {})
  }

  const pausePreview = () => {
    const preview = previewRef.current
    if (!preview) return
    preview.muted = true
    preview.pause()
    preview.currentTime = 0
    setPreviewSoundOn(false)
  }

  const togglePreviewSound = async () => {
    const preview = previewRef.current
    if (!preview) return
    const next = !previewSoundOn
    preview.muted = !next
    preview.volume = 0.72
    setPreviewSoundOn(next)
    if (!next) return
    try {
      await requestPlay(preview)
    } catch {
      preview.muted = true
      setPreviewSoundOn(false)
    }
  }

  return (
    <article
      className={`proj ${project.featured ? 'proj--featured' : 'proj--secondary'} ${hasVideoPreview ? 'proj--video-preview' : ''}`}
      data-accent={project.accent}
      data-platform={project.platform.includes('PC') ? 'PC' : 'MOBILE'}
      data-reveal
      onMouseEnter={hasVideoPreview ? playPreview : undefined}
      onMouseLeave={hasVideoPreview ? pausePreview : undefined}
      onFocusCapture={hasVideoPreview ? playPreview : undefined}
      onBlurCapture={
        hasVideoPreview
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) pausePreview()
            }
          : undefined
      }
    >
      <div
        className={
          hasGallery
            ? `proj__shot proj__shot--gallery proj__shot--gallery-${galleryLayout}`
            : 'proj__shot'
        }
      >
        {hasVideoPreview ? (
          <video
            ref={previewRef}
            className="proj__preview-video"
            src={project.demoVideo.src}
            poster={shot ? resolveMedia(shot.remote, shot.local) : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex="-1"
          />
        ) : hasGallery ? (
          shots
            .slice(0, 3)
            .map((item) => (
              <MediaImage
                key={item.local}
                src={resolveMedia(item.remote, item.local)}
                alt={item.caption || `${project.title} gameplay`}
                loading="eager"
              />
            ))
        ) : (
          shot && (
            <MediaImage
              src={resolveMedia(shot.remote, shot.local)}
              alt={shot.caption || ''}
              loading="eager"
            />
          )
        )}
        {hasVideoPreview && (
          <>
            <span className="proj__preview-cue">
              <span className="proj__preview-cue--hover">HOVER TO PREVIEW</span>
              <span className="proj__preview-cue--touch">PLAY DEMO INSIDE</span>
            </span>
            <button
              type="button"
              className={`proj__preview-audio ${previewSoundOn ? 'is-on' : ''}`}
              data-sonic="silent"
              aria-pressed={previewSoundOn}
              aria-label={`${previewSoundOn ? 'Mute' : 'Hear'} Rahasya thumbnail preview`}
              onClick={togglePreviewSound}
            >
              <span className="proj__preview-audio-icon" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>PREVIEW SOUND {previewSoundOn ? 'ON' : 'OFF'}</span>
            </button>
          </>
        )}
        {!project.featured && (
          <div className="proj__hover-detail">
            <span className="field-label">CASE NOTE</span>
            <p>{project.highlights?.[0] ?? project.cardSummary}</p>
          </div>
        )}
        {project.media?.icon && (
          <MediaImage
            className="proj__icon"
            src={resolveMedia(project.media.icon.remote, project.media.icon.local)}
            alt={`${project.title} icon`}
            loading="eager"
          />
        )}
        <span className="proj__tag">
          {project.platform} · {project.status}
        </span>
        <span className="proj__index" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <div className="proj__body">
        <div>
          <h3 className="proj__title">{project.title}</h3>
          <p className="proj__role">{project.role.join(' · ')}</p>
        </div>
        <div>
          <span className="field-label">AUDIO ROLE + SCOPE</span>
          <p className="proj__text">{project.cardSummary}</p>
        </div>
        <Chips items={project.stack} />
        <div className="proj__foot">
          <span>{project.studio}</span>
          <button
            type="button"
            className="game-link game-link--button"
            data-sonic="stone"
            onClick={() => {
              if (hasVideoPreview) pausePreview()
              onOpen(project)
            }}
          >
            OPEN CASE FILE ↗
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ShippedWork() {
  const dialogRef = useRef(null)
  const { notify } = useSound()
  const [selected, setSelected] = useState(projects[0] ?? null)

  const openProject = (project) => {
    setSelected(project)
    const dialog = dialogRef.current
    if (!dialog?.showModal) {
      notify('This browser cannot open the project case file.')
      return
    }
    try {
      if (!dialog.open) dialog.showModal()
    } catch {
      notify('The project case file could not be opened. Please try again.')
    }
  }

  return (
    <Section id="work">
      <ModuleHeader
        id="04 / RELEASED WORK"
        title={
          <>
            SHIPPED
            <br />
            GAMES
          </>
        }
        sub="Released on Steam and mobile."
        status={`${projects.length} TITLES`}
      />
      {projects.length ? (
        <div className="proj-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={openProject} />
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <span>CASE FILES UNAVAILABLE</span>
          <p>Project details are being updated. Please check back soon.</p>
        </div>
      )}
      {selected && (
        <dialog
          className={`project-file ${selected.demoVideo ? 'project-file--video' : ''}`}
          ref={dialogRef}
          aria-labelledby="project-file-title"
          onClose={(event) => {
            event.currentTarget.querySelectorAll('video').forEach((video) => video.pause())
          }}
        >
          <div className="project-file__shell">
            <header className="project-file__header">
              <div>
                <span className="field-label">PROJECT CASE FILE · {selected.status}</span>
                <h2 id="project-file-title">{selected.title}</h2>
                <p>{selected.subtitle}</p>
              </div>
              <button
                type="button"
                className="dialog-close"
                onClick={() => dialogRef.current?.close()}
                aria-label={`Close ${selected.title} case file`}
              >
                <span>CLOSE</span>
                <span className="close-mark" aria-hidden="true">
                  ×
                </span>
              </button>
            </header>
            <div className="project-file__content">
              <div
                className={`project-file__gallery project-file__gallery--${selected.media?.layout ?? 'landscape'} ${selected.demoVideo ? 'project-file__gallery--video' : ''}`}
              >
                {selected.demoVideo && (
                  <figure className="project-file__video">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={selected.demoVideo.caption}
                      poster={
                        selected.media?.shots?.[0]
                          ? resolveMedia(
                              selected.media.shots[0].remote,
                              selected.media.shots[0].local,
                            )
                          : undefined
                      }
                    >
                      <source src={selected.demoVideo.src} type="video/mp4" />
                      Your browser does not support embedded video.{' '}
                      <a href={selected.demoVideo.src}>Open the video directly.</a>
                    </video>
                    <figcaption>{selected.demoVideo.caption}</figcaption>
                  </figure>
                )}
                {!selected.demoVideo &&
                  selected.media?.shots?.map((shot) => (
                    <figure key={shot.local}>
                      <MediaImage
                        src={resolveMedia(shot.remote, shot.local)}
                        alt={shot.caption || `${selected.title} gameplay screenshot`}
                        loading="lazy"
                      />
                      {shot.caption && <figcaption>{shot.caption}</figcaption>}
                    </figure>
                  ))}
              </div>
              <aside className="project-file__details">
                <span className="field-label">{selected.role.join(' · ')}</span>
                <h3>Audio brief</h3>
                <p>{selected.summary}</p>
                <h4>Selected contributions</h4>
                <ul>
                  {selected.highlights?.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <span className="field-label project-file__stack-label">PIPELINE</span>
                <Chips items={selected.stack} />
                <div className="project-file__actions">
                  <a
                    className="btn btn--solid"
                    data-sonic="stone"
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {selected.hrefLabel} ↗
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </dialog>
      )}
    </Section>
  )
}
