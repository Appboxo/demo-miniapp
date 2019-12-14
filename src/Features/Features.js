import React, { useState, useEffect } from 'react';
import appboxoSdk from '@appboxo/js-sdk'
import { useHistory } from 'react-router-dom';
import LoggerContext from '../LoggerContext.js'

import './Features.scss'

const AIRALO_ID = 'id28'

const TABS = [
  {
    tabId: 12,
    tabName: 'Home',
    tabIcon: `${document.location.origin}/img/home-icon.png`
  },
  {
    tabId: 123,
    tabName: 'About',
    tabIcon: `${document.location.origin}/img/info-icon.png`
  },
  {
    tabId: 1234,
    tabName: 'Services',
    tabIcon: `${document.location.origin}/img/service-icon.png`
  }
]

const Features = (props) => {
  const [activeTab, setActiveTab] = useState('-')
  const { updateLogs } = React.useContext(LoggerContext)
  let history = useHistory();

  const tabClickListener = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppBottomTabClick') {
      updateLogs({
        action: 'AppBoxoWebAppBottomTabClick',
        message: 'received',
        data: data
      })

      if (data.tabId) {
        const active = TABS.find(item => item.tabId === data.tabId)
        setActiveTab(active.tabName)
      }
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(tabClickListener)

    return () => {
      appboxoSdk.unsubscribe(tabClickListener)
    }
  }, [])

  const handleGoBack = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to home'
    })
    history.push('/');
  }

  const initTabs = () => {
    updateLogs({
      action: 'AppBoxoWebAppInitBottomTabs',
      message: 'called for three tabs'
    })
    appboxoSdk.send('AppBoxoWebAppInitBottomTabs', TABS)
  }

  const openAiralo = () => {
    appboxoSdk.send('AppBoxoWebAppOpenMiniApp', {
      app_id: AIRALO_ID
    })
  }

  return (
    <section className="pane features">
      <div>
        <h1>Features</h1>
        <div className="feature">
          <h3>Tabs</h3>
          <button className="button button-light" onClick={initTabs}>Initialize bottom tabs</button>
          <button className="button button-light" onClick={() => appboxoSdk.send('AppBoxoWebAppShowBottomTabs')}>Show tabs</button>
          <button className="button button-light" onClick={() => appboxoSdk.send('AppBoxoWebAppHideBottomTabs')}>Hide tabs</button>

          <p>
            Active tab name: <strong>{activeTab}</strong>
          </p>
        </div>
        <div className="feature">
          <h3>Open other miniapp</h3>
          <button className="button button-light" onClick={openAiralo}>Open Airalo</button>
        </div>
      </div>
      <div>
        <button className="button button-light" onClick={handleGoBack}>Go back</button>
      </div>
    </section>
  )
}

export default Features
