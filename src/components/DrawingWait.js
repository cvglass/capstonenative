'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;
import Svg, { Text, Ellipse } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';


const thisHeight = Dimensions.get('window').height - 50;
const thisWidth = Dimensions.get('window').width;

const DrawingWait = (props) => (
  <View>
    <Svg
      style={styles.container}
      height={thisHeight}
      width={thisWidth}
    >
      <Text
        x={thisWidth / 2}
        y={thisHeight / 2}
        stroke="none"
        color="black"
        fontSize="20"
        fontWeight="bold"
        textAnchor="middle"
      >
        Waiting for all drawings!
      </Text>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1C2C3'
  }
});

export default DrawingWait;
