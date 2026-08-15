import { useState } from 'react'

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
export function MediaImage({ alt, className = '', ...props }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`media-fallback ${className}`.trim()}
        role={alt ? 'img' : undefined}
        aria-label={alt ? `${alt} unavailable` : undefined}
        aria-hidden={alt ? undefined : true}
      >
        <span>IMAGE UNAVAILABLE</span>
      </div>
    )
  }

  return (
    <img
      {...props}
      className={className}
      alt={alt}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

/** Lazy YouTube embed with an explicit loading state and external fallback. */
export function VideoEmbed({ videoId, title, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`video-embed ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      aria-busy={!loaded}
    >
      {!loaded && (
        <div className="video-embed__loading" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <span>LOADING VIDEO</span>
        </div>
      )}
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
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
