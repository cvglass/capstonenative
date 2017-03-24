'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { emitToSocket, JOIN_ROOM, SEND_TO_DRAWKWARD, SEND_TO_PICTIONARY  } from '../utils';
import socket from '../socket';
import Dimensions from 'Dimensions';
import SubmitButton from './SubmitButton';


const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class EnterRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on(SEND_TO_DRAWKWARD, () => {
      Actions.drawkwardCreateProfile();
    })
    socket.on(SEND_TO_PICTIONARY, () => {
      //NOTE: change to pictionary.
      Actions.drawkwardCreateProfile();
    })
  }

  componentWillUnmount() {
    socket.off(SEND_TO_DRAWKWARD);
    socket.off(SEND_TO_PICTIONARY);
  }

  render() {
    return (
      <View>
        <View style={styles.container} />
        <Text style={styles.text}>
          Enter your four letter code below.
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 100,
  },
  text: {
    fontFamily: 'Amatic SC',
    fontSize: 30,
    color: 'black',
  },
});

export default EnterRoom;
