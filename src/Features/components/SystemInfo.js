import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
const { Text } = Typography

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState('')

  const getSystemInfo = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo');

    setSystemInfo(JSON.stringify(data))
  };

  return (
    <Card
      title="System clipboard"
    >
      <Button
        size="large"
        block
        onClick={getSystemInfo}
      >Get system info</Button>
      <Text type="secondary">System data: </Text>
      <Text type="warning">{systemInfo}</Text>
    </Card>
  )
}

export default SystemInfo
