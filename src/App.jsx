import { useReveal } from './hooks/useReveal'
import { SoundProvider } from './components/SoundContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ChannelReels from './components/ChannelReels'
import Reel from './components/Reel'
import ShippedWork from './components/ShippedWork'
import UnderTheHood from './components/UnderTheHood'
import SoundLibrary from './components/SoundLibrary'
import MusicProduction from './components/MusicProduction'
import Process from './components/Process'
import CapturedWorks from './components/CapturedWorks'
import Experience from './components/Experience'
import Contact from './components/Contact'
import WorldBackdrop from './components/WorldBackdrop'
import AncientCursor from './components/AncientCursor'

function Page() {
  const root = useReveal()
  return (
    <SoundProvider>
      <div ref={root}>
        <WorldBackdrop />
        <AncientCursor />
        <Nav />
        <main>
          <Hero />
          <Reel />
          <ChannelReels />
          <ShippedWork />
          <UnderTheHood />
          <SoundLibrary />
          <MusicProduction />
          <Process />
          <CapturedWorks />
          <Experience />
          <Contact />
        </main>
      </div>
    </SoundProvider>
  )
}

export default function App() {
  return <Page />
}
