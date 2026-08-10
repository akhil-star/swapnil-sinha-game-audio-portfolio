import { useRef, useState } from 'react'
import { Section, ModuleHeader, Chips } from './ui'
import { projects, resolveMedia } from '../data/projects'

function ProjectCard({ project, index, onOpen }) {
  const shot = project.media?.shots?.[0]
  const mobileGallery = ['battlebucks', 'molotov-flip'].includes(project.id)
  return (
    <article
      className={`proj ${project.featured ? 'proj--featured' : ''}`}
      data-accent={project.accent}
      data-platform={project.platform.includes('PC') ? 'PC' : 'MOBILE'}
      data-reveal
    >
      <div className={mobileGallery ? 'proj__shot proj__shot--gallery' : 'proj__shot'}>
        {mobileGallery
          ? project.media.shots
              .slice(0, 3)
              .map((item) => (
                <img
                  key={item.local}
                  src={resolveMedia(item.remote, item.local)}
                  alt={item.caption || ''}
                  loading="lazy"
                />
              ))
          : shot && (
              <img
                src={resolveMedia(shot.remote, shot.local)}
                alt={shot.caption || ''}
                loading="lazy"
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
          <button className="game-link game-link--button" onClick={() => onOpen(project)}>
            OPEN CASE FILE ↗
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ShippedWork() {
  const dialogRef = useRef(null)
  const [selected, setSelected] = useState(projects[0])

  const openProject = (project) => {
    setSelected(project)
    dialogRef.current?.showModal()
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
      <div className="proj-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onOpen={openProject} />
        ))}
      </div>
      <dialog className="project-file" ref={dialogRef} aria-labelledby="project-file-title">
        <div className="project-file__shell">
          <header className="project-file__header">
            <div>
              <span className="field-label">PROJECT CASE FILE · {selected.status}</span>
              <h2 id="project-file-title">{selected.title}</h2>
              <p>{selected.subtitle}</p>
            </div>
            <button onClick={() => dialogRef.current?.close()}>CLOSE ×</button>
          </header>
          <div className="project-file__content">
            <div className="project-file__gallery">
              {selected.media?.shots?.map((shot) => (
                <figure key={shot.local}>
                  <img src={resolveMedia(shot.remote, shot.local)} alt={shot.caption || ''} />
                  {shot.caption && <figcaption>{shot.caption}</figcaption>}
                </figure>
              ))}
            </div>
            <aside className="project-file__details">
              <span className="field-label">{selected.role.join(' · ')}</span>
              <h3>What brought it to life</h3>
              <p>{selected.summary}</p>
              <ul>
                {selected.highlights?.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <Chips items={selected.stack} />
              <a
                className="btn btn--solid"
                href={selected.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {selected.hrefLabel} ↗
              </a>
            </aside>
          </div>
        </div>
      </dialog>
    </Section>
  )
}
