import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { useHistory } from 'react-router-dom';

import Confirm from '../components/Confirm.js'
import Preloader from '../components/Preloader.js'
import LoginResponse from '../components/LoginResponse.js'
import AuthContext from '../AuthContext.js'


import './Account.scss'

const LOGIN_SUCCESS = 'success'
const LOGIN_FAILED = 'error'
const LOGIN_NONE = ''

const Account = () => {
  let history = useHistory();
  const { loginStatus, setLoginStatus } = React.useContext(AuthContext)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginResponseStatus, setLoginResponseStatus] = useState(LOGIN_NONE)

  const handleLogin = async () => {
    setIsLoading(true)
    setConfirmOpen(false)
    try {
      const token = await appboxoSdk.login()
      console.log('token: ', token)

      setLoginStatus(true)

      setLoginResponseStatus(LOGIN_SUCCESS)
    } catch (error) {
      console.log(error)

      setLoginResponseStatus(LOGIN_FAILED)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleClose = () => {
    setConfirmOpen(false)
  }

  const handleLogout = async () => {
    setIsLoading(true)

    // Logout
    try {
      await appboxoSdk.logout()
      console.log('Resolved')
      setLoginStatus(false)
    } catch (error) {
      console.log('Logout error: ', error)
    }

    setIsLoading(false)
  }

  const handleTryAgain = () => {
    setLoginResponseStatus(LOGIN_NONE)

    handleLogin()
  }

  const handleGoBack = () => {
    history.replace('/');
  }

  return loginResponseStatus ? (
    <>
      <LoginResponse
        isSuccessful={loginStatus}
        onContinue={() => setLoginResponseStatus(LOGIN_NONE)}
        onTryAgain={handleTryAgain}
      />
      {isLoading && <Preloader />}
    </>
  ) : (
    <section className="pane account">
      <h1>Account details</h1>
      <div className="account__email">
        Status: <b>{loginStatus ? 'Logged in' : 'Not logged in'}</b>
      </div>
      {loginStatus ? (
        <>
          <button className="button account__back-btn" onClick={handleGoBack}>Back</button>
          <br />
          <button className="button button-light logout" onClick={handleLogout}>Logout</button>
        </>
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
