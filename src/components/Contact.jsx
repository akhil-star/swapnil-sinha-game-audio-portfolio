import { Section, ModuleHeader, Chips } from './ui'
import { identity, links } from '../data/site'

const VERBS = ['Design', 'Compose', 'Implement', 'Optimise', 'Profile', 'Ship']

export default function Contact() {
  return (
    <Section id="contact">
      <ModuleHeader
        id="12 / CONTACT"
        title="LET’S BUILD SOMETHING THAT SOUNDS ALIVE."
        status={identity.timezone.toUpperCase()}
      />

      <div className="contact">
        <div data-reveal>
          <p className="contact__pitch">Available for game audio and technical sound design.</p>

          <div className="contact__verbs">
            <Chips items={VERBS} />
          </div>

          <p style={{ color: 'var(--dim)', maxWidth: '52ch', fontSize: 15 }}>
            {identity.availability}. For project enquiries, collaborations and studio roles, get in
            touch directly.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
            <a className="btn btn--solid" href={`mailto:${identity.email}`} data-sonic="stone">
              Email me
            </a>
            <a className="btn" href={identity.resumePdf} download data-sonic="stone">
              Download resume
            </a>
            {links.linkedin && (
              <a
                className="btn"
                href={links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                data-sonic="stone"
              >
                LinkedIn
              </a>
            )}
            {links.github && (
              <a
                className="btn"
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                data-sonic="stone"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="panel" data-reveal>
          <div className="panel__bar">
            <span>DIRECT</span>
            <span className="led led--on" />
          </div>
          <div className="panel__body">
            <dl className="readout" style={{ fontSize: 12.5, gap: '12px 14px' }}>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${identity.email}`}>{identity.email}</a>
              </dd>
              <dt>Phone</dt>
              <dd>{identity.phone}</dd>
              <dt>Based in</dt>
              <dd>Dehradun, India</dd>
              <dt>Timezone</dt>
              <dd>UTC+5:30</dd>
              <dt>Relocation</dt>
              <dd>Open</dd>
            </dl>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} SWAPNIL SINHA</span>
        <span>SELECTED WORK IS PLAYABLE ON THIS PAGE</span>
      </footer>
    </Section>
  )
}
