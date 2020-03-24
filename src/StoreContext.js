import React from 'react'
import { useLocalStore } from "mobx-react"

export const StoreContext = React.createContext()

export const TABS = [
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

const StoreProvider = ({ children }) => {
  const activeTabId = window.localStorage.getItem('activeTab') || TABS[0].tabId

  const store = useLocalStore(() => ({
    isTabbarInitialized: false,
    isTabbarShown: false,
    isTabbarLightTheme: true,
    activeTabbarTab: activeTabId,
    activeTabWithBadges: TABS.map(item => item.tabId),
    isLightActionButtons: false
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider
