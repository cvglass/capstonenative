import socket from './socket';


//emit message constants

export const sendCoordinatesFromIOS = 'sendCoordinatesFromIOS';
export const newDrawing = 'new drawing';
export const newGuess = 'new guess';
export const selectPhrase = 'select phrase';
export const newUser = 'new user';
export const sendStartGame = 'send start game';
export const nextDrawing = 'next drawing';

//receive message constants
export const writeCaption = 'start caption'; // NOTE: startCaption on server-side
export const phraseOptions = 'phrase options';
export const startGame = 'start game';
export const gameOver = 'game over';
export const receiveRandomPhrase = 'receive random phrase';
export const youAreTheArtist = 'you are the artist';
export const scoreboard = 'scoreboard';

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  console.log('emitted: ', emitMsg, emitObj)
  socket.emit(emitMsg, emitObj)
}
