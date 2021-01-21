import React from 'react'
import { Button } from 'antd';

import styles from './Logs.module.scss'

const Logs = ({ onClose, logs }) => {
  return (
    <section className={styles.logs}>
      <Button
        size="small"
        type="dashed"
        onClick={onClose}
        className="show-logs-button"
      >Hide Logs</Button>
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
