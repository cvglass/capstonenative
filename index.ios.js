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
import socket from './src/socket';
import { Provider } from 'react-redux';
import store from './src/store';

import DrawingPane from './src/components/DrawingPane';
import DrawingWait from './src/components/DrawingWait';
import WriteCaption from './src/components/WriteCaption';
import PhraseWait from './src/components/PhraseWait';
import ListCaptions from './src/components/ListCaptions';
import GuessWait from './src/components/GuessWait';


export default class capstonenative extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>

            <Scene key="drawkward">
              <Scene key="drawkwardDrawingPane" component={ DrawingPane } title="Drawkward - Draw!" initial={true} />
              <Scene key="drawkwardDrawingWait" component={ DrawingWait } title="Drawkward - Wait!" hideNavBar={true} />
              <Scene key="drawkwardWriteCaption" component={ WriteCaption } title="Write a caption!" hideNavBar={true} />
              <Scene key="drawkwardPhraseWait" component={ PhraseWait } title="Waiting for phrases!" hideNavBar={true} />
              <Scene key="drawkwardListCaptions" component={ ListCaptions } title="Select the original title" hideNavBar={true} />
              <Scene key="drawkwardGuessWait" component= { GuessWait } title="Waiting for guesses!" hideNavBar={true} />
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
