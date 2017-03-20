'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import socket from '../socket';
import SubmitButton from './SubmitButton';
import { startGame } from '../utils'

//REMOVE SUBMITBUTTON IN PRODUCTION (it's in for testing purposes only)

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class GameOver extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on(startGame, () => {
      Actions.drawkwardDrawingPane()
    })
  }

  componentWillUnmount() {
    socket.off(startGame)
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
            y={thisHeight / 2}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
          >
            Game Over! Check the monitor for your scores.
          </Text>
        </Svg>
        <SubmitButton
          onPress={() => {Actions.drawkwardDrawingPane()}}
          buttonText={'Start New Game'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1C2C3'
  }
});

export default GameOver
