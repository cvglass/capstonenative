import React from 'react';
import ReactNative, {
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import Svg, { Polyline, Rect} from 'react-native-svg';

class SvgTest extends React.Component {
  render() {
    return (
      <Svg
        width="100"
        height="100"
      >
        <Polyline
          points="10,10 20,12 30,20 40,60 60,70 95,90"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
      </Svg>
    )
  }
}

export default SvgTest;
