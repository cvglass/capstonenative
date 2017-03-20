import socket from './socket';


//emit message constants

export const sendCoordinatesFromIOS = 'sendCoordinatesFromIOS';
export const newGuess = 'newGuess';
export const selectCaption = 'selectCaption';

//receive message constants
export const writeCaption = 'writeCaption';
export const phraseOptions = 'phraseOptions';
export const startGame = 'startGame'

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  socket.emit(emitMsg, emitObj)
}
