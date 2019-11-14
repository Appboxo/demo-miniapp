import React from 'react';
import {
  useHistory
} from 'react-router-dom';

import './Home.scss'

const Home = (props) => {
  let history = useHistory();

  const handleClick = () => {
    history.push('/account');
  }

  return (
    <section className="pane intro">
      <h1>Appboxo Connect API demo</h1>
      <p>This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp.</p>
      <p>Tap on account details button to login in the miniapp with credentials from Appboxo demo app.</p>
      <button className="button" onClick={handleClick}>Account details</button>
    </section>
  )
}

export default Home
