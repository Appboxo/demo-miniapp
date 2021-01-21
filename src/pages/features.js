import React from 'react';
import appboxoSdk from '@appboxo/js-sdk'
import { useRouter } from 'next/router'
import { Button } from 'antd';
import NavigationBar from '../features/NavigationBar'
import TabBar from '../features/TabBar'
import Miscellaneous from '../features/Miscellaneous'
import Tracking from '../features/Tracking'
import CustomEvents from '../features/CustomEvents'
import LoadingIndicator from '../features/LoadingIndicator'
import QRCodeReader from '../features/QRCodeReader'
import HapticFeedback from '../features/Haptic'
import ActionSheet from '../features/ActionSheet'
import GeoData from '../features/GeoData'
import Alert from '../features/Alert'
import ImageGallery from '../features/ImageGallery'
import Storage from '../features/Storage'
import Clipboard from '../features/Clipboard'
import SystemInfo from '../features/SystemInfo'
import Accelerometer from '../features/Accelerometer'
import Gyroscope from '../features/Gyroscope'
import Compass from '../features/Compass'
import WindowBackground from '../features/Background'
import OnRestore from '../features/OnRestore'
import AppboxoPay from '../features/AppboxoPay'

import FileInput from '../features/FileInput'
import LoggerContext from '../context/LoggerContext'
import ActionButtons from '../features/ActionButtons'

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
  },
  {
    component: Compass,
    eventName: 'AppBoxoWebAppStartCompass'
  },
  {
    component: AppboxoPay,
    eventName: 'AppBoxoWebAppPay'
  },
  {
    component: WindowBackground,
    eventName: 'AppBoxoWebAppSetBackgroundColor'
  },
  {
    component: OnRestore,
    eventName: 'AppBoxoWebAppSetNavigationBar'
  },
  {
    component: FileInput,
    eventName: 'AppBoxoWebAppSetNavigationBar'
  }
]

const Features = () => {
  const { updateLogs } = React.useContext(LoggerContext)
  const router = useRouter()

  const handleGoBack = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to home'
    })
    router.push('/');
  }

  return (
    <section className={'pane features'}>
      <div>
        <h1>Features</h1>
        {FEATURES.map((feature, index) => {
          if (appboxoSdk.supports(feature.eventName)) {
            return (
              <div className='feature' key={index}>
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
