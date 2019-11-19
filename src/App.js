import React, { useEffect, useState } from 'react'

import appboxoSdk from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Account from './Account/Account.js'
import Home from './Home/Home.js'
import AuthContext from './AuthContext.js'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    appboxoSdk.sendPromise('AppBoxoWebAppGetInitData')
      .then((appData) => {
        console.log('appData: ', appData)

        setLoginStatus(Boolean(appData.detail.data.token))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <AuthContext.Provider value={{
      loginStatus,
      setLoginStatus
    }}>
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
    </AuthContext.Provider>
  );
}

export default App;
