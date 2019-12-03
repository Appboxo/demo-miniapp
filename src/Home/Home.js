import React from 'react';
import appboxoSdk from '@appboxo/js-sdk'
import { useHistory } from 'react-router-dom';
import LoggerContext from '../LoggerContext.js'

import './Home.scss'

const AIRALO_ID = 'id28'

const Home = (props) => {
  const { updateLogs } = React.useContext(LoggerContext)
  let history = useHistory();

  const handleClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to account details'
    })
    history.push('/account');
  }

  const openAiralo = () => {
    appboxoSdk.send('AppBoxoWebAppOpenMiniApp', {
      app_id: AIRALO_ID
    })
  }

  return (
    <section className="pane intro">
      <div>
        <h1>Appboxo Connect API demo</h1>
        <p>This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp.</p>
        <p>Tap on account details button to login in the miniapp with credentials from Appboxo demo app.</p>
      </div>
      <div>
        <button className="button" onClick={handleClick}>Account details</button>
        <button className="button button-light" onClick={openAiralo}>Open Airalo</button>
      </div>
    </section>
  )
}

export default Home
