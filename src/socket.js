import io from 'socket.io-client';

const socket = io('https://drawkward.herokuapp.com', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('im now connected')
})

export default socket;
