import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'
import { StoreContext } from '../../StoreContext'

const ActionButtons = () => {
  const store = React.useContext(StoreContext)

  const toggleActionButtonTheme = () => {
    store.isLightActionButtons = !store.isLightActionButtons
    appboxoSdk.send('AppBoxoWebAppSetActionButton', {
      isLight: store.isLightActionButtons
    })
  }

  return (
    <FeatureCard title="Action buttons">
      <SecondaryButton
        className="wrap-button"
        text="Toggle action buttons' theme"
        onClick={toggleActionButtonTheme}
      />
    </FeatureCard>
  )
}

export default ActionButtons
