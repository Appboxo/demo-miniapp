import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import JsonPreview from '../../components/JsonPreview'

const Gyroscope = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState(null)
  const startGyroscope = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStartGyroscope', {
      interval: 200
    })

    console.log(response)
    setIsStarted(true)
  }

  const stopGyroscope = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStopGyroscope')

    console.log(response)
    setIsStarted(false)
  }

  useEffect(() => {
     const gyroscopeSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOnGyroscopeChange') {
        setData(data)
      }
    }

    appboxoSdk.subscribe(gyroscopeSubscription)
    return () => {
      appboxoSdk.unsubscribe(gyroscopeSubscription)
    }
  }, [])

  return (
    <FeatureCard title="Gyroscope">
      {isStarted ? (
        <SecondaryButton className="wrap-button" text="Stop" onClick={stopGyroscope} />
      ) : (
        <SecondaryButton className="wrap-button" text="Start" onClick={startGyroscope} />
      )}
      {data ? (
        <JsonPreview data={data} />
      ) : (
        <StatusLine label="Data:" />
      )}
    </FeatureCard>
  )
}

export default Gyroscope
