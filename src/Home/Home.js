import React from 'react';
import appboxoSdk from '@appboxo/js-sdk'
import { useHistory } from 'react-router-dom';
import LoggerContext from '../LoggerContext.js'

import './Home.scss'

const Home = (props) => {
  const { updateLogs } = React.useContext(LoggerContext)
  let history = useHistory();

  const handleAccountClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to account details'
    })
    history.push('/account');
  }

  const handleFeaturesClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to features details'
    })
    history.push('/features');
  }

  return (
    <section className="pane intro">
      <div>
        <h1>Appboxo <br/> Connect API demo</h1>
        <p>This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp.</p>
        <p>Tap on account details button to login in the miniapp with credentials from Appboxo demo app.</p>
      </div>
      <div>
        <button className="button" onClick={handleAccountClick}>Account details</button>
        <button className="button button-light" onClick={handleFeaturesClick}>Features</button>
      </div>
    </section>
  )
}

export default Home
