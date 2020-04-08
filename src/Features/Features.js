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
import LoadingIndicator from './components/LoadingIndicator'
import QRCodeReader from './components/QRCodeReader'
import HapticFeedback from './components/Haptic'
import ActionSheet from './components/ActionSheet'

import './Features.scss'

const FEATURES = [
  NavigationBar,
  TabBar,
  Miscellaneous,
  ActionButtons,
  LoadingIndicator,
  Tracking,
  CustomEvents,
  QRCodeReader,
  HapticFeedback,
  ActionSheet
]

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
        {FEATURES.map((Feature, index) => (
          <div className="feature" key={index}>
            <Feature />
          </div>
        ))}
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
