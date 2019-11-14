import React, { useState, useEffect } from 'react'

import Confirm from '../components/Confirm.js'
import Preloader from '../components/Preloader.js'

import './Account.scss'

const Account = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Chech if logged in
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, []);

  const handleLogin = () => {
    setIsLoading(true)

    // Login
  }

  const handleClose = () => {
    setConfirmOpen(false)
  }

  const handleLogout = () => {
    setIsLoading(true)
    setLoginStatus(false)

    // Logout
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
