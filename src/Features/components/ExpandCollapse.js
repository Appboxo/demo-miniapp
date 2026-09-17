import React, { useEffect, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'
import LoggerContext from '../../LoggerContext.js'

const ExpandCollapse = () => {
  const { updateLogs } = React.useContext(LoggerContext)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const expandCollapseListener = (event) => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppExpand' || type === 'AppBoxoWebAppCollapse') {
        if (data && typeof data.expanded === 'boolean') {
          setExpanded(data.expanded)
        }

        updateLogs({
          action: type,
          message: 'event received',
          data
        })
      }
    }

    appboxoSdk.sendPromise('AppBoxoWebAppGetSystemInfo')
      .then((systemInfo) => {
        if (typeof systemInfo?.expanded === 'boolean') {
          setExpanded(systemInfo.expanded)
        }
      })
      .catch(() => {})

    appboxoSdk.subscribe(expandCollapseListener)
    return () => {
      appboxoSdk.unsubscribe(expandCollapseListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCollapse = () => {
    updateLogs({
      action: 'AppBoxoWebAppCollapse',
      message: 'request sent'
    })
    appboxoSdk.send('AppBoxoWebAppCollapse')
  }

  const handleExpand = async () => {
    updateLogs({
      action: 'AppBoxoWebAppExpand',
      message: 'request sent'
    })

    try {
      const data = await appboxoSdk.sendPromise('AppBoxoWebAppExpand')

      if (data && typeof data.expanded === 'boolean') {
        setExpanded(data.expanded)
      }

      updateLogs({
        action: 'AppBoxoWebAppExpand',
        message: 'response received',
        data
      })
    } catch (error) {
      updateLogs({
        action: 'AppBoxoWebAppExpand',
        message: 'request failed',
        data: error
      })
    }
  }

  return (
    <FeatureCard title="Widget mode">
      <SecondaryButton text="Collapse" onClick={handleCollapse} />
      <SecondaryButton text="Expand" onClick={handleExpand} />
      <StatusLine label="Status:" value={expanded ? 'expanded' : 'collapsed'} />
    </FeatureCard>
  )
}

export default ExpandCollapse
