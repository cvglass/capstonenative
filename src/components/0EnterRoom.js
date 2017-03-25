'use strict';

import React from 'react';
import ReactNative from 'react-native';
const { StyleSheet, View } = ReactNative;
import { Actions } from 'react-native-router-flux';
import { emitToSocket, JOIN_ROOM, GO_TO_DRAWKWARD, GO_TO_PICTIONARY  } from '../utils';
import socket from '../socket';
import Dimensions from 'Dimensions';
import SubmitButton from './SubmitButton';
const { Text, TextInput } = ReactNative;


const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class EnterRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
    }

    this.handlePress = this.handlePress.bind(this);
  }


  componentWillMount() {
    socket.on(GO_TO_DRAWKWARD, () => {
      console.log('DRAWKWARD')
      Actions.drawkward();
    })
    socket.on(GO_TO_PICTIONARY, () => {
      //NOTE: change to pictionary.
      Actions.drawkwardCreateProfile();
    })
  }

  componentWillUnmount() {
    socket.off(GO_TO_DRAWKWARD);
    socket.off(GO_TO_PICTIONARY);
  }

  handlePress(emitMsg, emitObj) {
    emitToSocket(emitMsg, emitObj);
  }

  render() {
    return (
      <View>
        <View style={styles.container} />
        <Text style={styles.text}>
          Enter your four letter code below.
        </Text>
        <TextInput
          style={{height: 45, borderColor: 'black', borderWidth: 1, borderRadius: 10, fontFamily: 'Amatic SC', fontWeight: 'bold', fontSize: 28, paddingHorizontal: 10}}
          onChangeText={(room) => this.setState({room})}
          placeholder={this.state.room}
          maxLength={4} autoCorrect={false}
        />
        <View style={{height: 5}} />
        <SubmitButton
          onPress={() => this.handlePress(JOIN_ROOM, {
            room: this.state.room.toUpperCase(),
          })}
          buttonText={'Play!'}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: thisHeight * 0.35,
  },
  text: {
    fontFamily: 'Amatic SC',
    fontSize: 30,
    color: 'black',
  },
  testing: {
    width: 50,
    height: 50,
    backgroundColor: 'brown'
  }
});

export default EnterRoom;
