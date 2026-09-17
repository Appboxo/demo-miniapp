import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const ALERT_BUTTONS = [
  {
    id: 1,
    text: 'Cancel',
    role:'destructive'
  },
  {
    id: 2,
    text: 'Ok'
  }
]

const Alert = () => {
  const [response, setResponse] = useState('')

  const showAlert = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppShowAlert', {
      header: 'Native alert',
      message: 'This is a native alert box.',
      buttons: ALERT_BUTTONS
    })

    const selectedButton = ALERT_BUTTONS.find(item => item.id === data.id)
    setResponse(selectedButton.text)
  }

  return (
    <FeatureCard title="Alert">
      <SecondaryButton text="Show alert" onClick={showAlert} />
      <StatusLine label="Response:" value={response} />
    </FeatureCard>
  )
}

export default Alert
