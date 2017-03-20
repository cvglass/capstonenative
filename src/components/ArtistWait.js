'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { writeCaption } from '../utils';
import socket from '../socket';
import Dimensions from 'Dimensions';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class ArtistWait extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on(writeCaption, () => {
      Actions.drawkwardWriteCaption()
    })
  }

  componentWillUnmount() {
    socket.off(writeCaption)
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
            You are the artist. Wait for the other players to guess.
          </Text>
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1C2C3'
  }
});

export default ArtistWait
