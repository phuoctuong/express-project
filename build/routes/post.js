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

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

var _daos = require('../daos');

var _middleware = require('./middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:id', _middleware.authMiddleware, function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var rs;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_logger2.default.info('Post Router: GET /' + req.params.id);
						_context.prev = 1;
						_context.next = 4;
						return _daos.postDAO.findById(req.params.id, {});

					case 4:
						rs = _context.sent;


						res.status(200).json({
							code: 200,
							error: false,
							data: rs
						});
						_context.next = 12;
						break;

					case 8:
						_context.prev = 8;
						_context.t0 = _context['catch'](1);

						_logger2.default.error('Post Router ' + _context.t0.toString());
						res.status(500).json({
							code: 500,
							error: true,
							message: _context.t0.toString()
						});

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 8]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

router.post('/', _middleware.authMiddleware, function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var post, rs;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_logger2.default.info('Post Router: POST /');
						_context2.prev = 1;
						post = {
							title: req.body.title
						};
						_context2.next = 5;
						return _daos.postDAO.create(post);

					case 5:
						rs = _context2.sent;

						res.status(200).json({
							code: 200,
							error: false,
							data: rs
						});
						_context2.next = 13;
						break;

					case 9:
						_context2.prev = 9;
						_context2.t0 = _context2['catch'](1);

						_logger2.default.error('Post Router: POST ' + _context2.t0.toString());
						res.status(500).json({
							code: 500,
							error: true,
							message: _context2.t0.toString()
						});

					case 13:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[1, 9]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

router.post('/:id/comment', _middleware.authMiddleware, function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var post, rs;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_logger2.default.info('Post Router: POST /' + req.params.id + '/comment');
						_context3.prev = 1;
						_context3.next = 4;
						return _daos.postDAO.findById(req.params.id, {});

					case 4:
						post = _context3.sent;
						_context3.next = 7;
						return post.createComment({
							title: req.body.title,
							userAccountId: res.locals.user.id
						});

					case 7:
						rs = _context3.sent;


						res.status(200).json({
							code: 200,
							error: false,
							data: rs
						});
						_context3.next = 15;
						break;

					case 11:
						_context3.prev = 11;
						_context3.t0 = _context3['catch'](1);

						_logger2.default.error('Post Router: POST /:id/comment ' + _context3.t0.toString());
						res.status(500).json({
							code: 500,
							error: true,
							message: 'Interval Server Error'
						});

					case 15:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[1, 11]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=post.js.map
