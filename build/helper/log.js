'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = function () {
	function Log() {
		(0, _classCallCheck3.default)(this, Log);
	}

	(0, _createClass3.default)(Log, [{
		key: 'error',
		value: function error() {
			for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
				messages[_key] = arguments[_key];
			}

			console.error(_chalk2.default.red(messages.join(' ')));
		}
	}, {
		key: 'info',
		value: function info() {
			for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				messages[_key2] = arguments[_key2];
			}

			console.info(_chalk2.default.green(messages.join(' ')));
		}
	}, {
		key: 'warn',
		value: function warn() {
			for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				messages[_key3] = arguments[_key3];
			}

			console.warn(_chalk2.default.yellow(messages.join(' ')));
		}
	}]);
	return Log;
}();

var log = new Log();

exports.default = log;
//# sourceMappingURL=log.js.map
