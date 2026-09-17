import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState('')

  const getSystemInfo = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo');

    setSystemInfo(JSON.stringify(data))
  };

  return (
    <FeatureCard title="System information">
      <SecondaryButton text="Get system info" onClick={getSystemInfo} />
      <StatusLine label="System data:">
        {systemInfo && <div className="code-block">{systemInfo}</div>}
      </StatusLine>
    </FeatureCard>
  )
}

export default SystemInfo
