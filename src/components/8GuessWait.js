'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Text, Ellipse } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { writeCaption, gameOver, scoreboard } from '../utils';
import socket from '../socket';
import SubmitButton from './SubmitButton';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

//REMOVE SUBMITBUTTON IN PRODUCTION (it's in for testing purposes only)

class GuessWait extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on(writeCaption, () => {
      Actions.drawkwardWriteCaption();
    });
    socket.on(gameOver, () => {
      Actions.drawkwardGameOver();
    });
    socket.on(scoreboard, () => {
      console.log('hi!')
      Actions.drawkwardEndRound();
    })
  }
  componentWillUnmount() {
    socket.off(writeCaption);
    socket.off(gameOver);
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
            y={thisHeight / 2}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
          >
            Waiting for all guesses!
          </Text>
        </Svg>
        <SubmitButton
          onPress={() => {Actions.drawkwardWriteCaption()}}
          buttonText={'Go to WriteCaption Component!'}
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

export default GuessWait;
