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

import CreateProfile from './src/components/1CreateProfile';
import StartWait from './src/components/2StartWait';
import DrawingPane from './src/components/3DrawingPane';
import DrawingWait from './src/components/4DrawingWait';
import ArtistWait from './src/components/4ArtistWait';
import WriteCaption from './src/components/5WriteCaption';
import PhraseWait from './src/components/6PhraseWait';
import ListCaptions from './src/components/7ListCaptions';
import GuessWait from './src/components/8GuessWait';
import EndRound from './src/components/9EndRound';
import GameOver from './src/components/9GameOver';


export default class capstonenative extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>

            <Scene key="drawkward">
              <Scene key="drawkwardCreateProfile" component={ CreateProfile } title="Draw your avatar!" initial={true} />
              <Scene key="drawkwardStartWait" component={ StartWait } title="Waiting for all users" hideNavBar={true} />
              <Scene key="drawkwardDrawingPane" component={ DrawingPane } title="Drawkward - Draw!" renderBackButton={false} />
              <Scene key="drawkwardDrawingWait" component={ DrawingWait } title="Drawkward - Wait!" hideNavBar={true} />
              <Scene key="drawkwardArtistWait" component={ ArtistWait } title="Artist - Wait" hideNavBar={true} />
              <Scene key="drawkwardWriteCaption" component={ WriteCaption } title="Write a caption!" hideNavBar={true} />
              <Scene key="drawkwardPhraseWait" component={ PhraseWait } title="Waiting for Phrases!" hideNavBar={true} />
              <Scene key="drawkwardListCaptions" component={ ListCaptions } title="Select the original title" hideNavBar={true} />
              <Scene key="drawkwardEndRound" component={ EndRound } hideNavBar={true} />
              <Scene key="drawkwardGameOver" component={ GameOver } title="Game Over" hideNavBar={true} />
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
