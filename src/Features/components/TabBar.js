import React, { useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import { useObserver } from "mobx-react"
import LoggerContext from '../../LoggerContext'
import { StoreContext, TABS } from '../../StoreContext'

const { Text } = Typography;

const TabBar = () => {
  const { updateLogs } = React.useContext(LoggerContext)
  const store = React.useContext(StoreContext)

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
        // Store active tab to preserve active tab value
        window.localStorage.setItem('activeTab', data.tabId)

        const active = TABS.find(item => item.tabId === data.tabId)
        store.activeTabbarTab = active.tabName
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
      activeTab: store.activeTabbarTab,
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
    store.isTabbarInitialized = true
    store.isTabbarShown = true
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

    store.isTabbarLightTheme = false
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

    store.isTabbarLightTheme = true
  }

  const handleVisibility = (show: boolean) => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show
    })

    store.isTabbarShown = show
  }

  const handleShowTabItemBadges = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      badges: [
        {
          tabId: 12,
          background: '#ff0000',
          color: '#ffffff',
          value: '4'
        },
        {
          tabId: 1234,
          background: '#00FF00',
          color: '#ffffff'
        }
      ]
    })
  }

  return useObserver(() => (
    <Card
      title="TabBar"
    >
      {!store.isTabbarInitialized ? (
        <Button
          size="large"
          block
          onClick={initTabBar}
        >Initialize native bottom tab bar</Button>
      ) : !store.isTabbarShown ? (
        <Button
          size="large"
          block
          onClick={() => handleVisibility(true)}
        >Show tab bar</Button>
      ) : (
        <>
          <Button
            size="large"
            block
            onClick={() => handleVisibility(false)}
          >Hide tab bar</Button>
          {store.isTabbarLightTheme ? (
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
          <Button
            size="large"
            block
            onClick={handleShowTabItemBadges}
          >Show tab item badges</Button>
          {store.isTabbarShown && (
            <>
              <Text type="secondary">Active tab name: </Text>
              <Text type="warning">{store.activeTabbarTab || 'Home'}</Text>
            </>
          )}
        </>
      )}
    </Card>
  ))
}

export default TabBar
