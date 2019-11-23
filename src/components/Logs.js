import React from 'react'

import './Logs.scss'

const Logs = ({ onClose, logs }) => {
  return (
    <section className="logs">
      <button className="show-logs-button" onClick={onClose}>Hide Logs</button>
      <ul>
        {logs.map(log => (<li key={log.action + '-' + log.message}>
          {log.action}: {log.message} <br/>
          {JSON.stringify(log.data)}
        </li>))}
      </ul>
    </section>
  )
}

export default Logs
