import React from 'react'
import { useLocalStore } from "mobx-react"

export const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    isTabbarInitialized: false,
    isTabbarShown: false,
    isTabbarLightTheme: true,
    activeTabbarTab: '',
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider
