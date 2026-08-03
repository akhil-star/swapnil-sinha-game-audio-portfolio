import { useReveal } from './components/ui'

import Nav from './components/Nav'
import Hero from './components/Hero'
import CapturedWorks from './components/CapturedWorks'
import ShippedWork from './components/ShippedWork'
import Experience from './components/Experience'
import Contact from './components/Contact'

/**
 * Section order is deliberate and answers the hiring question in sequence:
 * can you make it → at what scale → what shipped → how do you think →
 * can I hear it → can you engineer it → can I try it → can you ship it →
 * who are you → how do I reach you.
 *
 * "About" sits near the bottom on purpose. Nobody hiring reads it first.
 */
function Page() {
  const root = useReveal()
  return (
    <div ref={root}>
      <Nav />
      <main>
        <Hero />
        <CapturedWorks />
        <ShippedWork />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default function App() {
  return <Page />
}
