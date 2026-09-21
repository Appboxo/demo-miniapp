import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ContextProvider from '@arco-design/mobile-react/esm/context-provider'
import appboxoSdk from '@appboxo/js-sdk'

export const ThemeContext = React.createContext({
  isDark: false
})

export const THEME_CHROME = {
  light: {
    background: '#f7f7f7',
    frontColor: '#000000'
  },
  dark: {
    background: '#000000',
    frontColor: '#ffffff'
  }
}

const THEME_EVENTS = new Set([
  'AppBoxoWebAppGetSystemInfo',
  'AppBoxoWebAppGetInitData',
  'AppBoxoWebAppGetMiniappSettings',
  'AppBoxoWebAppThemeChanged',
  'AppBoxoWebAppOnThemeChange',
  'AppBoxoWebAppSetTheme',
  'AppBoxoWebAppOnRestore'
])

const normalizeTheme = (value) => {
  if (value == null) {
    return null
  }

  const text = String(value).trim().toLowerCase()

  if (text === 'dark' || text === 'darkmode' || text === 'dark_mode') {
    return 'dark'
  }

  if (text === 'light' || text === 'lightmode' || text === 'light_mode') {
    return 'light'
  }

  if (text === 'system' || text === 'auto') {
    return 'system'
  }

  return null
}

const prefersDark = () => (
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia) &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
)

export const getPreferredDark = () => prefersDark()

export const extractThemePreference = (source) => {
  if (!source || typeof source !== 'object') {
    return null
  }

  const candidates = [
    source.systemUiMode,
    source.theme,
    source.appearance,
    source.colorScheme,
    source.color_scheme,
    source.uiMode,
    source.data?.systemUiMode,
    source.data?.theme,
    source.data?.appearance,
    source.miniapp_settings?.theme
  ]

  for (const candidate of candidates) {
    const theme = normalizeTheme(candidate)
    if (theme) {
      return theme
    }
  }

  return null
}

export const resolveIsDark = (source) => {
  const preference = extractThemePreference(source)

  if (preference === 'dark') {
    return true
  }
  if (preference === 'light') {
    return false
  }
  if (preference === 'system') {
    return prefersDark()
  }

  return null
}

export const applyDocumentTheme = (isDark) => {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.getElementById('root')
  if (root) {
    root.classList.toggle('arco-theme-dark', isDark)
  }

  document.documentElement.classList.toggle('theme-dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  if (document.body) {
    document.body.style.colorScheme = isDark ? 'dark' : 'light'
  }

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', isDark ? THEME_CHROME.dark.background : THEME_CHROME.light.background)
  }
}

export const applyNativeChrome = (isDark, { expanded } = {}) => {
  const chrome = isDark ? THEME_CHROME.dark : THEME_CHROME.light

  appboxoSdk.send('AppBoxoWebAppSetStatusBarColor', {
    color: chrome.background
  })
  appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
    ...(typeof expanded === 'boolean' ? { show: expanded } : {}),
    background: chrome.background,
    frontColor: chrome.frontColor
  })
  appboxoSdk.send('AppBoxoWebAppSetBackgroundColor', {
    color: chrome.background
  })
  appboxoSdk.send('AppBoxoWebAppSetActionButton', {
    isLight: isDark
  })
}

if (typeof document !== 'undefined') {
  applyDocumentTheme(getPreferredDark())
}

export const ThemeRoot = ({ children }) => {
  const [isDark, setIsDark] = useState(getPreferredDark)
  const hostPreferenceRef = useRef(null)

  useLayoutEffect(() => {
    applyDocumentTheme(isDark)
  }, [isDark])

  useEffect(() => {
    let cancelled = false

    const applyPreference = (preference) => {
      if (!preference || cancelled) {
        return
      }

      hostPreferenceRef.current = preference
      setIsDark(preference === 'system' ? prefersDark() : preference === 'dark')
    }

    const applyFromPayload = (payload) => {
      const preference = extractThemePreference(payload)
      if (preference) {
        applyPreference(preference)
      }
    }

    appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo')
      .then(applyFromPayload)
      .catch(() => {})

    appboxoSdk.getInitData()
      .then(applyFromPayload)
      .catch(() => {})

    const listener = (event) => {
      if (!event.detail) {
        return
      }

      const { type, data, appearance } = event.detail
      const payload = {
        ...(data && typeof data === 'object' ? data : {}),
        appearance
      }

      if (type === 'AppBoxoWebAppOnRestore') {
        appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo')
          .then(applyFromPayload)
          .catch(() => {})
      }

      if (THEME_EVENTS.has(type) || extractThemePreference(payload)) {
        applyFromPayload(payload)
      }
    }

    appboxoSdk.subscribe(listener)

    const media = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null

    const onMediaChange = (event) => {
      if (cancelled) {
        return
      }
      if (!hostPreferenceRef.current || hostPreferenceRef.current === 'system') {
        setIsDark(event.matches)
      }
    }

    if (media) {
      if (media.addEventListener) {
        media.addEventListener('change', onMediaChange)
      } else if (media.addListener) {
        media.addListener(onMediaChange)
      }
    }

    return () => {
      cancelled = true
      appboxoSdk.unsubscribe(listener)
      if (media) {
        if (media.removeEventListener) {
          media.removeEventListener('change', onMediaChange)
        } else if (media.removeListener) {
          media.removeListener(onMediaChange)
        }
      }
    }
  }, [])

  const value = useMemo(() => ({ isDark }), [isDark])

  return (
    <ThemeContext.Provider value={value}>
      <ContextProvider isDarkMode={isDark} darkModeSelector="">
        {children}
      </ContextProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeRoot
