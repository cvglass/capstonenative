import io from 'socket.io-client';

const socket = io('http://192.168.1.103:1337', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('im now connected')
})

export default socket;
