import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton, SubTitle } from '@appboxo/ui-kit'
import FeatureCard from '../../components/FeatureCard'

const LoadingIndicator = () => {
  const showLoadingIndicatorWithTimeout = () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })

    setTimeout(() => {
      appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
        show: false
      })
    }, 10000);
  }

  const showLoadingIndicator = () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })
  }

  return (
    <FeatureCard title="Loading indicator">
      <SecondaryButton
        className="wrap-button"
        text="Show loading indicator and hide it after 10 seconds"
        onClick={showLoadingIndicatorWithTimeout}
      />
      <SecondaryButton
        className="wrap-button"
        text="Show loading indicator without hiding it"
        onClick={showLoadingIndicator}
      />
      <SubTitle color="var(--text-3, #8e8e93)">
        Loading indicator will show an alert to close it after 30 seconds if no changing event is dispatched
      </SubTitle>
    </FeatureCard>
  )
}

export default LoadingIndicator
