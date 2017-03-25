'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Polyline, Text} from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import socket from '../socket';

import { setPolyLines, clearPolyLines } from '../reducers/drawkward';

import Dimensions from 'Dimensions';
import SubmitButton from './SubmitButton';
import { emitToSocket, newDrawing, FORCE_SUBMIT_DRAWING, colors } from '../utils';
import ColorPicker from './ColorPicker';

const mapStateToProps = state => ({
  polyLines: state.drawkward.polyLines,
  color: state.drawkward.color,
});

const mapDispatchToProps = dispatch => ({
  setPolyLines: (polyLines) => dispatch(setPolyLines(polyLines)),
  clearPolyLines: () => dispatch(clearPolyLines()),
})
const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

const TOP_PADDING = 196;
const BOT_PADDING = 48;

class DrawingPane extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = {};
    this.state = {
        coordinates: [],
        polyLines: [],
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

    socket.on(FORCE_SUBMIT_DRAWING, () => {
      console.log('this.props.phrase: ', this.props.phrase)
      emitToSocket(newDrawing,
      {
        image: this.convertImgStrToNums(this.props.polyLines),
        phrase: this.props.phrase,
      })
      socket.off(FORCE_SUBMIT_DRAWING);
      this.props.clearPolyLines();
      Actions.drawkwardDrawingWait();
    })
  }
  componentWillUnmount() {
    socket.off(FORCE_SUBMIT_DRAWING);
  }

  handlePress(emitMsg, emitObj) {
    // return ((emitMsg, emitObj) => {
      emitToSocket(emitMsg, emitObj);
      this.props.clearPolyLines();
      socket.off(FORCE_SUBMIT_DRAWING);
      Actions.drawkwardDrawingWait();
    // })
  }

  convertImgStrToNums(polyLines) {
    let numsArr = polyLines.map(arr => {
      return ({line: arr.line
      .filter((point, i) => {
        return (i % 2 === 0)
      })
      .map(point => {
        return +point;
      }), color: arr.color})
    })
    return numsArr;
  }

  render() {
    return (
      <View style={styles.padTop}>
        <View style={styles.colorPicker}>
          <View style={styles.colorPickerContainer}>
            {
              Object.keys(colors).map((color, i) => {
                return (
                  <ColorPicker key={i} color={color} />
                )
              })
            }

          </View>
        </View>
        <View style={{height: 1, backgroundColor: 'black'}} />
        <View {...this._panResponder.panHandlers}>
          <Svg
            style={styles.container}
            height={thisHeight - TOP_PADDING - BOT_PADDING}
            width={thisWidth}
          >
          {
            this.props.polyLines.map((line, i) => {
              return (
                <Polyline
                  key={i}
                  points={line.line.slice(0, -1).join('')}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="2"
                  />
              )
            })
          }

              <Polyline
                points={`${this.state.coordinates.slice(0, -1).join('')}`}
                fill="none"
                stroke={this.props.color}
                strokeWidth="2"
                />


            <Text
              x={thisWidth / 2}
              y={thisHeight / 2}
              stroke="none"
              color="black"
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="Amatic SC"
            >
              {this.props.phrase}
            </Text>
          </Svg>
          <SubmitButton
            onPress={() => this.handlePress(newDrawing, {
              image: this.convertImgStrToNums(this.props.polyLines),
              phrase: this.props.phrase,
            })}
            buttonText={'Submit Drawing!'}
          />
        </View>
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
    ))
  }

  _handlePanResponderMove(e, gestureState) {
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ',', (e.nativeEvent.pageY - TOP_PADDING).toString(), ' ')}
    ))
  }

  _handlePanResponderEnd(e, gestureState) {

    if (this.state.coordinates.length === 4) {
      let newPoint = this.state.coordinates.slice();
      newPoint[2] = (Number(newPoint[2]) + 2).toString();
      let newCoords = this.state.coordinates.concat(newPoint)
      let updatePoly = new Promise((resolve, reject) => {
        this.props.setPolyLines({line: newCoords, color: this.props.color});
        window.setTimeout(() => {
          resolve('done');
        }, 0)
      })
      .then(() => {
        this.setState((prevState, props) => ({
          // polyLines: prevState.polyLines.concat([newCoords]),
          coordinates: [],
        }))
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      let updatePoly = new Promise((resolve, reject) => {
        this.props.setPolyLines({line: this.state.coordinates, color: this.props.color});
        window.setTimeout(() => {
          resolve('done');
        }, 0)
      })
      .then(() => {
        this.setState((prevState, props) => ({
          // this.props.setPolyLines(this.state.coordinates)
          // polyLines: prevState.polyLines.concat([prevState.coordinates]),
          coordinates: [],
        }))
      })
      .catch(err => {
        console.error(err);
      })
    }

  }
}



var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  padTop: {
    paddingTop: 64,
    flex: 1,
    // justifyContent: 'flex-end'
  },
  colorPicker: {
    height: 132,
    backgroundColor: 'white',
    // backgroundColor: '#E0FFFF'
  },
  colorPickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawingPane);
