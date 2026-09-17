import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext'

const SHARE_TEXT = 'Boxo is rethinking how apps interact with each other'
const SHARE_URL = 'https://boxo.io'
const FILE_URL = 'https://images.unsplash.com/photo-1586854399870-334a91a284e8?auto=format&fit=crop&w=700&q=80'
const FILE_NAME = 'boxo-sample.jpg'

const Share = () => {
  const { updateLogs } = React.useContext(LoggerContext) || {}
  const [status, setStatus] = useState('')

  const share = async (payload) => {
    if (updateLogs) {
      updateLogs({
        action: 'AppBoxoWebAppShare',
        message: 'request sent',
        data: payload
      })
    }

    try {
      const data = await appboxoSdk.sendPromise('AppBoxoWebAppShare', payload)
      setStatus(JSON.stringify(data) || 'Sent')
      if (updateLogs) {
        updateLogs({
          action: 'AppBoxoWebAppShare',
          message: 'response received',
          data
        })
      }
    } catch (error) {
      setStatus('Failed')
      if (updateLogs) {
        updateLogs({
          action: 'AppBoxoWebAppShare',
          message: 'request failed',
          data: error
        })
      }
    }
  }

  return (
    <FeatureCard title="Share">
      <SecondaryButton
        className="wrap-button"
        text="Share text and URL"
        onClick={() => share({ text: SHARE_TEXT, url: SHARE_URL })}
      />
      <SecondaryButton
        className="wrap-button"
        text="Share file"
        onClick={() => share({
          text: SHARE_TEXT,
          url: FILE_URL,
          file_name: FILE_NAME
        })}
      />
      <StatusLine label="Result:" value={status} />
    </FeatureCard>
  )
}

export default Share
