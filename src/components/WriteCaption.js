'use strict';

import React from 'react';
import ReactNative from 'react-native';
const {
  StyleSheet,
  View,
  TextInput,
} = ReactNative;

import Svg, { Rect, Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Dimensions from 'Dimensions';
import SubmitButton from './SubmitButton';

import { emitToSocket, newGuess } from '../utils';



const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class WriteCaption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {caption: 'testing!'};
  }

  handlePress(emitMsg, emitObj) {
    emitToSocket(emitMsg, emitObj);
    Actions.drawkwardPhraseWait();
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
            Write a caption for
          </Text>
          <Text
            x={thisWidth / 2}
            y={thisHeight / 2 + 20}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
          >
            the drawing on the screen!
          </Text>
        </Svg>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(caption) => this.setState({caption})}
        value={this.state.caption}
      />
        <SubmitButton
          onPress={() => this.handlePress(newGuess, this.state.caption)}
          buttonText={'Submit Guess!'}
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

export default WriteCaption;
