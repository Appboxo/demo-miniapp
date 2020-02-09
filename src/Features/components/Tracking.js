import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Alert, message } from 'antd'

const Tracking = () => {
  const [clickCount, setClickCount] = useState(0)
  const [error, setError] = useState(null)
  const [isLoadingClick, setIsLoadingClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickTracking = async () => {
    setIsLoadingClick(true)
    try {
      await appboxoSdk.track({
        app_id: +localStorage.getItem('app_id'),
        client_id: +localStorage.getItem('client_id'),
        action: 'click',
        payload: {
          btnName: 'login'
        }
      })
      setClickCount(clickCount + 1)
      message.success('Successfully sent!');
    } catch (error) {
      setError(error)
    }
    setIsLoadingClick(false)
  }

  const handleTransactionTracking = async () => {
    setIsLoading(true)
    try {
      await appboxoSdk.track({
        app_id: +localStorage.getItem('app_id'),
        client_id: +localStorage.getItem('client_id'),
        hostapp_id: null,
        action: 'transaction',
        payload: {
          shipping: 5,
          tax: 0.57,
          discount: 2.25,
          currency_code: 'USD',
          customer: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'jdoe@domain.com',
            ip_address: '234.192.4.75'
          },
          items: [
            {
              name: 'Product',
              description: 'test',
              price: 8.80,
              amount: 1,
              total: 8.80
            }
          ]
        }
      })

      message.success('Successfully sent!');
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  const handleClose = () => {
    setError(null)
  };

  return (
    <Card
      title="Event tracking"
    >
      {error && <Alert
        message="Error sending"
        description={`${JSON.stringify(error)}`}
        type="error"
        closable
        afterClose={handleClose}
      />}

      <Button
        size="large"
        block
        loading={isLoadingClick}
        onClick={handleClickTracking}
      >{isLoadingClick ? 'Sending...' : `Send click tracking event (${clickCount})`}</Button>
      <Button
        size="large"
        block
        loading={isLoading}
        onClick={handleTransactionTracking}
      >{isLoading ? 'Sending...' : 'Send transaction tracking event'}</Button>
    </Card>
  )
}

export default Tracking
