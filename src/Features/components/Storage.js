import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const Storage = () => {
  const [saveStatus, setSaveStatus] = useState('')
  const [storageKeys, setStorageKeys] = useState([])
  const [savedData, setSavedData] = useState('')
  const [removeStatus, setRemoveStatus] = useState('')
  const [clearStatus, setClearStatus] = useState('')

  const save = async () => {
    const response = await Promise.all([
      appboxoSdk.sendPromise('AppBoxoWebAppStorageSet', {
        key: 'username',
        value: 'John'
      }),
      appboxoSdk.sendPromise('AppBoxoWebAppStorageSet', {
        key: 'email',
        value: 'john@doe.com'
      })
    ])

    setSaveStatus(response.every(item => item.result) ? 'Success' : 'Failed')
  }

  const getKeys = async () => {
    const storageKeys = await appboxoSdk.sendPromise('AppBoxoWebAppStorageGetKeys', {
      count: 10
    })
    setStorageKeys(storageKeys.keys)
  }

  const getData = async () => {
    const userData = await appboxoSdk.sendPromise('AppBoxoWebAppStorageGet', {
      keys: ['username', 'email']
    });

    setSavedData(JSON.stringify(userData))
  }

  const removeItem = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStorageRemove', {
      key: 'username'
    });

    setRemoveStatus(response.result ? 'Success' : 'Failed')
  }

  const clearStorage = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStorageClear');

    setClearStatus(response.result ? 'Success' : 'Failed')
  }

  return (
    <FeatureCard title="Storage">
      <SecondaryButton
        className="wrap-button"
        text="Save username and email to storage"
        onClick={save}
      />
      <StatusLine label="Status:" value={saveStatus} />
      <SecondaryButton text="Get saved storage keys" onClick={getKeys} />
      <StatusLine label="Storage keys:" value={storageKeys.join(', ')} />
      <SecondaryButton text="Get saved storage data" onClick={getData} />
      <StatusLine label="Saved data:">
        {savedData && <div className="code-block">{savedData}</div>}
      </StatusLine>
      <SecondaryButton
        className="wrap-button"
        text="Remove username from storage"
        onClick={removeItem}
      />
      <StatusLine label="Status:" value={removeStatus} />
      <SecondaryButton text="Clear storage" onClick={clearStorage} />
      <StatusLine label="Status:" value={clearStatus} />
    </FeatureCard>
  )
}

export default Storage
