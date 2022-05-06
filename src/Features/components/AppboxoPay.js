import React, { useContext, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography, Input, Divider } from 'antd'
import AuthContext from '../../AuthContext.js'
const { Text } = Typography

const CREATE_ORDER_URL = 'https://demo-miniapp.appboxo.com/api/v1/create-order/'

const createNewOrder = async (appData, amount, currency) => {
  const body = {
    order: {
      amount,
      currency,
    },
    client_id: appData.client_id,
    app_id: appData.app_id,
  }
  const response = await fetch(CREATE_ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  }).then((r) => r.json())
  return response
}

const AppboxoPay = () => {
  const { appData } = useContext(AuthContext)
  const [response, setResponse] = useState('')
  const [amount, setAmount] = useState(100)
  const [currency, setCurrency] = useState('USD')

  const onPay = async () => {
    try {
      const newOrderData = await createNewOrder(appData, amount, currency)
      const transactionToken = newOrderData.order_payment_id
      const miniappOrderId = newOrderData.order_id

      const { status } = await appboxoSdk.pay({
        amount,
        currency,
        miniappOrderId,
        transactionToken,
        extraParams: {},
      })
      setResponse(status)
    } catch (err) {
      setResponse(JSON.stringify(err))
    }
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

      <Button size="large" block onClick={onPay}>
        Call AppboxoPay
      </Button>
      <Text type="secondary">Result: </Text>
      <Text type="warning">{response}</Text>
    </Card>
  )
}

export default AppboxoPay
