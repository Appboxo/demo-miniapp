import React from 'react';
import { useHistory } from 'react-router-dom';
import LoggerContext from '../LoggerContext.js'
import { Button } from 'antd';
import NavigationBar from './components/NavigationBar'
import TabBar from './components/TabBar'
import Miscellaneous from './components/Miscellaneous'
import Tracking from './components/Tracking'
import CustomEvents from './components/CustomEvents'
import ActionButtons from './components/ActionButtons'

import './Features.scss'

const Features = (props) => {
  const { updateLogs } = React.useContext(LoggerContext)
  let history = useHistory();

  const handleGoBack = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to home'
    })
    history.push('/');
  }

  return (
    <section className="pane features">
      <div>
        <h1>Features</h1>
        <div className="feature">
          <NavigationBar />
        </div>
        <div className="feature">
          <TabBar />
        </div>
        <div className="feature">
          <Miscellaneous />
        </div>
        <div className="feature">
          <ActionButtons />
        </div>
        <div className="feature">
          <Tracking />
        </div>
        <div className="feature">
          <CustomEvents />
        </div>
      </div>
      <div>
        <Button
          onClick={handleGoBack}
          size="large"
          className="button-back"
          block
        >
          Go back
        </Button>
      </div>
    </section>
  )
}

export default Features
