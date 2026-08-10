import { Section, ModuleHeader, Chips } from './ui'
import { experience, education } from '../data/experience'
import { toolchain, philosophy, identity } from '../data/site'

export default function Experience() {
  return (
    <>
      <Section id="experience">
        <ModuleHeader
          id="10 / EXPERIENCE"
          title="EXPERIENCE"
          sub="Games, promotional work and post-production—shipped with developers, voice artists and production teams."
          status={
            <a href={identity.resumePdf} download>
              DOWNLOAD RESUME ↓
            </a>
          }
        />

        <div className="experience-layout">
          <div>
            <div className="experience-kicker">PROFESSIONAL EXPERIENCE · {experience.length}</div>
            <div className="experience-grid">
              {experience.map((job, index) => (
                <article className="job" key={job.company}>
                  <header className="job__header">
                    <span className="job__index">0{index + 1}</span>
                    <div className="job__period">
                      <span className={job.current ? 'led led--on' : 'led'} />
                      {job.period.toUpperCase()}
                    </div>
                  </header>
                  <div>
                    <div className="job__company">{job.company.toUpperCase()}</div>
                    <h3 className="job__role">{job.role}</h3>
                    <ul>
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="education-column">
            <div className="experience-kicker">EDUCATION · {education.length}</div>
            <div className="education-panel">
              {education.map((item) => (
                <article className="education-card" key={item.school}>
                  <span>{item.period.toUpperCase()}</span>
                  <h3>{item.qualification}</h3>
                  <p>{item.school}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className="toolkit-panel">
          <div className="eyebrow">TOOLS, BY THE JOB THEY DO</div>
          <div className="toolkit-grid">
            {Object.entries(toolchain).map(([group, items]) => (
              <div className="toolkit-group" key={group}>
                <div className="toolkit-group__label">{group}</div>
                <Chips items={items} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="about">
        <ModuleHeader
          id="11 / ABOUT"
          title={
            <>
              FIELD RECORDINGS,
              <br />
              <em>INTERACTIVE WORLDS.</em>
            </>
          }
          status={identity.location.toUpperCase()}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          <div data-reveal>
            {philosophy.lines.map((line) => (
              <p
                key={line}
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(26px, 3.4vw, 42px)',
                  lineHeight: 1.16,
                  letterSpacing: '-0.02em',
                  margin: '0 0 14px',
                }}
              >
                {line}
              </p>
            ))}
          </div>
          <p style={{ margin: 0, color: 'var(--dim)', fontSize: 16, maxWidth: '46ch' }} data-reveal>
            {philosophy.body}
          </p>
        </div>
        <div style={{ marginTop: 40 }} data-reveal>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            WHAT I KEEP IN MIND
          </div>
          <div className="cards">
            {philosophy.principles.map((principle) => (
              <div className="card" key={principle}>
                <p className="card__text" style={{ margin: 0 }}>
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
