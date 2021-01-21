import React from 'react'
import { useRouter } from 'next/router'

import { Button } from 'antd'
import classnames from 'classnames'
import styles from '../../styles/Home.module.scss'
import LoggerContext from '../context/LoggerContext'

function App() {
  const router = useRouter()
  const { updateLogs } = React.useContext(LoggerContext)

  const handleAccountClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to account details'
    })
    router.push('/account')
  }

  const handleFeaturesClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to features details'
    })
    router.push('/features')
  }

  return (
    <>
      <section className={classnames('pane', styles.intro)}>
        <div>
          <h1>Appboxo <br /> Connect API demo</h1>
          <p>This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp.</p>
          <p>Tap on account details button to login in the miniapp with credentials from Appboxo demo app.</p>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            onClick={handleAccountClick}
            block
          >Account details</Button>
          <Button
            size="large"
            block
            onClick={handleFeaturesClick}
          >Features</Button>
        </div>
      </section>
    </>
  )
}

export default App
