import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import appboxoSdk from '@appboxo/js-sdk'

appboxoSdk.sendPromise('AppBoxoWebAppGetMiniappSettings').then(data => {
  const settings = {
    colors: {
      primary_color: '#DF1445',
      secondary_color: '#04C613',
      tertiary_color: '#00C5DA'
    },
    hostapp: {
      name: 'Super app',
      logo: '',
    }
  }
  document.head.insertAdjacentHTML('beforeend', `<style>
    :root {
      --primary-color: ${settings.colors.primary_color};
      --secondary-color: ${settings.colors.secondary_color};
      --tertiary-color: ${settings.colors.tertiary_color};
    }
  </style>`)
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
