import { Section, ModuleHeader, Chips } from './ui'

const stories = [
  {
    title: 'THE CODEBREAKERS',
    role: ['Sound Designer', 'Technical Sound Designer', 'Music Composer'],
    heading: 'From designed assets to gameplay-driven audio systems.',
    body: 'I worked closely with the lead developer to connect FMOD events to gameplay through C# in Unity.',
    note: 'Audio logic developed alongside the lead programmer.',
    path: 'FMOD → UNITY → C# EVENT LOGIC',
  },
  {
    title: 'BATTLEBUCKS',
    role: ['Sound Designer', 'Composer'],
    heading: 'One platform, distinct sonic identities.',
    body: 'I design and compose for the hypercasual titles, then work directly with developers so sounds trigger and behave correctly in Unity.',
    path: 'DESIGN → COMPOSE → UNITY',
  },
  {
    title: 'MOLOTOV FLIP',
    role: ['Sound Designer', 'Music Composer'],
    heading: 'Defining the sound before the visuals were final.',
    body: 'The game was still being developed, so the early audio direction came from conversations. I translated verbal references into a sound and musical direction before everything existed visually.',
    path: 'VERBAL BRIEF → SOUND DIRECTION → GAME',
  },
]
export default function ProjectStories() {
  return (
    <Section id="project-stories">
      <ModuleHeader
        id="07 / PROJECT NOTES"
        title="THREE WAYS OF WORKING"
        sub="Implementation, teamwork and finding a direction while the game is still taking shape."
      />
      <div className="story-grid">
        {stories.map((s) => (
          <article key={s.title} data-reveal>
            <span className="field-label">{s.path}</span>
            <h3>{s.title}</h3>
            <h4>{s.heading}</h4>
            <p>{s.body}</p>
            {s.note && <p className="human-note">{s.note}</p>}
            <Chips items={s.role} />
          </article>
        ))}
      </div>
    </Section>
  )
}
