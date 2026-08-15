import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { assetPath } from '../utils/assets'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(false)
  const [notice, setNotice] = useState('')
  const activeMedia = useRef(null)
  const ambienceRef = useRef(null)
  const interfaceClickRef = useRef(null)

  const playInterfaceClick = useCallback(() => {
    const click = interfaceClickRef.current
    if (!click || document.hidden) return
    click.currentTime = 0
    click.volume = 0.34
    void click.play().catch(() => {})
  }, [])

  useEffect(() => {
    if (ambienceRef.current) ambienceRef.current.volume = 0.6
  }, [])

  useEffect(() => {
    if (!soundOn) return

    const handleClick = (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest('button, a[href], [role="button"]')
          : null
      if (
        !target ||
        target.matches(':disabled, [aria-disabled="true"]') ||
        target.dataset.sonic === 'silent' ||
        target.dataset.sonic === 'manual'
      )
        return
      playInterfaceClick()
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [playInterfaceClick, soundOn])

  useEffect(() => {
    if (!notice) return
    const timeout = setTimeout(() => setNotice(''), 5000)
    return () => clearTimeout(timeout)
  }, [notice])

  const notify = useCallback((message) => setNotice(message), [])

  const requestPlay = useCallback(
    async (media) => {
      if (activeMedia.current && activeMedia.current !== media) activeMedia.current.pause()
      activeMedia.current = media
      media.muted = false
      try {
        await media.play()
        setSoundOn(true)
      } catch (error) {
        setSoundOn(false)
        notify('Audio could not be played. Check your connection and try again.')
        throw error
      }
    },
    [notify],
  )

  const toggleSound = useCallback(async () => {
    if (soundOn) {
      playInterfaceClick()
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
      playInterfaceClick()
    } catch {
      setSoundOn(false)
      notify('Site audio could not be started. Check your browser permissions.')
    }
  }, [notify, playInterfaceClick, soundOn])

  const value = useMemo(
    () => ({ soundOn, requestPlay, toggleSound, notify }),
    [soundOn, requestPlay, toggleSound, notify],
  )
  return (
    <SoundContext.Provider value={value}>
      <audio
        ref={ambienceRef}
        src={assetPath('audio/cigarettes-after-sex-sunsetz-cover.m4a')}
        preload="none"
        loop
      />
      <audio
        ref={interfaceClickRef}
        src={assetPath('audio/ui/quest-interface-click.wav')}
        preload="auto"
      />
      {notice && (
        <div className="site-toast" role="alert" aria-live="assertive">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) throw new Error('useSound must be used inside SoundProvider')
  return context
}
