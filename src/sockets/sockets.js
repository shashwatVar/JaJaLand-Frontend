import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
	socket = io('http://localhost:8000/game');
	console.log(`Connecting socket...`);
	if (socket) socket.connect();
};

export const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if (socket) socket.disconnect();
};
