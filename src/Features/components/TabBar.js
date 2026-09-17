import React, { useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import { useObserver } from "mobx-react"
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext'
import { StoreContext, TABS } from '../../StoreContext'

const TAB_BADGES = [
  {
    tabId: 12,
    background: '#ff0000',
    color: '#ffffff',
    value: '4'
  },
  {
    tabId: 123,
    background: '#0000ff',
    color: '#ffffff',
    value: '12'
  },
  {
    tabId: 1234,
    background: '#00FF00',
    color: '#ffffff'
  }
]

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
        window.localStorage.setItem('activeTabId', data.tabId)

        const active = TABS.find(item => item.tabId === data.tabId)
        store.activeTabbarTabName = active.tabName

        if (store.isTabbarBadgesShown && store.activeTabWithBadges.length) {
          const restBadges = store.activeTabWithBadges.filter(id => id !== data.tabId)
          store.activeTabWithBadges = restBadges

          appboxoSdk.send('AppBoxoWebAppSetTabBar', {
            badges: TAB_BADGES.filter(item => restBadges.includes(item.tabId))
          })
        }
      }
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(tabClickListener)

    return () => {
      appboxoSdk.unsubscribe(tabClickListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initTabBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetTabBar',
      message: 'called for three tabs'
    })

    const active = TABS.find(item => item.tabName === store.activeTabbarTabName)

    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show: true,
      activeTab: active.tabId,
      list: TABS,
      options: {
        color: '#aaaaaa',
        background: '#ffffff',
        selectedColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#cccccc'
      }
    })
    store.isTabbarInitialized = true
    store.isTabbarShown = true
  }

  const handleChangeToDark = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      options: {
        color: '#ffffff',
        background: '#000000',
        selectedColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#000000'
      }
    })

    store.isTabbarLightTheme = false
  }

  const handleChangeToLight = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      options: {
        color: '#aaaaaa',
        background: '#ffffff',
        selectedColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#cccccc'
      }
    })

    store.isTabbarLightTheme = true
  }

  const handleVisibility = (show) => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show
    })

    store.isTabbarShown = show
  }

  const handleShowTabItemBadges = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      badges: TAB_BADGES
    })

    store.activeTabWithBadges = TABS.map(item => item.tabId)
    store.isTabbarBadgesShown = true
  }

  return useObserver(() => (
    <FeatureCard title="TabBar">
      {!store.isTabbarInitialized ? (
        <SecondaryButton
          className="wrap-button"
          text="Initialize native bottom tab bar"
          onClick={initTabBar}
        />
      ) : !store.isTabbarShown ? (
        <SecondaryButton text="Show tab bar" onClick={() => handleVisibility(true)} />
      ) : (
        <>
          <SecondaryButton text="Hide tab bar" onClick={() => handleVisibility(false)} />
          {store.isTabbarLightTheme ? (
            <SecondaryButton text="Change to dark theme" onClick={handleChangeToDark} />
          ) : (
            <SecondaryButton text="Change to light theme" onClick={handleChangeToLight} />
          )}
          <SecondaryButton text="Show tab item badges" onClick={handleShowTabItemBadges} />
          {store.isTabbarShown && (
            <StatusLine label="Active tab name:" value={store.activeTabbarTabName || 'Home'} />
          )}
        </>
      )}
    </FeatureCard>
  ))
}

export default TabBar
