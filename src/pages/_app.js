import dynamic from 'next/dynamic'
import { Button } from 'antd'
import Logs from '../components/Logs'
import appboxoSdk from '@appboxo/js-sdk'
import React, { useState, useEffect } from 'react'
import LoggerContext from '../context/LoggerContext'
import AuthContext from '../context/AuthContext'

import '../../styles/globals.scss'

const StoreProvider = dynamic(() => import('../context/StoreContext').then(mod => mod.StoreProvider), { ssr: false })

function MyApp({ Component, pageProps }) {
  const [ loginStatus, setLoginStatus ] = useState(false)
  const [ logsVisibility, setLogsVisibility ] = useState(false)
  const [ logs, setLogs ] = useState([])

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
    setLogs([ ...logs, ...currentLogs ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLogs = (newLog) => {
    setLogs([ ...logs, newLog ])
  }

  return (
    <AuthContext.Provider value={{
      loginStatus,
      setLoginStatus
    }}>
      <LoggerContext.Provider value={{
        updateLogs
      }}>
        {!logsVisibility && (
          <Button
            size="small"
            type="dashed"
            className="show-logs-button"
            onClick={() => setLogsVisibility(true)}
          >
            Show Logs
          </Button>
        )}
        <StoreProvider>
          <Component {...pageProps} />
          {logsVisibility && <Logs logs={logs} onClose={() => setLogsVisibility(false)} />}
        </StoreProvider>
      </LoggerContext.Provider>
    </AuthContext.Provider>
  )
}

export default MyApp
