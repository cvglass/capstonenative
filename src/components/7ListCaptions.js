'use strict';

import React from 'react';
import ReactNative from 'react-native';
const {
  StyleSheet,
  View,
} = ReactNative;

import { emitToSocket, selectPhrase } from '../utils';
import SubmitButton from './SubmitButton';
import { Actions } from 'react-native-router-flux'
import Dimensions from 'Dimensions';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

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
      <View style={styles.separator}>
        <View style={styles.separator} />
        <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-around'}}>
          {this.props.captions.map((caption, i) => {
            return (
              <SubmitButton
                key={i}
                onPress={() => this.handlePress(selectPhrase, caption)}
                buttonText={caption}
              />
            )
          })}
        </View>
        <View style={styles.separator} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1
  }
});

export default ListCaptions
