'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

var _jwt = require('../helper/jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = new _socket2.default({
	path: '/chat'
});

io.use(function (socket, next) {
	try {
		var query = socket.handshake.query;

		var _verifyJWT = (0, _jwt.verifyJWT)(query.token),
		    id = _verifyJWT.id;

		socket.payload = { userId: id };
		next();
	} catch (error) {
		_logger2.default.error('Socket Error: ' + error.toString());
		next(new Error('Authenticated Failed'));
	}
});

var onConnect = function onConnect(socket) {
	socket.on('connect', function () {
		_logger2.default.info('Socket Client ' + socket.id + ' connected');
	});

	socket.on('join', function (room) {
		if (room) {
			socket.join(room, function () {
				socket.payload = (0, _extends3.default)({}, socket.payload, {
					room: room
				});
				_logger2.default.info('Socket ' + socket.id + ' - ClientId ' + socket.payload.userId + ' joined room successfully');
			});
		}
		_logger2.default.info('Socket ClientId ' + socket.payload.userId + ' connected');
	});

	socket.on('leave', function () {
		socket.leave();
		_logger2.default.info('Socket ClientId ' + socket.payload.userId + ' left room');
	});

	socket.on('broadcast', function (data) {
		socket.broadcast.to(socket.payload.room).emit('broadcast', data);
	});

	socket.on('disconnect', function () {
		_logger2.default.info('Socket ClientId ' + socket.payload.userId + ' disconnected');
	});

	socket.on('error', function (error) {
		_logger2.default.error('Socket Error from ' + socket.payload.userId + ': ' + error.toString());
	});
};

io.on('connection', onConnect);

exports.default = io;
//# sourceMappingURL=index.js.map
