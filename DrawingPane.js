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

import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';


var PanResponderExample = React.createClass({

  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },

  _panResponder: {},


  componentWillMount: function() {
    console.log(Dimensions.get('window').height)
    console.log(Dimensions.get('window').width)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });


  },

  getInitialState: function() {
    return {
      coordinates: [],
      polyLines: [],
    }
  },

  handleSubmitButtonPress () {

  },

  render: function() {
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg style={styles.container}
          height={Dimensions.get('window').height - 50}
          width={Dimensions.get('window').width}
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
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    e.persist();
    this.setState((prevState, props) => ({
      coordinates: prevState.coordinates.concat(e.nativeEvent.pageX.toString(), ",", e.nativeEvent.pageY.toString(), ' ')}
    ))
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
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

  },
});



var styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1C2C3'
  }
});

export default PanResponderExample;
