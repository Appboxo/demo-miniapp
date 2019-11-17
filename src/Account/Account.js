import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'

import Confirm from '../components/Confirm.js'
import Preloader from '../components/Preloader.js'
import AuthContext from '../AuthContext.js'

import './Account.scss'

const Account = () => {
  const { loginStatus, setLoginStatus } = React.useContext(AuthContext)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const token = await appboxoSdk.login()
      console.log('token: ', token)

      setLoginStatus(true)
    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleClose = () => {
    setConfirmOpen(false)
  }

  const handleLogout = () => {
    setIsLoading(true)

    // Logout
    appboxoSdk.logout().then(() => {
      setLoginStatus(false)
    })
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
