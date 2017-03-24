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
import { emitToSocket, sendStartGame, FETCH_NEXT_WORD } from '../../utils';
import SubmitButton from '../SubmitButton';

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

class PictionaryStartWait extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this)
  }

  // componentWillMount() {
  //   socket.on(receiveRandomPhrase, (phraseString) => {
  //     Actions.pictionaryDrawingPane();
  //   });

  // }
  // componentWillUnmount() {
  //   socket.off(receiveRandomPhrase);
  // }

  handlePress(emitMsg) {
    emitToSocket(emitMsg);
    Actions.pictionaryDrawingPane();
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

export default PictionaryStartWait;
