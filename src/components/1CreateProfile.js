'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
  TextInput,
} = ReactNative;
import Svg, { Polyline, Rect} from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setPolyLines, clearPolyLines } from '../reducers/drawkward';

import Dimensions from 'Dimensions';
import SubmitButton from './SubmitButton';
import { emitToSocket, newUser, colors } from '../utils';
import ColorPicker from './ColorPicker';

const mapStateToProps = state => ({
  polyLines: state.drawkward.polyLines,
  color: state.drawkward.color,
});

const mapDispatchToProps = dispatch => ({
  setPolyLines: (polyLines) => dispatch(setPolyLines(polyLines)),
  clearPolyLines: () => dispatch(clearPolyLines()),
})

const TOP_PADDING = 196;
const BOT_PADDING = 96;


class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = {};
    this.state = {
        coordinates: [],
        polyLines: [],
        username: 'Enter your username here!',
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

  handlePress(emitMsg, emitObj) {
    // return ((emitMsg, emitObj) => {
      emitToSocket(emitMsg, emitObj);
      this.props.clearPolyLines();
      Actions.drawkwardStartWait();
    // })
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
            <ColorPicker />
          </View>
        </View>
        <View {...this._panResponder.panHandlers}>
          <Svg
            style={styles.container}
            height={Dimensions.get('window').height - TOP_PADDING - BOT_PADDING}
            width={Dimensions.get('window').width}
          >

              <Polyline
                points={`${this.state.coordinates.slice(0, -1).join('')}`}
                fill="none"
                stroke={this.props.color}
                strokeWidth="2"
                />

            {
              this.props.polyLines.map((line, i) => {
                return (
                  <Polyline
                    key={i}
                    points={line.slice(0, -1).join('')}
                    fill="none"
                    stroke={this.props.color}
                    strokeWidth="2"
                  />
                )
              })
            }

          </Svg>
        </View>
        <View style={styles.botContainer}>
            <TextInput
              style={{height: 45, borderColor: 'black', borderWidth: 1, borderRadius: 10, fontFamily: 'Amatic SC', fontWeight: 'bold', fontSize: 22, paddingHorizontal: 10}}
              onChangeText={(username) => this.setState({username})}
              placeholder={this.state.username}
            />
            <View style={{height: 5}} />
            <SubmitButton
              onPress={() => this.handlePress(newUser, {
                username: this.state.username,
                portrait: this.convertImgStrToNums(this.props.polyLines),
              })}
              buttonText={'Submit Profile!'}
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

    console.log('height', Dimensions.get('window').height - TOP_PADDING - BOT_PADDING)
    console.log('width', Dimensions.get('window').width)

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
        console.err(err);
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
          // this.props.setPolyLines(this.state.coordinates)
          polyLines: prevState.polyLines.concat([prevState.coordinates]),
          coordinates: [],
        }))
      })
      .catch(err => {
        console.err(err);
      })
    }

  }
}



var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 0
  },
  botContainer: {



  },
  padTop: {
    paddingTop: 64,
    flex: 1,
    // justifyContent: 'flex-end'
  },
  colorPicker: {
    height: 132,
    backgroundColor: '#E0FFFF',
  },
  colorPickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },


});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
