import { Section, ModuleHeader, Chips } from './ui'
import { experience, education } from '../data/experience'
import { toolchain, philosophy, identity } from '../data/site'

export default function Experience() {
  return (
    <>
      <Section id="experience">
        <ModuleHeader
          id="05 / EXPERIENCE"
          title="Where the hours went"
          sub="Six years across games, promo, and post. Every role below involved shipping to a deadline that was not mine to move."
          status={<a href={identity.resumePdf} download>DOWNLOAD RESUME ↓</a>}
        />

        <div className="timeline">
          {experience.map((job) => (
            <div className="job" key={job.company} data-reveal>
              <div className="job__period">
                <span className={job.current ? 'led led--on' : 'led'} />
                {job.period.toUpperCase()}
              </div>
              <div>
                <h3 className="job__role">{job.role}</h3>
                <div className="job__company">{job.company.toUpperCase()}</div>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {education.map((e) => (
            <div className="job" key={e.school} data-reveal>
              <div className="job__period">
                <span className="led" />
                {e.period.toUpperCase()}
              </div>
              <div>
                <h3 className="job__role">{e.qualification}</h3>
                <div className="job__company">{e.school.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'grid', gap: 18 }}>
          <div className="eyebrow">TOOLS, BY THE JOB THEY DO</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
            }}
          >
            {Object.entries(toolchain).map(([group, items]) => (
              <div key={group}>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    color: 'var(--dimmer)',
                    marginBottom: 10,
                    textTransform: 'uppercase',
                  }}
                >
                  {group}
                </div>
                <Chips items={items} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="about">
        <ModuleHeader id="06 / APPROACH" title="How I think about it" status={identity.location.toUpperCase()} />
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
          <div className="eyebrow" style={{ marginBottom: 14 }}>WHAT I KEEP IN MIND</div>
          <div className="cards">
            {philosophy.principles.map((principle) => (
              <div className="card" key={principle}>
                <p className="card__text" style={{ margin: 0 }}>{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
