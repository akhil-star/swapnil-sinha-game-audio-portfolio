import { Section, ModuleHeader } from './ui'

const systems = [
  [
    'FMOD',
    'Dynamic music, event logic, bus processing and implementation for Rahasya and The CodeBreakers.',
  ],
  ['UNITY', 'Connecting audio behaviour to gameplay, then profiling and tuning it in the build.'],
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

const implementationMap = [
  ['PLAYER SURFACE', 'Footstep switch', 'Guard noise value'],
  ['ALERT LEVEL', 'Music layers', 'Intensity without a track swap'],
  ['TIME ABILITY', 'Bus pitch + filter', 'Freeze and rewind feedback'],
  ['HAVELI SPACE', 'Reverb zone', 'Courtyard and room transitions'],
]

export default function UnderTheHood() {
  return (
    <Section id="tech">
      <ModuleHeader
        id="05 / TECHNICAL AUDIO"
        title="UNDER THE HOOD"
        sub="Interactive systems that connect sound to gameplay."
        status="FMOD · UNITY · C#"
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
        <span>FMOD EVENT</span>
        <i>→</i>
        <span>UNITY BUILD</span>
      </div>
      <div className="implementation-evidence" data-reveal>
        <header>
          <span className="field-label">IMPLEMENTATION MAP</span>
          <p>Systems developed for Rahasya and The CodeBreakers.</p>
        </header>
        {implementationMap.map(([input, system, result]) => (
          <div key={input}>
            <strong>{input}</strong>
            <span>{system}</span>
            <span>{result}</span>
          </div>
        ))}
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
