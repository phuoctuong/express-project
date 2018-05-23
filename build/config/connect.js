'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sequelize = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _continuationLocalStorage = require('continuation-local-storage');

var _continuationLocalStorage2 = _interopRequireDefault(_continuationLocalStorage);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

var _seqlizeLog = require('../helper/seqlizeLog');

var _seqlizeLog2 = _interopRequireDefault(_seqlizeLog);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = void 0;
var namespace = _continuationLocalStorage2.default.createNamespace('own-namespace');
_sequelize2.default.useCLS(namespace); // used for passing transactions automatically

var env = process.env.NODE_ENV || 'development';

var connect = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(callback) {
		var config;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						config = _db2.default[env];

						exports.sequelize = sequelize = new _sequelize2.default(config.database, config.username, config.password, {
							host: config.host,
							dialect: config.dialect,
							define: config.define,
							logging: _seqlizeLog2.default,
							operatorsAliases: false
						});
						_context.next = 5;
						return sequelize.authenticate();

					case 5:
						(0, _models.initialModel)(sequelize);
						_context.next = 8;
						return sequelize.sync({
							force: env === 'test'
						});

					case 8:
						callback();
						_context.next = 14;
						break;

					case 11:
						_context.prev = 11;
						_context.t0 = _context['catch'](0);

						_logger2.default.error('Error Connection ' + _context.t0);

					case 14:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 11]]);
	}));

	return function connect(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.sequelize = sequelize;
exports.default = connect;
//# sourceMappingURL=connect.js.map
