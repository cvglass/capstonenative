'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { END_TURN, gameOver } from '../../utils';
import socket from '../../socket';
import Dimensions from 'Dimensions';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class PictionaryTurnWait extends React.Component {

  componentDidMount() {
    socket.on(END_TURN, () => {
      Actions.pictionaryNextTeamStartWait();
    })

    socket.on(gameOver, () => {
      Actions.pictionaryGameOver();
    })
  }

  componentWillUnmount() {
    socket.off(END_TURN)
    socket.off(gameOver)
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
            y={thisHeight / 2 - 50}
            stroke="none"
            color="black"
            fontSize="30"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            Other team is drawing!
          </Text>
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

export default PictionaryTurnWait
