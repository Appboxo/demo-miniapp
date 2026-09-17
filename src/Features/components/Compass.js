import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import JsonPreview from '../../components/JsonPreview'

const Compass = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState(null)
  const startCompasss = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStartCompass')

    console.log(response)
    setIsStarted(true)
  }

  const stopCompass = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStopCompass')

    console.log(response)
    setIsStarted(false)
  }

  useEffect(() => {
     const compassSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOnCompassChange') {
        setData(data)
      }
    }

    appboxoSdk.subscribe(compassSubscription)
    return () => {
      appboxoSdk.unsubscribe(compassSubscription)
    }
  }, [])

  return (
    <FeatureCard title="Compass">
      {isStarted ? (
        <SecondaryButton className="wrap-button" text="Stop" onClick={stopCompass} />
      ) : (
        <SecondaryButton className="wrap-button" text="Start" onClick={startCompasss} />
      )}
      {data ? (
        <JsonPreview data={data} />
      ) : (
        <StatusLine label="Data:" />
      )}
    </FeatureCard>
  )
}

export default Compass
