import React from 'react'
import { QuaternaryButton } from '@appboxo/ui-kit'

import { formatJson } from './JsonPreview'
import './Logs.scss'

const Logs = ({ onClose, logs }) => {
  const listRef = React.useRef(null)

  React.useEffect(() => {
    const list = listRef.current
    if (list) {
      list.scrollTop = list.scrollHeight
    }
  }, [logs])

  return (
    <section className="logs">
      <div className="logs__header">
        <QuaternaryButton
          className="show-logs-button"
          text="Hide Logs"
          inline
          onClick={onClose}
        />
      </div>
      <ul className="logs__list" ref={listRef}>
        {logs.map((log, index) => (
          <li className="logs__item" key={`${log.action}-${log.message}-${index}`}>
            <div className="logs__line">
              <span className="logs__action">{log.action}</span>
              {': '}
              {log.message}
            </div>
            {log.data != null && (
              <pre className="logs__data">{formatJson(log.data)}</pre>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Logs
