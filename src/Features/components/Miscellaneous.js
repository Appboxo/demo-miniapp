import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'

const AIRALO_ID = 'app94302'

const Miscellaneous = () => {
  const openAiralo = () => {
    appboxoSdk.send('AppBoxoWebAppOpenMiniApp', {
      app_id: AIRALO_ID
    })
  }

  return (
    <FeatureCard title="Miscellaneous">
      <SecondaryButton text="Open miniapp Airalo" onClick={openAiralo} />
    </FeatureCard>
  )
}

export default Miscellaneous
