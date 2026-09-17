import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const LIST = [
  {
    id: 1,
    text: 'Delete',
    role:'destructive'
  },
  {
    id: 2,
    text: 'Selected',
    role:'selected'
  },
  {
    id: 3,
    text: 'Share',
  },
  {
    id: 4,
    text: 'Play',
  },
  {
    id: 5,
    text: 'Cancel',
    role: 'cancel'
  }
]

const ActionSheet = () => {
  const [response, setResponse] = useState('')

  const actionSheetListener = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppActionSheetItemClick') {
      if (data.id) {
        const selected = LIST.find(item =>item.id === data.id)
        setResponse(selected.text)
      }
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(actionSheetListener)

    return () => {
      appboxoSdk.unsubscribe(actionSheetListener)
    }
  }, [])

  const showActionSheet = () => {
    appboxoSdk.send('AppBoxoWebAppShowActionSheet', {
      header: 'Albums',
      list: LIST
    })
  }

  return (
    <FeatureCard title="Action sheet">
      <SecondaryButton text="Show action sheet" onClick={showActionSheet} />
      <StatusLine label="Selected action sheet item:" value={response} />
    </FeatureCard>
  )
}

export default ActionSheet
