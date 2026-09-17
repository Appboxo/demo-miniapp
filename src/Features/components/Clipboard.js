import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const Clipboard = () => {
  const [clipboard, setClipboard] = useState('')
  const [status, setStatus] = useState('')

  const getClipboard = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppGetClipboard');

    setClipboard(response.data)
  };

  const setClipboardData = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppSetClipboard', {
      data: 'this is from clipboard'
    });

    setStatus(response.result ? 'Success' : 'Failed')
  }

  return (
    <FeatureCard title="System clipboard">
      <SecondaryButton text="Get clipboard data" onClick={getClipboard} />
      <StatusLine label="Clipboard:" value={clipboard} />
      <SecondaryButton text="Set clipboard" onClick={setClipboardData} />
      <StatusLine label="Status:" value={status} />
    </FeatureCard>
  )
}

export default Clipboard
