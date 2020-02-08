import React, { useEffect, useState } from 'react'

import appboxoSdk from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Button } from 'antd';

import Account from './Account/Account.js'
import Features from './Features/Features.js'
import Home from './Home/Home.js'
import AuthContext from './AuthContext.js'
import LoggerContext from './LoggerContext.js'
import Logs from './components/Logs.js'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [logsVisibility, setLogsVisibility] = useState(false)
  const [logs, setLogs] = useState([])

  const updateLogs = (newLog) => {
    setLogs([...logs, newLog])
  }

  useEffect(() => {
    // Get initial app data
    appboxoSdk.getInitData()
      .then((appData) => {
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
  }, [])

  return (
    <AuthContext.Provider value={{
      loginStatus,
      setLoginStatus
    }}>
      {!logsVisibility && (
        <Button
          type="dashed"
          size="small"
          className="show-logs-button"
          onClick={() => setLogsVisibility(true)}
        >Show Logs</Button>
      )}
      <LoggerContext.Provider value={{
        updateLogs
      }}>
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
      </LoggerContext.Provider>
      {logsVisibility && <Logs logs={logs} onClose={() => setLogsVisibility(false)}/>}
    </AuthContext.Provider>
  );
}

export default App;
