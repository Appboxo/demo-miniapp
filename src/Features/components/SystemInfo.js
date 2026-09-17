import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import JsonPreview from '../../components/JsonPreview'

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null)

  const getSystemInfo = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo')
    setSystemInfo(data)
  }

  return (
    <FeatureCard title="System information">
      <SecondaryButton text="Get system info" onClick={getSystemInfo} />
      {systemInfo ? (
        <JsonPreview data={systemInfo} />
      ) : (
        <StatusLine label="System data:" />
      )}
    </FeatureCard>
  )
}

export default SystemInfo
