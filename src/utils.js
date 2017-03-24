import socket from './socket';


//emit message constants

export const sendCoordinatesFromIOS = 'sendCoordinatesFromIOS';
export const newDrawing = 'new drawing';
export const newGuess = 'new guess';
export const selectPhrase = 'select phrase';
export const newUser = 'new user';
export const sendStartGame = 'send start game';
export const nextDrawing = 'next drawing';
export const JOIN_ROOM = 'join room';

//receive message constants
export const writeCaption = 'start caption'; // NOTE: startCaption on server-side
export const phraseOptions = 'phrase options';
export const startGame = 'start game';
export const gameOver = 'game over';
export const receiveRandomPhrase = 'receive random phrase';
export const youAreTheArtist = 'you are the artist';
export const scoreboard = 'scoreboard';
export const FORCE_SUBMIT_DRAWING = 'force submit drawing';
export const SEND_TO_DRAWKWARD = 'send to drawkward';
export const SEND_TO_PICTIONARY = 'send to pictionary'

//button press emit function
export const emitToSocket = (emitMsg, emitObj) => {
  console.log('emitted: ', emitMsg, emitObj)
  socket.emit(emitMsg, emitObj)
}


export const colors = {
  black: 'black',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  pink: 'pink',
  brown: 'brown',
  grey: 'grey',
}
