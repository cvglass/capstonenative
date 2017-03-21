import io from 'socket.io-client';

const socket = io('http://172.28.118.111:1337', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('im now connected')
})

export default socket;
