import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext'

const CloseMiniApp = () => {
  const { updateLogs } = React.useContext(LoggerContext) || {}

  const handleClose = () => {
    if (updateLogs) {
      updateLogs({
        action: 'AppBoxoWebAppCloseMiniApp',
        message: 'request sent'
      })
    }
    appboxoSdk.send('AppBoxoWebAppCloseMiniApp')
  }

  return (
    <FeatureCard title="Close miniapp">
      <SecondaryButton
        className="wrap-button"
        text="Close current miniapp"
        onClick={handleClose}
      />
    </FeatureCard>
  )
}

export default CloseMiniApp
