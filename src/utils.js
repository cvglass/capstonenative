import socket from './socket';


//emit message constants

export const sendCoordinatesFromIOS = 'sendCoordinatesFromIOS';


//receive message constants
export const receiveDrawing = 'receiveDrawing';

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  socket.emit(emitMsg, emitObj)
}
