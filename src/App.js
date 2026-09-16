import React, { useEffect, useState } from 'react'

import appboxoSdk from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Button } from 'antd';

import Account from './Account/Account'
import Features from './Features/Features'
import Home from './Home/Home'
import Widget from './Widget/Widget'
import AuthContext from './AuthContext'
import LoggerContext from './LoggerContext'
import Logs from './components/Logs'
import StoreProvider from './StoreContext'

const setWidgetChrome = (expanded) => {
  appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
    show: expanded
  })
}

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [logsVisibility, setLogsVisibility] = useState(false)
  const [logs, setLogs] = useState([])
  const [expanded, setExpanded] = useState(true)

  const updateLogs = (newLog) => {
    setLogs((currentLogs) => [...currentLogs, newLog])
  }

  const applyExpanded = (nextExpanded) => {
    setExpanded(nextExpanded)
    setWidgetChrome(nextExpanded)
  }

  useEffect(() => {
    document.body.classList.toggle('widget-mode', !expanded)
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

    // Set status bar color
    appboxoSdk.send('AppBoxoWebAppSetStatusBarColor', {
      color: '#ffffff'
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
      }
    ]
    setLogs([...logs, ...currentLogs])

    return () => {
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
        updateLogs
      }}>
        {!expanded && <Widget onExpand={applyExpanded} />}
        {expanded && !logsVisibility && (
          <Button
            type="dashed"
            size="small"
            className="show-logs-button"
            onClick={() => setLogsVisibility(true)}
          >Show Logs</Button>
        )}
        <div style={{ display: expanded ? 'block' : 'none', height: '100%' }}>
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
        {expanded && logsVisibility && <Logs logs={logs} onClose={() => setLogsVisibility(false)}/>}
      </LoggerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
