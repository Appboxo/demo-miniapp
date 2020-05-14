import React from 'react';
import appboxoSdk from '@appboxo/js-sdk'
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
import GeoData from './components/GeoData'
import Alert from './components/Alert'
import ImageGallery from './components/ImageGallery'
import Storage from './components/Storage'
import Clipboard from './components/Clipboard'
import SystemInfo from './components/SystemInfo'
import Accelerometer from './components/Accelerometer'
import Gyroscope from './components/Gyroscope'

import './Features.scss'

const FEATURES = [
  {
    component: NavigationBar,
    eventName: 'AppBoxoWebAppSetNavigationBar'
  },
  {
    component: TabBar,
    eventName: 'AppBoxoWebAppSetTabBar'
  },
  {
    component: Miscellaneous,
    eventName: 'AppBoxoWebAppOpenMiniApp'
  },
  {
    component: ActionButtons,
    eventName: 'AppBoxoWebAppSetActionButton'
  },
  {
    component: LoadingIndicator,
    eventName: 'AppBoxoWebAppLoadingIndicator'
  },
  {
    component: Tracking,
    eventName: 'AppBoxoWebAppGetInitData'
  },
  {
    component: CustomEvents,
    eventName: 'AppBoxoWebAppCustomEvent'
  },
  {
    component: QRCodeReader,
    eventName: 'AppBoxoWebAppOpenQRCodeReader'
  },
  {
    component: HapticFeedback,
    eventName: 'AppBoxoWebAppVibrate'
  },
  {
    component: ActionSheet,
    eventName: 'AppBoxoWebAppShowActionSheet'
  },
  {
    component: GeoData,
    eventName: 'AppBoxoWebAppGetGeodata'
  },
  {
    component: Alert,
    eventName: 'AppBoxoWebAppOpenMiniApp'
  },
  {
    component: ImageGallery,
    eventName: 'AppBoxoWebAppShowImages'
  },
  {
    component: Storage,
    eventName: 'AppBoxoWebAppStorageSet'
  },
  {
    component: Clipboard,
    eventName: 'AppBoxoWebAppSetClipboard'
  },
  {
    component: SystemInfo,
    eventName: 'AppBoxoWebAppGetSystemInfo'
  },
  {
    component: Accelerometer,
    eventName: 'AppBoxoWebAppStartAccelerometer'
  },
  {
    component: Gyroscope,
    eventName: 'AppBoxoWebAppStartGyroscope'
  }
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
        {FEATURES.map((feature, index) => {
          if (appboxoSdk.supports(feature.eventName)) {
            return (
              <div className="feature" key={index}>
                <feature.component />
              </div>
            )
          } else {
            return null
          }
        })}
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
