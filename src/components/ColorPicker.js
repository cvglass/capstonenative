const React = require('react');
const ReactNative = require('react-native');
const {
  Alert,
  View,
  StyleSheet,
  TouchableHighlight,
} = ReactNative;
import { setColor } from '../reducers/drawkward';
import { connect } from 'react-redux';
// import socket from '../socket';

const mapDispatchToProps = dispatch => ({
  setColor: (color) => dispatch(setColor(color)),
})

class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    // this.onButtonPress = this.onButtonPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress(color) {
    console.log('color', this.props.color);
    this.props.setColor(color);
  }

  render() {
    return (
      <TouchableHighlight
          onPress={() => this.onButtonPress(this.props.color)} underlayColor="white" style={{
          marginHorizontal: 10,
          marginVertical: 3}}>
        <View
          style={{
            backgroundColor: this.props.color,
            width: 55,
            height: 55,
            borderRadius: 27.5,

          }}
        />
      </TouchableHighlight>
    )
  }

}





export default connect(null, mapDispatchToProps)(ColorPicker);
