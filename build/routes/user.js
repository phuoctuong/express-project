'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _daos = require('../daos');

var _middleware = require('./middleware');

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/me', _middleware.authMiddleware, function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var id, user;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_logger2.default.info('User Router: GET /me');
						_context.prev = 1;
						id = res.locals.user.id;
						_context.next = 5;
						return _daos.userAccountDAO.findById(id);

					case 5:
						user = _context.sent;

						res.status(200).json({
							code: 200,
							error: false,
							data: user
						});
						_context.next = 13;
						break;

					case 9:
						_context.prev = 9;
						_context.t0 = _context['catch'](1);

						_logger2.default.error('User Router: GET /me ' + _context.t0.toString());
						res.status(500).json({
							code: 500,
							error: true,
							message: 'Get Profile Failed'
						});

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 9]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=user.js.map
