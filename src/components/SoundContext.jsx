import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { assetPath } from '../utils/assets'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(false)
  const [notice, setNotice] = useState('')
  const activeMedia = useRef(null)
  const ambienceRef = useRef(null)
  const interfaceClickRef = useRef(null)
  const soundOnRef = useRef(false)

  const playInterfaceClick = useCallback(async () => {
    const source = interfaceClickRef.current
    if (!source || document.hidden) return false

    source.pause()
    source.currentTime = 0
    source.volume = 0.72
    try {
      await source.play()
      return true
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    const getInteractiveTarget = (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest('button, a[href], [role="button"]')
          : null
      if (
        !soundOnRef.current ||
        !target ||
        target.matches(':disabled, [aria-disabled="true"]') ||
        target.dataset.sonic === 'silent' ||
        target.dataset.sonic === 'manual'
      )
        return null
      return target
    }

    const handlePointerDown = (event) => {
      if (event.button !== 0 || !getInteractiveTarget(event)) return
      void playInterfaceClick()
    }
    const handleKeyboardClick = (event) => {
      if (event.detail !== 0 || !getInteractiveTarget(event)) return
      void playInterfaceClick()
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('click', handleKeyboardClick, true)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('click', handleKeyboardClick, true)
    }
  }, [playInterfaceClick])

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
      // A failed background metadata request can leave the media element in an
      // error state even though the file is healthy. A direct user action gets
      // one clean load before playback so transient preload failures recover.
      if (media.error) media.load()
      try {
        await media.play()
        return true
      } catch (error) {
        // A pending play promise is expected to abort when the visitor pauses or
        // changes tracks before buffering completes. Treat that as a state
        // transition, not a playback failure.
        if (error?.name === 'AbortError') return false
        if (activeMedia.current === media) activeMedia.current = null
        notify(
          error?.name === 'NotAllowedError'
            ? 'Your browser blocked playback. Press play once more to continue.'
            : 'Audio could not be played. Check your connection and try again.',
        )
        throw error
      }
    },
    [notify],
  )

  const toggleSound = useCallback(async () => {
    if (soundOn) {
      void playInterfaceClick()
      soundOnRef.current = false
      ambienceRef.current?.pause()
      if (activeMedia.current === ambienceRef.current) activeMedia.current = null
      setSoundOn(false)
      return
    }

    soundOnRef.current = true
    setSoundOn(true)
    const clickStarted = playInterfaceClick()
    const ambience = ambienceRef.current
    if (ambience && (!activeMedia.current || activeMedia.current.paused)) {
      ambience.volume = 0.22
      activeMedia.current = ambience
      void ambience.play().catch(() => {
        if (activeMedia.current === ambience) activeMedia.current = null
      })
    }

    const started = await clickStarted
    if (!started) notify('Interface sounds are on. Tap another button to retry audio.')
  }, [notify, playInterfaceClick, soundOn])

  const value = useMemo(
    () => ({ soundOn, requestPlay, toggleSound, notify }),
    [soundOn, requestPlay, toggleSound, notify],
  )
  return (
    <SoundContext.Provider value={value}>
      <audio
        ref={ambienceRef}
        src={assetPath('audio/mixing-mastering/sunsetz-cover.m4a')}
        preload="metadata"
        loop
        aria-hidden="true"
      />
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
