import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { assetPath } from '../utils/assets'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(false)
  const activeMedia = useRef(null)
  const ambienceRef = useRef(null)

  useEffect(() => {
    if (ambienceRef.current) ambienceRef.current.volume = 0.6
  }, [])

  const requestPlay = useCallback(async (media) => {
    if (activeMedia.current && activeMedia.current !== media) activeMedia.current.pause()
    activeMedia.current = media
    media.muted = false
    setSoundOn(true)
    await media.play()
  }, [])

  const toggleSound = useCallback(async () => {
    if (soundOn) {
      activeMedia.current?.pause()
      setSoundOn(false)
      return
    }

    const ambience = ambienceRef.current
    if (!ambience) return
    activeMedia.current?.pause()
    activeMedia.current = ambience
    ambience.volume = 0.6
    try {
      await ambience.play()
      setSoundOn(true)
    } catch {
      setSoundOn(false)
    }
  }, [soundOn])

  const value = useMemo(
    () => ({ soundOn, requestPlay, toggleSound }),
    [soundOn, requestPlay, toggleSound],
  )
  return (
    <SoundContext.Provider value={value}>
      <audio
        ref={ambienceRef}
        src={assetPath('audio/cigarettes-after-sex-sunsetz-cover.m4a')}
        preload="none"
        loop
      />
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  return useContext(SoundContext)
}
