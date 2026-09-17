import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'

const WindowBackground = () => {
  const changeBackground = () => {
    appboxoSdk.send('AppBoxoWebAppSetBackgroundColor', {
      color: '#2CBBD7'
    })
  }

  return (
    <FeatureCard title="Background color">
      <SecondaryButton
        className="wrap-button"
        text="Change window background"
        onClick={changeBackground}
      />
    </FeatureCard>
  )
}

export default WindowBackground
