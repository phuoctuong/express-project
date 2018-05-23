'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _log = require('./helper/log');

var _log2 = _interopRequireDefault(_log);

var _connect = require('./config/connect');

var _connect2 = _interopRequireDefault(_connect);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_passport2.default.initialize());

app.use('/auth', _routes.authRouter, _routes.socialRouter);
app.use('/api/users', _routes.userRouter);
app.use('/api/posts', _routes.postRouter);

app.get('/', function (req, res) {
	res.send('Welcome to our app');
});

// Handle Error
app.get('*', function (req, res) {
	res.status(404).json({
		code: 404,
		error: true,
		message: 'Not Found'
	});
});

app.use(function (err, req, res, next) {
	var code = err.status || 500;
	res.status(code).json({
		code: code,
		erorr: true,
		message: err.message || 'Something broken'
	});
});

if (process.env.NODE_ENV !== 'test') {
	(0, _connect2.default)(function () {
		_socket2.default.listen(server);
		server.listen(8080, function () {
			_log2.default.info('Listening server port 8080');
		});
	});
}

exports.default = app;
//# sourceMappingURL=app.js.map
