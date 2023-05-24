/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

AppRegistry.registerComponent(appName, () => () => (
  <React.StrictMode>
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  </React.StrictMode>
));
