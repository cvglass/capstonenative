'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Polyline, Rect} from 'react-native-svg';
import SubmitDrawing from './SubmitDrawing'

var PanResponderExample = React.createClass({

  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,


  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 50;
    this._previousTop = 50;

  },

  getInitialState: function() {
    return {
      coordinates: [],
      polyLines: [],
    }
  },
  

  render: function() {
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg style={styles.container}
          height="500"
          width={500/16*9}
        >

          {/*
            */}
            <Polyline
              points={`${this.state.coordinates.slice(0,-1).join('')}`}
              fill="none"
              stroke="blue"
              strokeWidth="2"
              />

          {
            this.state.polyLines.map((line,i) => {
              // console.log(line)
              // console.log('coords', this.state.coordinates.slice(0,-1).join(''))
              // console.log('line', line.slice(0,-1).join(''))
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
        />
      </View>
    );
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    // console.log('handleEnd', this.state.polyLines)
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
    console.log('panrespondergrant')
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    console.log('handlepanrespondermove')
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    console.log('panresponderend');
    if(this.state.coordinates.length === 4) {
      // console.log('coordinates', this.state.coordinates)
      let newPoint = this.state.coordinates.slice();
      // console.log(newPoint)
      newPoint[2] = (Number(newPoint[2]) + 2).toString();
      // console.log(newPoint)
      this.setState((prevState, props) => ({

        coordinates: prevState.coordinates.concat(newPoint),
      }))
    }
    this.setState((prevState, props) => ({
      polyLines: prevState.polyLines.concat([prevState.coordinates]),
      coordinates: [],
    }))
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  },
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1C2C3'
  }
});

export default PanResponderExample;
