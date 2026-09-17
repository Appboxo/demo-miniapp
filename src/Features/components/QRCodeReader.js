import React, { useEffect, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const QRCodeReader = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const qrCodeSubscription = (event) => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOpenQRCodeReaderResult') {
        setCode(data.code_data)
        setError('')
      }

      if (type === 'AppBoxoWebAppOpenQRCodeReaderFailed') {
        setError(data.error_data)
        setCode('')
      }
    }

    appboxoSdk.subscribe(qrCodeSubscription)
    return () => {
      appboxoSdk.unsubscribe(qrCodeSubscription)
    }
  }, [])

  const openReader = () => {
    appboxoSdk.send('AppBoxoWebAppOpenQRCodeReader')
  }

  const result = error ? `Error: ${error}` : code
  const tone = error ? 'danger' : undefined

  return (
    <FeatureCard title="QR code reader">
      <SecondaryButton
        className="wrap-button"
        text="Open QR code reader"
        onClick={openReader}
      />
      <StatusLine
        label="QR code result:"
        value={result}
        tone={tone}
      />
    </FeatureCard>
  )
}

export default QRCodeReader
