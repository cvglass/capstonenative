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
import { emitToSocket, sendStartGame, receiveRandomPhrase } from '../utils';
import socket from '../socket';
import SubmitButton from './SubmitButton';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

//REMOVE SUBMITBUTTON IN PRODUCTION (it's in for testing purposes only)

class GuessWait extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this)
  }

  componentWillMount() {
    socket.on(receiveRandomPhrase, (phraseString) => {
      Actions.drawkwardDrawingPane({phrase: phraseString});
    });

  }
  componentWillUnmount() {
    socket.off(receiveRandomPhrase);
  }

  handlePress(emitMsg) {
    emitToSocket(emitMsg)
    Actions.drawkwardDrawingPane();
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
            When everyone is ready, press Start!
          </Text>
        </Svg>
        <SubmitButton
          onPress={() => this.handlePress(sendStartGame)}
          buttonText={'Start!'}
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

export default GuessWait;
