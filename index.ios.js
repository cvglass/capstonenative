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


import DrawingPane from './DrawingPane'
// import SvgTest from './svgTest';

export default class capstonenative extends Component {
  render() {
    return (
      <Router>
        <Scene key='drawkward'>
          <Scene key='drawkward-drawing-pane' component={DrawingPane} title="Drawkward - Draw!" initial={true} />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
