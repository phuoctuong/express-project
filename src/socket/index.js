// @flow

import Server from 'socket.io';
import log from '../helper/log';
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
		log.info('Error', error.toString());
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
				log.info(`ClientId ${socket.payload.userId} joined room successfully`);
			});
		}
		log.info(`ClientId ${socket.payload.userId} connected`);
	});

	socket.on('leave', () => {
		socket.leave();
		log.info(`ClientId ${socket.payload.userId} left room`);
	});

	socket.on('broadcast', (data: SocketPayloadType) => {
		socket.broadcast.to(socket.payload.room).emit('broadcast', data);
	});

	socket.on('disconnect', () => {
		log.info(`ClientId ${socket.payload.userId} disconnected`);
	});

	socket.on('error', (error) => {
		log.error(`Error from ${socket.payload.userId}`, error.toString());
	});
};

io.on('connection', onConnect);

export default io;