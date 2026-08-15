import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { assetPath } from '../utils/assets'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(false)
  const [notice, setNotice] = useState('')
  const activeMedia = useRef(null)
  const interfaceClickRef = useRef(null)
  const clickVoicesRef = useRef([])

  const playInterfaceClick = useCallback(async () => {
    const source = interfaceClickRef.current
    if (!source || document.hidden) return false

    const voices = [source, ...clickVoicesRef.current]
    let click = voices.find((voice) => voice.paused || voice.ended)
    if (!click) {
      click = source.cloneNode()
      clickVoicesRef.current = [...clickVoicesRef.current.slice(-2), click]
    }

    click.currentTime = 0
    click.volume = 0.62
    try {
      await click.play()
      return true
    } catch {
      return false
    }
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

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
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
      } catch (error) {
        notify('Audio could not be played. Check your connection and try again.')
        throw error
      }
    },
    [notify],
  )

  const toggleSound = useCallback(async () => {
    if (soundOn) {
      void playInterfaceClick()
      setSoundOn(false)
      return
    }

    setSoundOn(true)
    const started = await playInterfaceClick()
    if (!started) notify('Interface sounds are on. Tap another button to retry audio.')
  }, [notify, playInterfaceClick, soundOn])

  const value = useMemo(
    () => ({ soundOn, requestPlay, toggleSound, notify }),
    [soundOn, requestPlay, toggleSound, notify],
  )
  return (
    <SoundContext.Provider value={value}>
      <audio
        ref={interfaceClickRef}
        src={assetPath('audio/ui/quest-interface-click.wav')}
        preload="auto"
        aria-hidden="true"
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
