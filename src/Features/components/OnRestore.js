import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const OnRestore = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
     const onRestoreSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type } = event.detail

      if (type === 'AppBoxoWebAppOnRestore') {
        setData(`Miniapp is restored on: ${new Date()}`)
      }
    }

    appboxoSdk.subscribe(onRestoreSubscription)
    return () => {
      appboxoSdk.unsubscribe(onRestoreSubscription)
    }
  }, [])

  return (
    <FeatureCard title="Miniapp on restore">
      <StatusLine label="Status:" value={data ? 'Restored' : ''} />
      {data && (
        <StatusLine label="When:" value={data.replace('Miniapp is restored on: ', '')} />
      )}
    </FeatureCard>
  )
}

export default OnRestore
