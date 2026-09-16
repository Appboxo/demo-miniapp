import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import LoggerContext from '../LoggerContext'

import './Widget.scss'

const Widget = ({ onExpand }) => {
  const { updateLogs } = React.useContext(LoggerContext) || {}

  const handleOpen = async () => {
    if (updateLogs) {
      updateLogs({
        action: 'AppBoxoWebAppExpand',
        message: 'request sent from widget'
      })
    }

    try {
      const data = await appboxoSdk.sendPromise('AppBoxoWebAppExpand')

      if (updateLogs) {
        updateLogs({
          action: 'AppBoxoWebAppExpand',
          message: 'response received',
          data
        })
      }

      if (onExpand && (data && data.expanded !== false)) {
        onExpand(true)
      }
    } catch (error) {
      if (updateLogs) {
        updateLogs({
          action: 'AppBoxoWebAppExpand',
          message: 'request failed',
          data: error
        })
      }
      if (onExpand) {
        onExpand(true)
      }
    }
  }

  return (
    <section className="widget">
      <div className="widget__glow" aria-hidden="true" />
      <div className="widget__content">
        <div className="widget__copy">
          <div className="widget__brand">
            <span className="widget__mark" aria-hidden="true">B</span>
            <span className="widget__eyebrow">Boxo Widget</span>
          </div>
          <h2 className="widget__title">Boxo</h2>
          <p className="widget__status">
            Boxo is rethinking how apps interact with each other
          </p>
        </div>
        <button
          type="button"
          className="widget__cta"
          onClick={handleOpen}
        >
          Open
        </button>
      </div>
    </section>
  )
}

export default Widget
