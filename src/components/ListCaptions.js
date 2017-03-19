'use strict';

import React from 'react';
import ReactNative from 'react-native';
const {
  StyleSheet,
  View,
} = ReactNative;

import { emitToSocket, selectCaption } from '../utils';
import SubmitButton from './SubmitButton';


class ListCaptions extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress(emitMsg, emitObj) {
    emitToSocket(emitMsg, emitObj);
    Actions.drawkwardGuessWait();
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
        {this.props.captions.map(caption => {
          return (
            <SubmitButton
              onPress={() => this.handlePress(selectCaption, caption)}
              buttonText={caption}
            />
          )
        })}
      </View>
    )
  }
}

export default ListCaptions
