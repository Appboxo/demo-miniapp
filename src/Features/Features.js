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
  const [clickCount, setClickCount] = useState(0)
  const { updateLogs } = React.useContext(LoggerContext)
  let history = useHistory();

  const tabClickListener = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppTabBarItemClick') {
      updateLogs({
        action: 'AppBoxoWebAppTabBarItemClick',
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

  const initTabBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppInitTabBar',
      message: 'called for three tabs'
    })
    appboxoSdk.send('AppBoxoWebAppInitTabBar', {
      list: TABS,
      options: {
        iconColor: '#2eb8da',
        selectedIconColor: '#2eb8da',
        background: '#ffffff',
        textColor: '#000000',
        selectedTextColor: '#2eb8da'
      }
    })
  }

  const showLightNavBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with light color options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Light nav bar',
      backButton: true,
      background: '#ffffff',
      frontColor: '#000000',
      show: true
    })
  }

  const showDarkNavBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with dark color options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Dark nav bar',
      backButton: true,
      background: '#012d38',
      frontColor: '#ffffff',
      show: true
    })
  }

  const changeNavBarTitle = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called to change title'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Custom title'
    })
  }

  const hideNavBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called to hide it'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      show: false
    })
  }

  const openAiralo = () => {
    appboxoSdk.send('AppBoxoWebAppOpenMiniApp', {
      app_id: AIRALO_ID
    })
  }

  const handleClickTracking = () => {
    appboxoSdk.track({
      app_id: +localStorage.getItem('app_id'),
      client_id: +localStorage.getItem('client_id'),
      action: 'click',
      payload: {
        btnName: 'login'
      }
    })
    setClickCount(clickCount + 1)
  }

  const handleTransactionTracking = () => {
    appboxoSdk.track({
      app_id: +localStorage.getItem('app_id'),
      client_id: +localStorage.getItem('client_id'),
      action: 'transaction',
      payload: {
        shipping: 5,
        tax: 0.57,
        discount: 2.25,
        currency_code: 'USD',
        customer: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'jdoe@domain.com',
          ip_address: '234.192.4.75'
        },
        items: [
          {
            name: 'Product',
            description: 'test',
            price: 8.80,
            amount: 1,
            total: 8.80
          }
        ]
      }
    })
  }

  return (
    <section className="pane features">
      <div>
        <h1>Features</h1>
        <div className="feature">
          <h3>NavigationBar</h3>
          <button className="button button-light" onClick={showDarkNavBar}>Show dark navigation bar</button>
          <button className="button button-light" onClick={showLightNavBar}>Show light navigation bar</button>
          <button className="button button-light" onClick={changeNavBarTitle}>Change navigation bar title</button>
          <button className="button button-light" onClick={hideNavBar}>Hide navigation bar</button>
        </div>
        <div className="feature">
          <h3>TabBar</h3>
          <button className="button button-light" onClick={initTabBar}>Initialize bottom tab bar</button>
          <button className="button button-light" onClick={() => appboxoSdk.send('AppBoxoWebAppShowTabBar')}>Show tab bar</button>
          <button className="button button-light" onClick={() => appboxoSdk.send('AppBoxoWebAppHideTabBar')}>Hide tab bar</button>

          <p>
            Active tab name: <strong>{activeTab}</strong>
          </p>
        </div>
        <div className="feature">
          <h3>Open other miniapp</h3>
          <button className="button button-light" onClick={openAiralo}>Open Airalo</button>
        </div>
        <div className="feature">
          <h3>Tracking</h3>
          <button className="button button-light" onClick={handleClickTracking}>Track click ({clickCount})</button>
          <button className="button button-light" onClick={handleTransactionTracking}>Track transaction</button>
        </div>
      </div>
      <div>
        <button className="button button-back" onClick={handleGoBack}>Go back</button>
      </div>
    </section>
  )
}

export default Features
