import React, { useEffect, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton, Toast } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const CustomEvents = () => {
  const [data, setData] = useState(null)

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
      Toast.info('Successfully confirmed!')
    }).catch(() => {
      Toast.error('Confirmation rejected!')
    })
  }

  useEffect(() => {
    const listener = (event) => {
      if (!event.detail) {
        return
      }

      const { type, data: eventData } = event.detail

      if (type === 'AppBoxoWebAppCustomEvent') {
        setData(eventData)
      }
    }

    appboxoSdk.subscribe(listener)
    return () => {
      appboxoSdk.unsubscribe(listener)
    }
  }, [])

  return (
    <FeatureCard title="Sending custom events">
      <SecondaryButton
        className="wrap-button"
        text="Send custom event to open notification"
        onClick={handleSendWithNoBody}
      />
      <SecondaryButton
        className="wrap-button"
        text="Send custom event to open notification with message"
        onClick={handleSend}
      />
      <SecondaryButton
        className="wrap-button"
        text="Send custom event to open confirmation"
        onClick={handleSendWithPromise}
      />
      <StatusLine
        label="Event type:"
        value={data && data.type ? data.type : ''}
      />
      <StatusLine
        label="Event payload:"
        value={data && data.payload ? JSON.stringify(data.payload) : ''}
      />
    </FeatureCard>
  )
}

export default CustomEvents
