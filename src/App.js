import React, { useEffect, useState } from 'react'

import appboxoSdk from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Account from './Account/Account.js'
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
      {!logsVisibility && <button className="show-logs-button" onClick={() => setLogsVisibility(true)}>Show Logs</button>}
      <LoggerContext.Provider value={{
        updateLogs
      }}>
        <Router>
          <Switch>
            <Route path="/account">
              <Account />
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
