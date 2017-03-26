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
import { emitToSocket, START_TURN, TURN_WAIT } from '../../utils';
import socket from '../../socket'
// import SubmitButton from '../SubmitButton';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class PictionaryStartWait extends React.Component {
  constructor(props) {
    super(props);
    // this.handlePress = this.handlePress.bind(this)
  }

  componentDidMount() {
    socket.on(START_TURN, () => {
      Actions.pictionaryDrawingPane()
    })

    socket.on(TURN_WAIT, () => {
      Actions.pictionaryTurnWait();
    })
  }

  componentWillUnmount() {
    socket.off(START_TURN);
    socket.off(END_TURN);
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
            y={thisHeight / 2 - 50}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            When everyone is ready, press Start!
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

export default PictionaryStartWait;
