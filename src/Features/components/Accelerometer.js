import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import JsonPreview from '../../components/JsonPreview'

const Accelerometer = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState(null)
  const startAccelerometer = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStartAccelerometer', {
      interval: 200
    })

    console.log(response)
    setIsStarted(true)
  }

  const stopAccelerometer = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStopAccelerometer')

    console.log(response)
    setIsStarted(false)
  }

  useEffect(() => {
     const accelerometerSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOnAccelerometerChange') {
        setData(data)
      }
    }

    appboxoSdk.subscribe(accelerometerSubscription)
    return () => {
      appboxoSdk.unsubscribe(accelerometerSubscription)
    }
  }, [])

  return (
    <FeatureCard title="Accelerometer">
      {isStarted ? (
        <SecondaryButton className="wrap-button" text="Stop" onClick={stopAccelerometer} />
      ) : (
        <SecondaryButton className="wrap-button" text="Start" onClick={startAccelerometer} />
      )}
      {data ? (
        <JsonPreview data={data} />
      ) : (
        <StatusLine label="Data:" />
      )}
    </FeatureCard>
  )
}

export default Accelerometer
