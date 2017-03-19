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

import DrawingPane from './src/components/DrawingPane';
import DrawingWait from './src/components/DrawingWait';
import WriteCaption from './src/components/WriteCaption';
import PhraseWait from './src/components/PhraseWait';

export default class capstonenative extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>

            <Scene key="drawkward">
              <Scene key="drawkwardDrawingPane" component={ DrawingPane } title="Drawkward - Draw!" initial={true} />
              <Scene key="drawkwardDrawingWait" component={ DrawingWait } title="Drawkward - Wait!" hideNavBar={true} />
              <Scene key="drawkwardWriteCaption" component={ WriteCaption } title="Write a caption!" hideNavBar={true} />
              <Scene key="drawkwardPhraseWait" component={ PhraseWait } title="Waiting for Phrases!" hideNavBar={true} />
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
