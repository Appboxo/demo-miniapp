import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext.js'

const NavigationBar = () => {
  const { updateLogs } = React.useContext(LoggerContext)
  const [isLight, setIsLight] = useState(false)

  const showLightNavBar = () => {
    setIsLight(true)
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with light color options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Light nav bar',
      backButton: true,
      background: '#ffffff',
      frontColor: '#000000',
      isBackgroundTransparent: false,
      frontColorWhenTransparent: '#000000',
      changeBackgroundOnScroll: false,
      show: true
    })
  }

  const showDarkNavBar = () => {
    setIsLight(false)
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with dark color options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Dark nav bar',
      backButton: true,
      background: '#012d38',
      frontColor: '#ffffff',
      isBackgroundTransparent: false,
      frontColorWhenTransparent: '#ffffff',
      changeBackgroundOnScroll: false,
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
      show: false,
      ...(!isLight && {
        background: '#ffffff',
        frontColor: '#000000'
      })
    })
  }

  const handleTransparentNavbar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with transparent bg options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Nav bar with no initial background',
      backButton: true,
      background: '#000000',
      frontColor: '#ffffff',
      isBackgroundTransparent: true,
      frontColorWhenTransparent: '#000000',
      changeBackgroundOnScroll: true,
      show: true
    })
  }

  return (
    <FeatureCard title="NavigationBar">
      <SecondaryButton text="Show dark navigation bar" onClick={showDarkNavBar} />
      <SecondaryButton text="Show light navigation bar" onClick={showLightNavBar} />
      <SecondaryButton
        className="wrap-button"
        text="Show navigation bar with transparent background"
        onClick={handleTransparentNavbar}
      />
      <SecondaryButton text="Change navigation bar title" onClick={changeNavBarTitle} />
      <SecondaryButton text="Hide navigation bar" onClick={hideNavBar} />
    </FeatureCard>
  )
}

export default NavigationBar
