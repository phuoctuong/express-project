'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisClient = void 0;

if (!redisClient) {
	redisClient = _redis2.default.createClient({
		host: _db2.default.redis.host,
		port: _db2.default.redis.port
	});

	redisClient.auth(_db2.default.redis.password, function (err) {
		if (err) {
			_logger2.default.error('Error Auth in Redis ' + err);
		}
	});

	redisClient.on('ready', function () {
		_logger2.default.info('Redis is ready');
	});

	redisClient.on('error', function (err) {
		_logger2.default.error('Error in Redis ' + err);
	});
}

exports.default = redisClient;
//# sourceMappingURL=index.js.map
