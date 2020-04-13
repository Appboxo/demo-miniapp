// AppBoxoWebAppGetGeodata: { available: boolean | number; lat: string; long: string }

import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
const { Text } = Typography

const GeoData = () => {
  const [position, setPosition] = useState(null)

  const requestGeoposition = async () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })

    const data = await appboxoSdk.sendPromise('AppBoxoWebAppGetGeodata')

    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: false
    })

    setPosition({
      isAvailable: !!data.available,
      lat: parseFloat(data.lat),
      long: parseFloat(data.long)
    })
  }

  const formatPosition = () => {
    if (position) {
      return position.isAvailable ? `Lat: ${position.lat}, Long: ${position.long}` : 'Rejected'
    } else {
      return 'unknown'
    }
  }

  return (
    <Card
      title="Request geoposition"
    >
      <Button
        size="large"
        block
        onClick={requestGeoposition}
      >Request qeo position</Button>
      <Text type="secondary">Your geo position: </Text>
      <Text type="warning">{formatPosition()}</Text>
    </Card>
  )
}

export default GeoData
