import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'

const AIRALO_ID = 'id28'

const Miscellaneous = () => {
  const openAiralo = () => {
    appboxoSdk.send('AppBoxoWebAppOpenMiniApp', {
      app_id: AIRALO_ID
    })
  }

  return (
    <Card
      title="Miscellaneous"
    >
      <Button
        size="large"
        block
        onClick={openAiralo}
      >Open miniapp Airalo</Button>
    </Card>
  )
}

export default Miscellaneous
