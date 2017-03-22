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
import { phraseOptions } from '../utils';
import socket from '../socket';
import SubmitButton from './SubmitButton';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

//REMOVE SUBMITBUTTON IN PRODUCTION (it's in for testing purposes only)

class DrawingWait extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on(phraseOptions, captionArray => {
      Actions.drawkwardListCaptions({captions: captionArray})
    })
  }
  componentWillUnmount() {
    socket.off(phraseOptions);
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
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            Waiting for everyone to finish writing!
          </Text>
        </Svg>
        <SubmitButton
          onPress={() => {Actions.drawkwardListCaptions({captions: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'test2', 'test', 'this isn\'t fine', 'but hopefully', 'this is fine']})}}
          buttonText={'Go to ListCaptions Component!'}
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

export default DrawingWait;
