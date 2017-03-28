'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
  TextInput,
  Slider,
  Text,
} = ReactNative;
import Svg, { Polyline } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setPolyLines, clearPolyLines } from '../../reducers/drawkward';
import { createTeam } from '../../reducers/pictionary'

import Dimensions from 'Dimensions';
import SubmitButton from '../SubmitButton';
import { emitToSocket, NEW_TEAM } from '../../utils';

const mapStateToProps = state => ({
  polyLines: state.drawkward.polyLines,
});

const mapDispatchToProps = dispatch => ({
  setPolyLines: (polyLines) => dispatch(setPolyLines(polyLines)),
  clearPolyLines: () => dispatch(clearPolyLines()),
  createTeam: teamData => dispatch(createTeam(teamData))
})

const thisHeight = Dimensions.get('window').height;
const thisWidth = Dimensions.get('window').width;

const TOP_PADDING = 200;
const BOT_PADDING = 52;

class CreateTeamProfile extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = {};
    this.state = {
        coordinates: [],
        polyLines: [],
        teamName: 'Enter your team name here!',
        sliderValue: 2
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
      emitToSocket(emitMsg, emitObj);
      this.props.clearPolyLines();
      this.props.createTeam(emitObj)
      Actions.pictionaryStartWait();
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
      <View>
        <View style={styles.padTop} />
        <TextInput
          style={{height: 45, borderColor: 'black', borderWidth: 1, borderRadius: 10, fontFamily: 'Amatic SC', fontWeight: 'bold', fontSize: 22, paddingHorizontal: 10}}
          onChangeText={(teamName) => this.setState({teamName})}
          placeholder={this.state.teamName}
        />
      <View height={88} style={{borderBottomColor: 'black', borderBottomWidth: 1}} >
          <Text style={styles.text} >
            Number of team members:
            {this.state.sliderValue && +this.state.sliderValue.toFixed(3)}
          </Text>
          <Slider
            minimumValue={2}
            maximumValue={10}
            step={1}
            onValueChange={(value) => this.setState({sliderValue: value})} />
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

          </Svg>
        <View style={{height: 5}} />
          <SubmitButton
            onPress={() => this.handlePress(NEW_TEAM, {
              name: this.state.teamName,
              portrait: this.convertImgStrToNums(this.props.polyLines),
              members: this.state.sliderValue,
            })}
            buttonText={'Submit Avatar!'}
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
          // this.props.setPolyLines(this.state.coordinates)
          polyLines: prevState.polyLines.concat([prevState.coordinates]),
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
    paddingTop: 67,
    flex: 1,
    // justifyContent: 'flex-end'
  },
  text: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Amatic SC',

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamProfile);
