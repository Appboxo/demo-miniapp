import React, { useEffect, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import LoggerContext from '../../LoggerContext.js'

const { Text } = Typography

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
    <Card
      title="Widget mode"
    >
      <Button
        size="large"
        block
        onClick={handleCollapse}
      >Collapse</Button>
      <Button
        size="large"
        block
        onClick={handleExpand}
      >Expand</Button>
      <Text type="secondary">Status: </Text>
      <Text type="warning">{expanded ? 'expanded' : 'collapsed'}</Text>
    </Card>
  )
}

export default ExpandCollapse
