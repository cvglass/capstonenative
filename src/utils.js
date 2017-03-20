import socket from './socket';


//emit message constants

export const sendCoordinatesFromIOS = 'sendCoordinatesFromIOS';
export const newGuess = 'newGuess';
export const selectCaption = 'selectCaption';
export const newUser = 'newUser';
export const sendStartGame = 'sendStartGame';

//receive message constants
export const writeCaption = 'writeCaption';
export const phraseOptions = 'phraseOptions';
export const startGame = 'startGame'
export const gameOver = 'gameOver';
export const receiveRandomPhrase = 'receiveRandomPhrase';

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  socket.emit(emitMsg, emitObj)
}
