'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logPath = _path2.default.join(process.cwd(), 'log'); // levels: {
// 	error: 0,
// 	warn: 1,
// 	info: 2,
// 	verbose: 3,
// 	debug: 4,
// 	silly: 5
// }

if (!_fs2.default.existsSync(logPath)) {
	_fs2.default.mkdirSync(logPath);
}

var myFormat = _winston2.default.format.printf(function (info) {
	return info.timestamp + ' ' + info.level + ': ' + info.message;
});

var logger = _winston2.default.createLogger({
	format: _winston2.default.format.combine(_winston2.default.format.simple()),
	exceptionHandlers: [new _winston2.default.transports.File({ filename: _path2.default.join(logPath, 'exceptions.log') })],
	transports: [new _winston2.default.transports.File({ filename: _path2.default.join(logPath, 'error.log'), level: 'error', timestamp: true }), new _winston2.default.transports.File({
		filename: _path2.default.join(logPath, 'all.log'),
		timestamp: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5
	})]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new _winston2.default.transports.Console({
		format: _winston2.default.format.combine(_winston2.default.format.timestamp(), _winston2.default.format.colorize(), myFormat)
	}));
}

exports.default = logger;
//# sourceMappingURL=logger.js.map
