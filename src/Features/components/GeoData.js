import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const GeoData = () => {
  const [position, setPosition] = useState(null)
  const [openStatus, setOpenStatus] = useState('')
  const [location, setLocation] = useState('')

  const requestGeoposition = async () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })

    const data = await appboxoSdk.sendPromise('AppBoxoWebAppGetGeodata')

    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: false
    })

    setPosition({
      isAvailable: !!data.available,
      lat: parseFloat(data.lat),
      long: parseFloat(data.long)
    })
  }

  const formatPosition = () => {
    if (position) {
      return position.isAvailable ? `Lat: ${position.lat}, Long: ${position.long}` : 'Rejected'
    } else {
      return 'unknown'
    }
  }

  const openLocation = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppOpenLocation', {
      latitude: 1.290270,
      longitude: 103.851959
    });

    setOpenStatus(data.result ? 'Success' : 'Failed')
  };

  const chooseLocation = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppChooseLocation');

    setLocation(JSON.stringify(data))
  };

  return (
    <FeatureCard title="Geoposition">
      <SecondaryButton text="Request qeo position" onClick={requestGeoposition} />
      <StatusLine label="Your geo position:" value={formatPosition()} />
      <SecondaryButton text="Open location" onClick={openLocation} />
      <StatusLine label="Status:" value={openStatus} />
      <SecondaryButton text="Choose location" onClick={chooseLocation} />
      <StatusLine label="Location:">
        {location && <div className="code-block">{location}</div>}
      </StatusLine>
    </FeatureCard>
  )
}

export default GeoData
