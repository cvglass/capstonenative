const React = require('react');
const ReactNative = require('react-native');
const {
  Alert,
  View,
} = ReactNative;
import Button from 'react-native-button';
// import socket from '../socket';



class SubmitButton extends React.Component {

  constructor(props) {
    super(props);
    // this.onButtonPress = this.onButtonPress.bind(this);
    this.onButtonPress = props.onPress;
  }

  // onButtonPress() {
  //   Alert.alert('Button has been pressed!');
  //   console.log(this.props.polyLines);
  //   socket.emit('sendCoordinatesFromIOS', {portrait: this.props.polyLines})
  // }

  render() {
    return (
      <Button
       containerStyle={{padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#E0FFFF', borderRadius: 10, borderColor: 'black', borderWidth: 1}}
       style={{fontSize: 22, color: 'black', lineHeight: 25, fontWeight: 'bold', fontFamily: 'Amatic SC'}}
       onPress={this.onButtonPress}>

        {this.props.buttonText}

      </Button>
    )
  }

}

export default SubmitButton;
