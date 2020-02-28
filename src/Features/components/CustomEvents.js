import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, message } from 'antd'

const CustomEvents = () => {
  const handleSend = () => {
    appboxoSdk.send('AppBoxoWebAppCustomEvent', {
      type: 'my_custom_event_to_open_notification',
      payload: {
        message: 'Hey, this is coming from custom event!'
      }
    })
  }

  const handleSendWithNoBody = () => {
    appboxoSdk.send('AppBoxoWebAppCustomEvent', {
      type: 'my_custom_event_to_open_notification_with_no_body',
    })
  }

  const handleSendWithPromise = () => {
    appboxoSdk.sendPromise('AppBoxoWebAppCustomEvent', {
      type: 'my_custom_event_to_open_confirm',
      payload: {
        message: 'Hey, this is coming from custom event!'
      }
    }).then(() => {
      message.success('Successfully confirmed!');
    }).catch(() => {
      message.error('Confirmation rejected!');
    })
  }

  return (
    <Card
      title="Sending custom events"
    >
      <Button
        size="large"
        block
        onClick={handleSendWithNoBody}
        className="wrap-button"
      >Send custom event to open notification</Button>
      <Button
        size="large"
        block
        onClick={handleSend}
        className="wrap-button"
      >Send custom event to open notification with message</Button>
      <Button
        size="large"
        block
        onClick={handleSendWithPromise}
        className="wrap-button"
      >Send custom event to open confirmation</Button>
    </Card>
  )
}

export default CustomEvents
