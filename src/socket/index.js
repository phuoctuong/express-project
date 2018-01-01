// @flow

import Server from 'socket.io';
import logger from '../helper/logger';
import { verifyJWT } from '../helper/jwt';

const io = new Server({
	path: '/chat'
});

io.use((socket, next) => {
	try {
		const { query } = socket.handshake;
		const { id } = verifyJWT(query.token);
		socket.payload = { userId: id };
		next();
	} catch (error) {
		logger.error(`Socket Error: ${error.toString()}`);
		next(new Error('Authenticated Failed'));
	}
});

const onConnect = (socket) => {
	socket.on('join', (room: string) => {
		if (room) {
			socket.join(room, () => {
				socket.payload = {
					...socket.payload,
					room
				};
				logger.info(`Socket ClientId ${socket.payload.userId} joined room successfully`);
			});
		}
		logger.info(`Socket ClientId ${socket.payload.userId} connected`);
	});

	socket.on('leave', () => {
		socket.leave();
		logger.info(`Socket ClientId ${socket.payload.userId} left room`);
	});

	socket.on('broadcast', (data: SocketPayloadType) => {
		socket.broadcast.to(socket.payload.room).emit('broadcast', data);
	});

	socket.on('disconnect', () => {
		logger.info(`Socket ClientId ${socket.payload.userId} disconnected`);
	});

	socket.on('error', (error) => {
		logger.error(`Socket Error from ${socket.payload.userId}: ${error.toString()}`);
	});
};

io.on('connection', onConnect);

export default io;