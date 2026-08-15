import { Section, ModuleHeader } from './ui'

const stages = [
  ['01', 'REFERENCE', 'Agree on what the player needs to understand.'],
  ['02', 'RECORD / SOURCE', 'Collect material that fits the game.'],
  ['03', 'DESIGN', 'Layer, edit and shape the sound.'],
  ['04', 'IMPLEMENT', 'Connect it to gameplay states.'],
  ['05', 'PLAYTEST', 'Listen in context, not in solo.'],
  ['06', 'ITERATE', 'Tune with the team and the build.'],
  ['07', 'SHIP', 'Name, optimise and hand off cleanly.'],
]
export default function Process() {
  return (
    <Section id="process">
      <ModuleHeader
        id="08 / PROCESS"
        title="AUDIO WORKFLOW"
        sub="From gameplay intent to implementation and final build."
      />
      <ol className="process">
        {stages.map(([n, title, text]) => (
          <li key={n} data-reveal>
            <span>{n}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
