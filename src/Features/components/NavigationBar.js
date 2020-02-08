import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'
import LoggerContext from '../../LoggerContext.js'

const NavigationBar = () => {
  const { updateLogs } = React.useContext(LoggerContext)

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

  return (
    <Card
      title="NavigationBar"
    >
      <Button
        size="large"
        block
        onClick={showDarkNavBar}
      >Show dark navigation bar</Button>
      <Button
        size="large"
        block
        onClick={showLightNavBar}
      >Show light navigation bar</Button>
      <Button
        size="large"
        block
        onClick={changeNavBarTitle}
      >Change navigation bar title</Button>
      <Button
        size="large"
        block
        onClick={hideNavBar}
      >Hide navigation bar</Button>
    </Card>
  )
}

export default NavigationBar
