import { Section, ModuleHeader } from './ui'

const systems = [
  [
    'AUDIO MIDDLEWARE (WWISE / FMOD)',
    'Audio implementation, event systems, adaptive audio, parameter-driven logic, routing, mixing, and runtime audio control.',
  ],
  [
    'UNITY & UNREAL',
    'Connecting audio behaviour to gameplay, then profiling and tuning it in the game build.',
  ],
  [
    'EVENTS + PARAMETERS',
    'Alert level, creature proximity, health and surface type drive changes the player can hear.',
  ],
  ['REVERB ZONES', 'Room and courtyard boundaries support the shape of Rahasya’s haveli.'],
  ['C#', 'Event hooks and gameplay-driven audio logic built alongside developers.'],
  [
    'GIT + ASSET HANDOFF',
    'Naming and source-control habits that let audio move with the rest of the team.',
  ],
]

export default function UnderTheHood() {
  return (
    <Section id="tech">
      <ModuleHeader
        id="05 / TECHNICAL AUDIO"
        title="UNDER THE HOOD"
        sub="Interactive systems that connect sound to gameplay."
        status="FMOD · WWISE · UNITY · UNREAL · C#"
      />
      <div
        className="signal-path"
        aria-label="Visual explanation of a game audio signal path"
        data-reveal
      >
        <span>GAME STATE</span>
        <i>→</i>
        <span>PARAMETER</span>
        <i>→</i>
        <span>EVENT</span>
        <i>→</i>
        <span>GAME BUILD</span>
      </div>
      <div className="tech-grid">
        {systems.map(([name, use]) => (
          <article key={name} data-reveal>
            <span className="field-label">{name}</span>
            <h3>Application</h3>
            <p>{use}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
