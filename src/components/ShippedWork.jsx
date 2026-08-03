import { Section, ModuleHeader, Chips } from './ui'
import { otherProjects, featuredProject, resolveMedia } from '../data/projects'

function pickShot(project) {
  const shot = project.media?.shots?.[0]
  if (!shot) return null
  return { src: resolveMedia(shot.remote, shot.local), alt: shot.caption ?? project.title }
}

function ProjectCard({ project }) {
  const shot = pickShot(project)

  return (
    <article
      className="proj"
      data-accent={project.accent}
      data-reveal
    >
      <div className="proj__shot">
        {shot && <img src={shot.src} alt={shot.alt} loading="lazy" />}
        <span className="proj__tag">
          {project.platform} · {project.status}
        </span>
      </div>

      <div className="proj__body">
        <div>
          <h3 className="proj__title">{project.title}</h3>
          <div className="proj__sub">{project.subtitle}</div>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>PLAYER EXPERIENCE</div>
        <p className="proj__text">{project.summary}</p>

        {project.highlights && (
          <>
            <div className="eyebrow" style={{ margin: '18px 0 8px' }}>CREATIVE APPROACH &amp; IMPLEMENTATION</div>
            <ul className="proj__list">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </>
        )}

        <Chips items={project.stack} />

        <div className="proj__foot">
          <span className="proj__sub">{project.role.join(' · ')}</span>
          {project.href && (
            <a
              className="btn"
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              style={{ padding: '8px 13px' }}
            >
              {project.hrefLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ShippedWork() {
  const all = [featuredProject, ...otherProjects]
  return (
    <Section id="work">
      <ModuleHeader
        id="03 / SHIPPED"
        title="Games I&apos;ve helped bring to life"
        sub="Live on Steam and Google Play. Each one starts with a player need, then becomes a set of choices that has to survive the build."
        status={`${all.length} TITLES`}
      />
      <div className="proj-grid">
        {all.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  )
}
