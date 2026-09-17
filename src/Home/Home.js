import React from 'react'
import { useHistory } from 'react-router-dom'
import { Body1, Flex, Footnote1, PrimaryButton, SecondaryButton } from '@appboxo/ui-kit'
import AuthContext from '../AuthContext'
import LoggerContext from '../LoggerContext'
import wordmark from '../assets/boxo-wordmark.png'

import './Home.scss'

const Home = () => {
  const { updateLogs, openLogs } = React.useContext(LoggerContext) || {}
  const { loginStatus } = React.useContext(AuthContext) || {}
  const history = useHistory()
  const pressTimer = React.useRef(null)

  const handleAccountClick = () => {
    if (updateLogs) {
      updateLogs({
        action: 'REDIRECT',
        message: 'to account details'
      })
    }
    history.push('/account')
  }

  const handleFeaturesClick = () => {
    if (updateLogs) {
      updateLogs({
        action: 'REDIRECT',
        message: 'to features details'
      })
    }
    history.push('/features')
  }

  const clearPressTimer = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  const handleTitlePressStart = () => {
    clearPressTimer()
    pressTimer.current = setTimeout(() => {
      if (openLogs) {
        openLogs()
      }
    }, 600)
  }

  React.useEffect(() => () => clearPressTimer(), [])

  return (
    <section className="pane home">
      <Flex vertical gap={12}>
        <div
          className="home__title"
          onPointerDown={handleTitlePressStart}
          onPointerUp={clearPressTimer}
          onPointerLeave={clearPressTimer}
          onContextMenu={(event) => event.preventDefault()}
        >
          <img className="home__wordmark" src={wordmark} alt="Boxo" />
        </div>
        <Body1>
          Connect your host login in one tap.
        </Body1>
        <span className={`home__chip ${loginStatus ? 'home__chip--in' : ''}`}>
          <Footnote1>
            {loginStatus ? 'Signed in' : 'Not signed in'}
          </Footnote1>
        </span>
      </Flex>
      <Flex vertical gap={12}>
        <PrimaryButton
          text="Account details"
          onClick={handleAccountClick}
        />
        <SecondaryButton
          text="Features"
          onClick={handleFeaturesClick}
        />
      </Flex>
    </section>
  )
}

export default Home
