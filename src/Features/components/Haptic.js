import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'

const Haptic = () => {
  const vibrate = (style) => {
    appboxoSdk.send('AppBoxoWebAppVibrate', {
      style
    })
  }

  return (
    <FeatureCard title="Haptic feedback">
      <SecondaryButton text="Light vibrate" onClick={() => vibrate('light')} />
      <SecondaryButton text="Medium vibrate" onClick={() => vibrate('medium')} />
      <SecondaryButton text="Heavy vibrate" onClick={() => vibrate('heavy')} />
    </FeatureCard>
  )
}

export default Haptic
