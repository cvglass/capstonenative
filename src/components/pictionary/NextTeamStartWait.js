'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Text } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import { emitToSocket, START_TURN } from '../../utils';
import socket from '../../socket'
// import SubmitButton from '../SubmitButton';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class NextTeamStartWait extends React.Component {
  constructor(props) {
    super(props);
    // this.handlePress = this.handlePress.bind(this)
  }

  componentDidMount() {
    console.log('I am on NextTeamStartWait')
    socket.on(START_TURN, () => {
      console.log('going from NextTeamStartWait to drawing')
      Actions.pictionaryDrawingPane()
    })
  }

  componentWillUnmount() {
    console.log('leaving NextTeamStartWait')
    socket.off(START_TURN);
  }

  // handlePress(emitMsg) {
  //   emitToSocket(emitMsg);
  //   Actions.pictionaryDrawingPane();
  // }

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
            y={thisHeight / 2 - 100}
            stroke="none"
            color="black"
            fontSize="30"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            It's your turn to draw!
          </Text>
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
            Press start on the main screen!
          </Text>
        </Svg>
        {/*<SubmitButton
          onPress={() => this.handlePress(sendStartGame)}
          buttonText={'Start!'}
        />*/}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

export default NextTeamStartWait;
