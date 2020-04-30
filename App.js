/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import {Text, I18nManager} from 'react-native';

import AppInitalizer from './app/AppInitalizer';
import {ThemeProvider} from 'react-native-elements';
import rootReducer from './app/reducers';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import NavigationService from './app/util/NavigationService';
import {SetCookie} from './app/util';
const theme = {
  Text: {
    style: {
      fontFamily: 'Tajawal',
      color: 'rgba(81, 92, 111, 1)',
      fontSize: 15,
    },
  },
};

// const store = createStore(rootReducer,applyMiddleware(thunk));

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
const store = configureStore();

const App = () => {
  //To Change the original React's Text default props in Navigators
  let oldRender = Text.render;
  Text.render = function(...args) {
    let origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [
        {fontFamily: 'Tajawal', color: 'rgba(81, 92, 111, 1)', fontSize: 15},
        origin.props.style,
      ],
    });
  };

  axios.defaults.headers = {
    'x-requested-api': ' ocapi',
    'x-requested-with': ' XMLHttpRequest',
  };
  axios.defaults.responseType = 'json';
  axios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      Promise.reject(err);
    },
  );

  // if (!I18nManager.isRTL) {
  //     I18nManager.allowRTL(true);
  //     I18nManager.forceRTL(true);
  //     // RNRestart.Restart();
  // } console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppInitalizer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
