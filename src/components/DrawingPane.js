'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Polyline, Rect} from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setPolyLines } from '../reducers/drawkward';

import Dimensions from 'Dimensions';
import SubmitDrawing from './SubmitDrawing';

const mapStateToProps = state => ({
  polyLines: state.drawkward.polyLines,
});

const mapDispatchToProps = dispatch => ({
  setPolyLines: (polyLines) => dispatch(setPolyLines(polyLines)),
})


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


  render() {
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg style={styles.container}
          height={Dimensions.get('window').height - 50}
          width={Dimensions.get('window').width}
        >
          
            <Polyline
              points={`${this.state.coordinates.slice(0,-1).join('')}`}
              fill="none"
              stroke="blue"
              strokeWidth="2"
              />

          {
            this.state.polyLines.map((line,i) => {
              return (
                <Polyline
                  key={i}
                  points={line.slice(0,-1).join('')}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              )
            })
          }

        </Svg>
        <SubmitDrawing
          polyLines={this.state.polyLines}
          onPress
        />
      </View>
    );
  }

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return true;
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return true;
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    if(this.state.coordinates.length === 4) {
      let newPoint = this.state.coordinates.slice();
      newPoint[2] = (Number(newPoint[2]) + 2).toString();
      this.setState((prevState, props) => ({
        coordinates: prevState.coordinates.concat(newPoint),
      }))
    }
    this.setState((prevState, props) => ({
      polyLines: prevState.polyLines.concat([prevState.coordinates]),
      coordinates: [],
    }))

  }
}



var styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1C2C3'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawingPane);
