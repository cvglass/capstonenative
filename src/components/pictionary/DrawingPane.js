'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Polyline, Text} from 'react-native-svg';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Dimensions from 'Dimensions';
import SubmitButton from '../SubmitButton';

import socket from '../../socket';
import { setPolyLines, clearPolyLines } from '../../reducers/drawkward';
import { emitToSocket, RECEIVE_NEW_WORD, CORRECT_GUESS, SKIP, NEW_LINE, NEW_COORDINATES, END_TURN } from '../../utils';

const mapStateToProps = state => ({
  polyLines: state.drawkward.polyLines,
});

const mapDispatchToProps = dispatch => ({
  setPolyLines: (polyLines) => dispatch(setPolyLines(polyLines)),
  clearPolyLines: () => dispatch(clearPolyLines()),
})

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

const TOP_PADDING = 0;
const BOT_PADDING = 96;

class PictionaryDrawingPane extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = {};
    this.state = {
        coordinates: [],
        polyLines: [],
        currentWord: '',
    };
      this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
      this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
      this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
      this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
      this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this)
      this.handlePress = this.handlePress.bind(this)
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });

  }

  componentDidMount() {
    socket.on(RECEIVE_NEW_WORD, word => {
      this.setState({currentWord: word})
    })

    socket.on(END_TURN, () => {
      Actions.pictionaryTurnWait();
    })
  }

  componentWillUnmount() {
    socket.off(RECEIVE_NEW_WORD);
    socket.off(END_TURN);
  }

  handlePress(emitMsg, emitObj) {
    emitToSocket(emitMsg, emitObj);
    this.props.clearPolyLines();
  }

  convertImgStrToNums(polyLines) {
    let numsArr = polyLines.map(arr => {
      return arr
      .filter((point, i) => {
        return (i % 2 === 0)
      })
      .map(point => {
        return +point;
      })
    })
    return numsArr;
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg
          style={styles.container}
          height={thisHeight - TOP_PADDING - BOT_PADDING}
          width={thisWidth}
        >

            <Polyline
              points={`${this.state.coordinates.slice(0, -1).join('')}`}
              fill="none"
              stroke="black"
              strokeWidth="2"
              />

          {
            this.props.polyLines.map((line, i) => {
              return (
                <Polyline
                  key={i}
                  points={line.slice(0, -1).join('')}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              )
            })
          }

          <Text
            x={thisWidth / 2}
            y={thisHeight - 80}
            stroke="none"
            color="black"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Amatic SC"
          >
            {this.state.currentWord.text}
          </Text>
        </Svg>
        <SubmitButton
          onPress={() => this.handlePress(CORRECT_GUESS, {
            image: this.convertImgStrToNums(this.props.polyLines),
          })}
          buttonText={'Got it!'}
        />
      <View style={{height: 5}} />
        <SubmitButton
          onPress={() => this.handlePress(SKIP, {
            image: this.convertImgStrToNums(this.props.polyLines),
          })}
          buttonText={'Skip'}
        />
      </View>
    );
  }

  _handleStartShouldSetPanResponder(e, gestureState) {
    return true;
  }

  _handleMoveShouldSetPanResponder(e, gestureState) {
    return true;
  }

  _handlePanResponderGrant(e, gestureState) {
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ',', (e.nativeEvent.pageY - TOP_PADDING).toString(), ' ')}
    ));
    socket.emit(NEW_COORDINATES, [e.nativeEvent.pageX, e.nativeEvent.pageY])
  }

  _handlePanResponderMove(e, gestureState) {
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ',', (e.nativeEvent.pageY - TOP_PADDING).toString(), ' ')}
    ))
    socket.emit(NEW_COORDINATES, [e.nativeEvent.pageX, e.nativeEvent.pageY])
  }

  _handlePanResponderEnd(e, gestureState) {

    if (this.state.coordinates.length === 4) {
      let newPoint = this.state.coordinates.slice();
      newPoint[2] = (Number(newPoint[2]) + 2).toString();
      let newCoords = this.state.coordinates.concat(newPoint)
      let updatePoly = new Promise((resolve, reject) => {
        this.props.setPolyLines(newCoords);
        window.setTimeout(() => {
          resolve('done');
        }, 0)
      })
      .then(() => {
        this.setState((prevState, props) => ({
          polyLines: prevState.polyLines.concat([newCoords]),
          coordinates: [],
        }))
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      let updatePoly = new Promise((resolve, reject) => {
        this.props.setPolyLines(this.state.coordinates);
        window.setTimeout(() => {
          resolve('done');
        }, 0)
      })
      .then(() => {
        this.setState((prevState, props) => ({
          polyLines: prevState.polyLines.concat([prevState.coordinates]),
          coordinates: [],
        }))
      })
      .catch(err => {
        console.error(err);
      })
    }

    socket.emit(NEW_LINE)

  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryDrawingPane);
