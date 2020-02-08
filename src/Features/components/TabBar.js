import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import LoggerContext from '../../LoggerContext.js'

const { Text } = Typography;

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

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('')
  const { updateLogs } = React.useContext(LoggerContext)

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

  return (
    <>
      <Card
        title="TabBar"
      >
        <Button
          size="large"
          block
          onClick={initTabBar}
        >Initialize bottom tab bar</Button>
        <Button
          size="large"
          block
          onClick={() => appboxoSdk.send('AppBoxoWebAppShowTabBar')}
        >Show tab bar</Button>
        <Button
          size="large"
          block
          onClick={() => appboxoSdk.send('AppBoxoWebAppHideTabBar')}
        >Hide tab bar</Button>

        <Text type="secondary">Active tab name: </Text><Text type="warning">{activeTab || 'TabBar is not active'}</Text>
      </Card>
    </>
  )
}

export default TabBar
