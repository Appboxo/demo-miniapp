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
  const [isTabbarShown, setIsTabbarShown] = useState(false)
  const [isLightTheme, setIsLightTheme] = useState(true)
  const [isInit, setIsInit] = useState(false)
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
      action: 'AppBoxoWebAppSetTabBar',
      message: 'called for three tabs'
    })
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show: true,
      activeTab: TABS[0].tabId,
      list: TABS,
      options: {
        iconColor: '#2eb8da',
        selectedIconColor: '#2eb8da',
        background: '#ffffff',
        textColor: '#000000',
        selectedTextColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#2eb8da'
      }
    })
    setIsInit(true)
    setIsTabbarShown(true)
  }

  const handleChangeToDark = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      options: {
        iconColor: '#ffffff',
        selectedIconColor: '#2eb8da',
        background: '#000000',
        textColor: '#ffffff',
        selectedTextColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#000000'
      }
    })

    setIsLightTheme(false)
  }

  const handleChangeToLight = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      options: {
        iconColor: '#2eb8da',
        selectedIconColor: '#2eb8da',
        background: '#ffffff',
        textColor: '#000000',
        selectedTextColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#2eb8da'
      }
    })

    setIsLightTheme(true)
  }

  const handleVisibility = (show: boolean) => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show
    })

    setIsTabbarShown(show)
  }

  return (
    <>
      <Card
        title="TabBar"
      >
        {!isInit ? (
          <Button
            size="large"
            block
            onClick={initTabBar}
          >Initialize native bottom tab bar</Button>
        ) : (
          <>
            {isTabbarShown ? (
              <Button
                size="large"
                block
                onClick={() => handleVisibility(false)}
              >Hide tab bar</Button>
            ) : (
              <Button
                size="large"
                block
                onClick={() => handleVisibility(true)}
              >Show tab bar</Button>
            )}
            {isLightTheme ? (
              <Button
                size="large"
                block
                onClick={handleChangeToDark}
              >Change to dark theme</Button>
            ) : (
              <Button
                size="large"
                block
                onClick={handleChangeToLight}
              >Change to light theme</Button>
            )}
            {isTabbarShown && (
              <>
                <Text type="secondary">Active tab name: </Text>
                <Text type="warning">{activeTab || 'TabBar is not active'}</Text>
              </>
            )}
          </>
        )}
      </Card>
    </>
  )
}

export default TabBar
