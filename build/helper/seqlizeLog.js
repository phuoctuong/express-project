'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seqlizeLog = function seqlizeLog(message) {
	var writeStream = _fs2.default.createWriteStream(_path2.default.resolve(process.cwd(), 'scripts.txt'), {
		flags: 'a'
	});
	writeStream.write(message, 'UTF8');
	writeStream.end('\n');
	writeStream.on('error', function (error) {
		return _logger2.default.error(error.stack);
	});
};

exports.default = seqlizeLog;
//# sourceMappingURL=seqlizeLog.js.map
