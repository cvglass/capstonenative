const React = require('react');
const ReactNative = require('react-native');
const {
  Alert,
  View,
} = ReactNative;
import Button from 'react-native-button';
import socket from './socket';



class SubmitDrawingButton extends React.Component {

  constructor(props) {
    super(props);
    this.onButtonPress = this.onButtonPress.bind(this);

  }


  onButtonPress() {
    Alert.alert('Button has been pressed!');
    console.log(this.props.polyLines);
    socket.emit('sendCoordinatesFromIOS', this.props.polyLines)
  }

  render() {
    return (
      <Button
       containerStyle={{padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: '#92b2e5'}}
       style={{fontSize: 20, color: 'white'}}
       onPress={() => this.onButtonPress()}>

        Press Me!

      </Button>
    )
  }

}

export default SubmitDrawingButton;
