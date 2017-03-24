'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { JOIN_ROOM, SEND_TO_DRAWKWARD, SEND_TO_PICTIONARY  } from '../utils';
import socket from '../socket';
import Dimensions from 'Dimensions';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class ArtistWait extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on(SEND_TO_DRAWKWARD, () => {
      Actions.drawkwardCreateProfile();
    })
    socket.on(scoreboard, () => {
      // console.log('hi!')
      Actions.drawkwardEndRound();
    })
  }

  componentWillUnmount() {
    socket.off(writeCaption);
    socket.off(scoreboard);
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
            You are the artist.
          </Text>
          <Text
              x={thisWidth / 2}
              y={thisHeight / 2 - 20}
              stroke="none"
              color="black"
              fontSize="30"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="Amatic SC"
            >
               Wait for the other players to guess.
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

export default ArtistWait
