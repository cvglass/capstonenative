import socket from './socket';


//emit message constants

export const sendCoordinatesFromIOS = 'sendCoordinatesFromIOS';
export const newGuess = 'newGuess';
export const selectCaption = 'selectCaption';

//receive message constants
export const writeCaption = 'writeCaption';

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  socket.emit(emitMsg, emitObj)
}
