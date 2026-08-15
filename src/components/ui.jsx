import { useState } from 'react'

const imageSourceForAttempt = (src, attempt) => {
  if (!src || attempt === 0) return src
  try {
    const url = new URL(src, document.baseURI)
    url.searchParams.set('image_retry', String(attempt))
    return url.href
  } catch {
    return src
  }
}

/** Section header styled like an inspector module bar. */
export function ModuleHeader({ id, title, sub, status }) {
  return (
    <header className="modhead">
      <div className="modhead__id">{id}</div>
      <div className="modhead__main">
        <h2 className="modhead__title">{title}</h2>
        {sub && <p className="modhead__sub">{sub}</p>}
      </div>
      {status && <div className="modhead__status">{status}</div>}
    </header>
  )
}

export function Panel({ label, right, children, accent, style }) {
  return (
    <div className="panel" data-accent={accent} style={style}>
      {(label || right) && (
        <div className="panel__bar">
          <span>{label}</span>
          {right && <span>{right}</span>}
        </div>
      )}
      <div className="panel__body">{children}</div>
    </div>
  )
}

export function Chip({ children }) {
  return <span className="chip">{children}</span>
}

export function Chips({ items }) {
  return (
    <div className="chips">
      {items.map((i) => (
        <Chip key={i}>{i}</Chip>
      ))}
    </div>
  )
}

/** Image with a readable fallback instead of a broken-image icon. */
export function MediaImage({ alt, className = '', src, onError, onLoad, ...props }) {
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const retry = () => {
    setFailed(false)
    setAttempt((current) => current + 1)
  }

  if (failed) {
    return (
      <div
        className={`media-fallback ${className}`.trim()}
        role="group"
        aria-label={alt ? `${alt} unavailable` : undefined}
      >
        <span>IMAGE UNAVAILABLE</span>
        <button type="button" onClick={retry}>
          RETRY IMAGE
        </button>
      </div>
    )
  }

  return (
    <img
      {...props}
      src={imageSourceForAttempt(src, attempt)}
      className={className}
      alt={alt}
      decoding="async"
      onLoad={(event) => {
        setFailed(false)
        onLoad?.(event)
      }}
      onError={(event) => {
        onError?.(event)
        if (attempt < 2) retry()
        else setFailed(true)
      }}
    />
  )
}

/** Consent-friendly YouTube embed with a reliable direct-watch fallback. */
export function VideoEmbed({ videoId, title, poster, className = '' }) {
  const [activated, setActivated] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <div
      className={`video-embed ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      aria-busy={activated && !loaded}
    >
      {!activated ? (
        <button
          className="video-embed__launch"
          type="button"
          data-sonic="stone"
          onClick={() => setActivated(true)}
          aria-label={`Play ${title}`}
        >
          {poster && <img src={poster} alt="" decoding="async" />}
          <span className="video-embed__play" aria-hidden="true">
            ▶
          </span>
          <strong>PLAY VIDEO</strong>
        </button>
      ) : (
        <>
          {!loaded && (
            <div className="video-embed__loading" role="status">
              <span className="loading-spinner" aria-hidden="true" />
              <span>CONNECTING TO YOUTUBE</span>
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
            title={title}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
      <a
        className="video-embed__external"
        href={watchUrl}
        target="_blank"
        rel="noreferrer noopener"
        data-sonic="stone"
      >
        OPEN ON YOUTUBE ↗
      </a>
    </div>
  )
}

export function Section({ id, children, flush }) {
  return (
    <section id={id} className={flush ? 'section section--flush' : 'section'}>
      <div className="shell">{children}</div>
    </section>
  )
}
