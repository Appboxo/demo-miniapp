import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext'

const FILE_URL = 'https://images.unsplash.com/photo-1586854399870-334a91a284e8?auto=format&fit=crop&w=700&q=80'
const FILE_NAME = 'boxo-sample.jpg'

const DownloadFile = () => {
  const { updateLogs } = React.useContext(LoggerContext) || {}
  const [status, setStatus] = useState('')

  const handleDownload = async () => {
    if (updateLogs) {
      updateLogs({
        action: 'AppBoxoWebAppDownloadFile',
        message: 'request sent',
        data: { url: FILE_URL, file_name: FILE_NAME }
      })
    }

    try {
      const data = await appboxoSdk.sendPromise('AppBoxoWebAppDownloadFile', {
        url: FILE_URL,
        file_name: FILE_NAME
      })
      setStatus(JSON.stringify(data) || 'Sent')
      if (updateLogs) {
        updateLogs({
          action: 'AppBoxoWebAppDownloadFile',
          message: 'response received',
          data
        })
      }
    } catch (error) {
      setStatus('Failed')
      if (updateLogs) {
        updateLogs({
          action: 'AppBoxoWebAppDownloadFile',
          message: 'request failed',
          data: error
        })
      }
    }
  }

  return (
    <FeatureCard title="Download file">
      <SecondaryButton
        className="wrap-button"
        text="Download sample image"
        onClick={handleDownload}
      />
      <StatusLine label="Result:" value={status} />
    </FeatureCard>
  )
}

export default DownloadFile
