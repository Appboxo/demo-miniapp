import React, { useEffect, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Flex, Footnote1, Input, PrimaryButton, SecondaryButton, SubTitle, TextArea, Toast } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext'

const DEFAULT_PAYLOAD = '{\n  "message": "Hello from showcase"\n}'

const fieldValue = (first, second) => {
  if (typeof first === 'string') {
    return first
  }
  if (typeof second === 'string') {
    return second
  }
  return first?.target?.value ?? ''
}

const CustomEvents = () => {
  const { updateLogs } = React.useContext(LoggerContext) || {}
  const [data, setData] = useState(null)
  const [eventType, setEventType] = useState('')
  const [payloadText, setPayloadText] = useState(DEFAULT_PAYLOAD)
  const [payloadError, setPayloadError] = useState(false)

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

  const handleSendCustom = () => {
    const type = eventType.trim()

    if (!type) {
      Toast.error('Enter an event type')
      return
    }

    const raw = payloadText.trim()
    let payload

    if (raw) {
      try {
        payload = JSON.parse(raw)
        setPayloadError(false)
      } catch (error) {
        setPayloadError(true)
        Toast.error('Payload must be valid JSON')
        return
      }
    }

    const body = payload === undefined ? { type } : { type, payload }

    if (updateLogs) {
      updateLogs({
        action: 'AppBoxoWebAppCustomEvent',
        message: 'request sent',
        data: body
      })
    }

    appboxoSdk.send('AppBoxoWebAppCustomEvent', body)
    Toast.info('Custom event sent')
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
      <SubTitle color="var(--text-3, #8e8e93)">
        Send AppBoxoWebAppCustomEvent with any type string and optional JSON payload for the host app.
      </SubTitle>
      <Flex vertical gap={8}>
        <Footnote1>Type</Footnote1>
        <Input
          placeholder="any_string_identifier"
          value={eventType}
          onChange={(first, second) => setEventType(fieldValue(first, second))}
          onInput={(first, second) => setEventType(fieldValue(first, second))}
        />
      </Flex>
      <Flex vertical gap={8}>
        <Footnote1>Payload (JSON)</Footnote1>
        <TextArea
          placeholder={'{\n  "key": "value"\n}'}
          value={payloadText}
          hasError={payloadError}
          rows={4}
          onChange={(first, second) => {
            setPayloadError(false)
            setPayloadText(fieldValue(first, second))
          }}
          onInput={(first, second) => {
            setPayloadError(false)
            setPayloadText(fieldValue(first, second))
          }}
        />
      </Flex>
      <PrimaryButton
        className="wrap-button"
        text="Send custom event"
        onClick={handleSendCustom}
      />
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
