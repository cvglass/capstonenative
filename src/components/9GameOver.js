'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import socket from '../socket';
import SubmitButton from './SubmitButton';
import {  emitToSocket, sendStartNewGame } from '../utils'

//REMOVE SUBMITBUTTON IN PRODUCTION (it's in for testing purposes only)

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(emitMsg, emitObj) {
    emitToSocket(emitMsg, emitObj);
    Actions.chooseGame();
  }

  render() {
    return (
      <View>
        <Svg
          style={styles.container}
          height={thisHeight - 50}
          width={thisWidth}
        >
          <Text
            x={thisWidth / 2}
            y={thisHeight / 2 - 100}
            stroke="none"
            color="black"
            fontSize="30"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            Game Over!
          </Text>
          <Text
            x={thisWidth / 2}
            y={thisHeight / 2 - 50}
            stroke="none"
            color="black"
            fontSize="30"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            Check the monitor for scores!
          </Text>
        </Svg>
        <SubmitButton
          onPress={() => {this.handlePress({sendStartNewGame})}}
          buttonText={'Start New Game'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

export default GameOver
