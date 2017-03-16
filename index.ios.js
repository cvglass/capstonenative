/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import socket from './src/socket'
import { Provider } from 'react-redux'
import store from './src/store'

import DrawingPane from './src/components/DrawingPane'

export default class capstonenative extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="drawkward">
            <Scene key="drawkward-drawing-pane" component={DrawingPane} title="Drawkward - Draw!" initial={true} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1C2C3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('capstonenative', () => capstonenative);
