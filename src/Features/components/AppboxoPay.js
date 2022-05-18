import React, { useContext, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography, Input, Divider } from 'antd'
import AuthContext from '../../AuthContext.js'
import LoggerContext from '../../LoggerContext.js'
const { Text } = Typography

const CREATE_ORDER_URL = 'https://demo-miniapp.appboxo.com/api/v1/create-order/'

const createNewOrder = async (appData, amount, currency) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const bodyRaw = JSON.stringify({
    order: {
      amount,
      currency,
    },
    client_id: appData.client_id,
    app_id: appData.app_id,
  })

  const requestOptions = {
    method: 'POST',
    headers,
    body: bodyRaw,
    redirect: 'follow',
  }

  const response = await fetch(CREATE_ORDER_URL, requestOptions).then((r) =>
    r.json()
  )

  return response
}

const AppboxoPay = () => {
  const { updateLogs } = useContext(LoggerContext)
  const { appData } = useContext(AuthContext)
  const [response, setResponse] = useState('')
  const [amount, setAmount] = useState(100)
  const [currency, setCurrency] = useState('PHP')
  const [isLoading, setIsLoading] = useState(false)

  const onPay = async () => {
    try {
      setIsLoading(true)

      updateLogs({
        action: 'REQUEST CREATE NEW ORDER',
        message: `request start with amount: ${amount}, currency: ${currency}.`,
      })

      const newOrderData = await createNewOrder(appData, amount, currency)

      if (!!newOrderData.error_code)
        throw new Error(
          `failed to create new order: ${JSON.stringify(newOrderData, null, 2)}`
        )

      updateLogs({
        action: 'RESPONSE CREATE NEW ORDER',
        message: 'response: ' + JSON.stringify(newOrderData, null, 2),
      })
      const transactionToken = newOrderData.order_payment_id
      const miniappOrderId = newOrderData.order_id

      updateLogs({
        action: 'START APPBOXO PAY',
        message:
          'with params: ' +
          JSON.stringify(
            {
              amount,
              currency,
              miniappOrderId,
              transactionToken,
              extraParams: {},
            },
            null,
            2
          ),
      })
      // const payResponse = await appboxoSdk.pay({
      //   amount,
      //   currency,
      //   miniappOrderId,
      //   transactionToken,
      // })

      const payResponse = await appboxoSdk.sendPromise('AppBoxoWebAppPay', {
        miniappOrderId,
        currency,
        amount,
        transactionToken,
      })

      // let subscriberFunction

      // const payResponse = await new Promise((res, rej) => {
      //   subscriberFunction = (event) => {
      //     if (event?.detail?.type === 'AppBoxoWebAppPay') {
      //       res(event.detail.data)
      //     }
      //   }
      //   appboxoSdk.subscribe(subscriberFunction)
      // })

      // appboxoSdk.unsubscribe(subscriberFunction)

      updateLogs({
        action: 'RESPONSE APPBOXO PAY',
        message: JSON.stringify(payResponse, null, 2),
      })

      setResponse(JSON.stringify(payResponse, null, 2))
    } catch (err) {
      updateLogs({
        action: 'ERROR APPBOXO PAY',
        message: JSON.stringify(err, null, 2),
      })

      setResponse(JSON.stringify(err))
    }
    setIsLoading(false)
  }

  return (
    <Card title="AppboxoPay">
      <Text type="secondary">Amount: </Text>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <Text type="secondary">Currency: </Text>
      <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
      <Divider />

      <Button size="large" block onClick={onPay} loading={isLoading}>
        Call AppboxoPay
      </Button>
      <Text type="secondary">Result: </Text>
      <Text type="warning">{response}</Text>
    </Card>
  )
}

export default AppboxoPay
