import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
	socket = io('http://localhost:8000');
	console.log(`Connecting socket...`);
	if (socket) socket.connect();
};

export const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if (socket) socket.disconnect();
};

export const createRoomSocket = (data) => {
	console.log('Creating Room');
	if (socket) {
		socket.emit('createRoom', data);
	}
};

export const joinRoomSocket = (data) => {
	console.log('Joined Room');
	if (socket) {
		socket.emit('joinRoom', data);
	}
};
