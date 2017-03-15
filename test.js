'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Polyline, Rect} from 'react-native-svg';

var CIRCLE_SIZE = 20;

var PanResponderExample = React.createClass({

  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},

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
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: 'green',
      }
    };
  },

  getInitialState: function() {
    return {coordinates: []}
  },

  render: function() {
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg
          height="640"
          width="480">
          <Polyline
            points={this.state.coordinates.slice(0, -1).join('')}
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
        </Svg>
      </View>
    );
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    console.log('panrespondergrant')
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {

    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  },
});

var styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    flex: 1,
    paddingTop: 1,
  },
});

export default PanResponderExample;
