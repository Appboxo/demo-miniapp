import React, { useEffect, useState } from 'react'

import appboxoSdk from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { QuaternaryButton } from '@appboxo/ui-kit'
import Account from './Account/Account'
import Features from './Features/Features'
import Home from './Home/Home'
import Widget from './Widget/Widget'
import AuthContext from './AuthContext'
import LoggerContext from './LoggerContext'
import Logs from './components/Logs'
import StoreProvider from './StoreContext'

const CHROME_BACKGROUND = '#f7f7f7'

const setWidgetChrome = (expanded) => {
  appboxoSdk.send('AppBoxoWebAppSetStatusBarColor', {
    color: CHROME_BACKGROUND
  })
  appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
    show: expanded,
    background: CHROME_BACKGROUND,
    frontColor: '#000000'
  })
}

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [logsVisibility, setLogsVisibility] = useState(() => (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('debug') === '1'
  ))
  const [logs, setLogs] = useState([])
  const [expanded, setExpanded] = useState(null)

  const updateLogs = (newLog) => {
    setLogs((currentLogs) => [...currentLogs, newLog])
  }

  const applyExpanded = (nextExpanded) => {
    setExpanded(nextExpanded)
  }

  useEffect(() => {
    if (typeof expanded !== 'boolean') {
      return
    }

    document.body.classList.toggle('widget-mode', !expanded)
    setWidgetChrome(expanded)
  }, [expanded])

  useEffect(() => {
    console.log('Getting data')
    // Get initial app data
    appboxoSdk.getInitData()
      .then((appData) => {
        console.log('AppData: ', appData)
        setLoginStatus(Boolean(appData.token))

        updateLogs({
          action: 'AppBoxoWebAppGetInitData',
          message: 'response received',
          data: appData
        })
        localStorage.clear()
        localStorage.setItem('app_id', appData.app_id)
        localStorage.setItem('client_id', appData.client_id)
      })
      .catch((error) => {
        console.log('Error getting web app init data: ', error)

        updateLogs({
          action: 'AppBoxoWebAppGetInitData',
          message: 'request failed',
          data: error
        })
      })

    appboxoSdk.send('AppBoxoWebAppSetStatusBarColor', {
      color: CHROME_BACKGROUND
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      background: CHROME_BACKGROUND,
      frontColor: '#000000'
    })

    const systemInfoFallback = setTimeout(() => {
      setExpanded((current) => (current === null ? true : current))
    }, 800)

    appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo')
      .then((systemInfo) => {
        clearTimeout(systemInfoFallback)
        updateLogs({
          action: 'AppBoxoWebAppGetSystemInfo',
          message: 'response received',
          data: systemInfo
        })

        if (typeof systemInfo?.expanded === 'boolean') {
          applyExpanded(systemInfo.expanded)
        } else {
          applyExpanded(true)
        }
      })
      .catch((error) => {
        clearTimeout(systemInfoFallback)
        updateLogs({
          action: 'AppBoxoWebAppGetSystemInfo',
          message: 'request failed',
          data: error
        })
        applyExpanded(true)
      })

    const expandCollapseListener = (event) => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppExpand' || type === 'AppBoxoWebAppCollapse') {
        if (data && typeof data.expanded === 'boolean') {
          applyExpanded(data.expanded)
        }
        updateLogs({
          action: type,
          message: 'event received',
          data
        })
      }
    }

    appboxoSdk.subscribe(expandCollapseListener)

    const currentLogs = [
      {
        action: 'AppBoxoWebAppSetStatusBarColor',
        message: 'request sent'
      },
      {
        action: 'AppBoxoWebAppGetInitData',
        message: 'request sent'
      },
      {
        action: 'AppBoxoWebAppGetSystemInfo',
        message: 'request sent'
      }
    ]
    setLogs([...logs, ...currentLogs])

    return () => {
      clearTimeout(systemInfoFallback)
      appboxoSdk.unsubscribe(expandCollapseListener)
      document.body.classList.remove('widget-mode')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{
      loginStatus,
      setLoginStatus
    }}>
      <LoggerContext.Provider value={{
        updateLogs,
        openLogs: () => setLogsVisibility(true)
      }}>
        {expanded === false && <Widget onExpand={applyExpanded} />}
        {expanded === true && !logsVisibility && (
          <QuaternaryButton
            className="show-logs-button"
            text="Show Logs"
            inline
            onClick={() => setLogsVisibility(true)}
          />
        )}
        <div className={`app-main${expanded === true ? '' : ' app-main--hidden'}`}>
          <StoreProvider>
            <Router>
              <Switch>
                <Route path="/account">
                  <Account />
                </Route>
                <Route path="/features">
                  <Features />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </StoreProvider>
        </div>
        {expanded === true && logsVisibility && <Logs logs={logs} onClose={() => setLogsVisibility(false)}/>}
      </LoggerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
