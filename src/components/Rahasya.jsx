import { Section, ModuleHeader, Chips } from './ui'
import { featuredProject } from '../data/projects'
import { assetPath } from '../utils/assets'

export default function Rahasya() {
  const p = featuredProject
  return (
    <Section id="rahasya">
      <ModuleHeader
        id="05 / FEATURED PROJECT"
        title="RAHASYA"
        sub="Making the player nervous before anything actually happens."
        status="PC / HORROR PUZZLE"
      />
      <div className="case" data-reveal>
        <div className="case__hero">
          <img
            src={assetPath('media/rahasya-capsule.jpg')}
            alt="Rahasya official cover artwork"
            loading="lazy"
          />
          <div className="case__heroText">
            <p>Sound Designer + Music Composer</p>
            <h3>{p.subtitle}</h3>
          </div>
        </div>
        <div className="case__blocks">
          <article>
            <span className="field-label">MY CONTRIBUTION</span>
            <p>
              I handled the audio from concept through implementation: sound design, original score,
              gameplay SFX, ambience, UI and dialogue.
            </p>
            <Chips
              items={[
                'Sound Design',
                'Original Score',
                'Gameplay SFX',
                'Ambience',
                'UI',
                'Dialogue',
              ]}
            />
          </article>
          <article>
            <span className="field-label">DYNAMIC AUDIO</span>
            <p>
              I built the FMOD systems and reverb zones in Unity, using audio to carry the threat in
              a horror game where the player cannot fight back.
            </p>
            <Chips items={['FMOD Implementation', 'Dynamic Audio', 'Reverb Zones', 'Unity']} />
          </article>
          <article>
            <span className="field-label">HOW IT WAS IMPLEMENTED</span>
            <ul>
              <li>FMOD events connected to gameplay in Unity.</li>
              <li>Reverb boundaries shaped around the haveli spaces.</li>
              <li>Creature and environmental cues used to communicate danger without a HUD.</li>
            </ul>
          </article>
          <article>
            <span className="field-label">SIDE QUEST</span>
            <p>
              <strong>The fun part:</strong> I had around six hours to finish the trailer audio.
            </p>
            <a className="text-link" href={p.href} target="_blank" rel="noreferrer noopener">
              OPEN PROJECT ↗
            </a>
          </article>
        </div>
      </div>
    </Section>
  )
}
