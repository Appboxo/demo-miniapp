import React from 'react';
import { createRoot } from 'react-dom/client';
import setRootPixel from '@arco-design/mobile-react/tools/flexible';
import ContextProvider from '@arco-design/mobile-react/esm/context-provider';
import '@arco-design/mobile-react/dist/style.css';
import '@appboxo/ui-kit/styles.css';
import '@appboxo/ui-kit/themes/default/theme.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import appboxoSdk from '@appboxo/js-sdk'

// Kit + Arco sizes are rem-based (1rem = 50px at 375px). Cap at 50 so a
// wide desktop window does not inflate buttons to the 64px default max.
setRootPixel(50, 375, 50);

appboxoSdk.sendPromise('AppBoxoWebAppGetMiniappSettings').then(data => {
  console.log('MINIAPP_SETTINGS: ', data)
  const colors = data.miniapp_settings.colors
  document.head.insertAdjacentHTML('beforeend', `<style>
    :root {
      --primary-color: ${colors.primary_color};
      --secondary-color: ${colors.secondary_color};
      --tertiary-color: ${colors.tertiary_color};
    }
  </style>`)
}).catch(err => console.log(err));

const root = createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
