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
    this.state = {caption: 'Write a caption!'};
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
          height={thisHeight - 100}
          width={thisWidth}
        >
          <Text
            x={thisWidth / 2}
            y={thisHeight / 2 - 70}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            Write a caption for
          </Text>
          <Text
            x={thisWidth / 2}
            y={thisHeight / 2 - 50}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            the drawing on the screen!
          </Text>
        </Svg>

        <TextInput
          style={{height: 45, borderColor: 'black', borderWidth: 1, borderRadius: 10, fontFamily: 'Amatic SC', fontWeight: 'bold', fontSize: 28, paddingHorizontal: 10}}
          onChangeText={(caption) => this.setState({caption})}
          placeholder={this.state.caption}
          maxLength={45}
        />
        <View style={{height: 5}} />
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
    backgroundColor: 'white'
  }
});

export default WriteCaption;
