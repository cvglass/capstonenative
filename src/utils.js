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

//pictionary

//emit message constants
export const NEW_TEAM = 'new team';
export const FETCH_NEXT_WORD = 'next word';
export const CORRECT_GUESS = 'correct guess';
export const SKIP = 'skip';
export const NEW_LINE = 'new line';
export const NEW_COORDINATES = 'new coordinates';

//receive message constants
export const RECEIVE_NEW_WORD = 'receive new word';

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  console.log('emitted: ', emitMsg, emitObj)
  socket.emit(emitMsg, emitObj)
}

