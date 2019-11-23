import React from 'react';
import { useHistory } from 'react-router-dom';
import LoggerContext from '../LoggerContext.js'

import './Home.scss'

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

  return (
    <section className="pane intro">
      <div>
        <h1>Appboxo Connect API demo</h1>
        <p>This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp.</p>
        <p>Tap on account details button to login in the miniapp with credentials from Appboxo demo app.</p>
      </div>
      <button className="button" onClick={handleClick}>Account details</button>
    </section>
  )
}

export default Home
