import { Section, ModuleHeader } from './ui'
import { identity, links } from '../data/site'
import { assetPath } from '../utils/assets'

export default function Contact() {
  return (
    <Section id="contact">
      <ModuleHeader
        id="12 / CONTACT"
        title="LET’S BUILD SOMETHING THAT SOUNDS ALIVE."
        status="DIRECT CONTACT"
      />

      <div className="contact">
        <div data-reveal>
          <p className="contact__pitch">Available for game audio and technical sound design.</p>

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
            <span>DIRECT / PROFILE</span>
            <span className="led led--on" />
          </div>
          <div className="panel__body contact-profile">
            <img
              className="contact-profile__avatar"
              src={assetPath('media/contact-operator-avatar.jpg')}
              alt="Animated 3D audio operator wearing a waveform visor"
            />
            <dl className="readout contact-profile__details">
              <dt>Name</dt>
              <dd>{identity.name}</dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${identity.email}`}>{identity.email}</a>
              </dd>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${identity.phone.replace(/\s/g, '')}`}>{identity.phone}</a>
              </dd>
              <dt>LinkedIn</dt>
              <dd>
                <a href={links.linkedin} target="_blank" rel="noreferrer noopener">
                  linkedin.com/in/swapnil-sinha-a283472a5
                </a>
              </dd>
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
