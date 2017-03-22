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
import { writeCaption, youAreTheArtist } from '../utils';
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
    socket.on(youAreTheArtist, () => {
      Actions.drawkwardArtistWait();
    })
    socket.on(writeCaption, () => {
      Actions.drawkwardWriteCaption();
    })
  }
  componentWillUnmount() {
    socket.off(youAreTheArtist);
    socket.off(writeCaption);
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
            Waiting for all drawings!
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
    backgroundColor: 'white'
  }
});

export default DrawingWait;
