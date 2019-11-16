import React, { useEffect } from 'react';

import core from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Account from './Account/Account.js'
import Home from './Home/Home.js'


function App() {
  useEffect(() => {
    console.log(core)
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
