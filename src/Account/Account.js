import React, { useState, useEffect } from 'react'
import core from '@appboxo/js-sdk'

import Confirm from '../components/Confirm.js'
import Preloader from '../components/Preloader.js'

import './Account.scss'

const Account = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    core.setOptions({
      onLoginSuccess: () => {
        console.log('login sucess')
      },
      onLoginFail: () => {
        console.log('login failed')
      },
      onLoginFinish: () => {
        setIsLoading(false)
      }
    })

    // Chech if logged in
    core.login()
  }, []);

  const handleLogin = () => {
    setIsLoading(true)
    core.login()
  }

  const handleClose = () => {
    setConfirmOpen(false)
  }

  const handleLogout = () => {
    setIsLoading(true)
    setLoginStatus(false)

    // Logout
    core.logout()
  }

  return (
    <section className="pane account">
      <h1>Account details</h1>
      <div className="account__email">
        Email: <span>Unknown</span>
      </div>
      {loginStatus ? (
        <button className="button button-light logout" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="button login" onClick={() => setConfirmOpen(true)}>Login</button>
      )}
      {confirmOpen && <Confirm
        onClose={handleClose}
        onConfirm={handleLogin}
      />}
      {isLoading && <Preloader />}
    </section>
  )
}

export default Account
