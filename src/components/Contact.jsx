import { Section, ModuleHeader, Chips } from './ui'
import { identity, links } from '../data/site'

const VERBS = ['Design', 'Compose', 'Implement', 'Optimise', 'Profile', 'Ship']

export default function Contact() {
  return (
    <Section id="contact">
      <ModuleHeader
        id="07 / CONTACT"
        title="Building something players should remember?"
        status={identity.timezone.toUpperCase()}
      />

      <div className="contact">
        <div data-reveal>
          <p className="contact__pitch">
            I&apos;d love to help make it <em>sound alive.</em>
          </p>

          <div className="contact__verbs">
            <Chips items={VERBS} />
          </div>

          <p style={{ color: 'var(--dim)', maxWidth: '52ch', fontSize: 15 }}>
            {identity.availability}. I&apos;m happy to walk through the FMOD project behind any title
            above, compare notes on a feature, or take an implementation test.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
            <a className="btn btn--solid" href={`mailto:${identity.email}`}>
              Email me
            </a>
            <a className="btn" href={identity.resumePdf} download>
              Download resume
            </a>
            {links.linkedin && (
              <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
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
