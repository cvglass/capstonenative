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

import { Router, Scene, ActionConst } from 'react-native-router-flux';
import socket from './src/socket';
import { Provider } from 'react-redux';
import store from './src/store';


import EnterRoom from './src/components/0EnterRoom';
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

//pictionary
import CreateTeamProfile from './src/components/pictionary/CreateTeamProfile';
import PictionaryStartWait from './src/components/pictionary/StartWait';
import PictionaryDrawingPane from './src/components/pictionary/DrawingPane';
import PictionaryTurnWait from './src/components/pictionary/TurnWait';
import PictionaryNextTeamStartWait from './src/components/pictionary/NextTeamStartWait';
import PictionaryGameOver from './src/components/pictionary/GameOver';

export default class capstonenative extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router navigationBarStyle={{backgroundColor: 'white',  borderBottomColor: 'black', borderBottomWidth: 1 }} titleStyle={{fontFamily: 'Amatic SC', fontWeight: 'bold', fontSize: 31, backgroundColor: 'transparent'}}>
            <Scene key="chooseGame" component={ EnterRoom } title="Enter room code!" initial={true} />
            <Scene key="drawkward">
              <Scene key="drawkwardCreateProfile" component={ CreateProfile } title="Draw your avatar!" initial={true} panHandlers={null} />
              <Scene key="drawkwardStartWait" component={ StartWait } title="Waiting for users" renderBackButton={() => (null)} panHandlers={null} />
              <Scene key="drawkwardDrawingPane" component={ DrawingPane } title="Drawkward - Draw!"  renderBackButton={() => (null)} panHandlers={null}  />
              <Scene key="drawkwardDrawingWait" component={ DrawingWait } title="Drawkward - Wait!" hideNavBar={true} panHandlers={null} />
              <Scene key="drawkwardArtistWait" component={ ArtistWait } title="Artist - Wait" hideNavBar={true} panHandlers={null}  />
              <Scene key="drawkwardWriteCaption" component={ WriteCaption } title="Write a caption!" hideNavBar={true} panHandlers={null} />
              <Scene key="drawkwardPhraseWait" component={ PhraseWait } title="Waiting for Phrases!" hideNavBar={true} panHandlers={null} />
              <Scene key="drawkwardListCaptions" component={ ListCaptions } title="Select the original title" hideNavBar={true} panHandlers={null} />
              <Scene key="drawkwardEndRound" component={ EndRound } hideNavBar={true} panHandlers={null} />
              <Scene key="drawkwardGameOver" component={ GameOver } title="Game Over" hideNavBar={true} panHandlers={null}  />
              <Scene key="drawkwardGuessWait" component= { GuessWait } title="Waiting for guesses!" hideNavBar={true} panHandlers={null} />
            </Scene>
            <Scene key="pictionary"  >
              <Scene key="pictionaryCreateProfile" title="Create your team!" component={CreateTeamProfile} renderBackButton={() => (null)} type={ActionConst.RESET} panHandlers={null} initial={true} />
              <Scene key="pictionaryStartWait" component={PictionaryStartWait} hideNavBar={true} type={ActionConst.RESET} panHandlers={null} />
              <Scene key="pictionaryDrawingPane" title="Draw!" component={PictionaryDrawingPane} renderBackButton={() => (null)}  type={ActionConst.RESET} panHandlers={null} />
              <Scene key="pictionaryTurnWait" component={PictionaryTurnWait} hideNavBar={true} type={ActionConst.RESET} panHandlers={null} />
              <Scene key="pictionaryNextTeamStartWait" component={ PictionaryNextTeamStartWait } hideNavBar={true} type={ActionConst.RESET} panHandlers={null} />
              <Scene key="pictionaryGameOver" component={ PictionaryGameOver } hideNavBar={true} type={ActionConst.RESET} panHandlers={null} />
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
