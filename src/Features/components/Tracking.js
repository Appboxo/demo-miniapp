import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton, Tip, Toast } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'

const Tracking = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTransactionTracking = async () => {
    setIsLoading(true)
    try {
      await appboxoSdk.track({
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
              description: 'Product description',
              price: 8.80,
              amount: 1,
              total: 8.80,
              package_id: 1232
            }
          ]
        }
      })

      Toast.info('Successfully sent!')
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return (
    <FeatureCard title="Transaction tracking">
      {error && (
        <Tip
          emphasisPrefix="Error sending"
          text={JSON.stringify(error)}
        />
      )}
      <SecondaryButton
        className="wrap-button"
        loading={isLoading}
        text={isLoading ? 'Sending...' : 'Send transaction tracking event'}
        onClick={handleTransactionTracking}
      />
    </FeatureCard>
  )
}

export default Tracking
