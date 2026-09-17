import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const AppboxoPay = () => {
  const [response, setResponse] = useState('')

  const appboxoPaymentStatusHandler = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppPay') {
      setResponse(data.status)
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(appboxoPaymentStatusHandler)

    return () => {
      appboxoSdk.unsubscribe(appboxoPaymentStatusHandler)
    }
  }, [])

  const showGallery = () => {
    appboxoSdk.send('AppBoxoWebAppPay', {
      amount: 199.00,
      orderId: "TM121248847",
      currency: "USD",
      extraParams: {}
    })
  }

  return (
    <FeatureCard title="AppboxoPay">
      <SecondaryButton text="Call AppboxoPay" onClick={showGallery} />
      <StatusLine label="Result:" value={response} />
    </FeatureCard>
  )
}

export default AppboxoPay
