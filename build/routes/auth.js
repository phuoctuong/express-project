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

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

var _daos = require('../daos');

var _middleware = require('./middleware');

var _jwt = require('../helper/jwt');

var _saltHashPassword = require('../helper/saltHashPassword');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/token', _middleware.authMiddleware, function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var id, token, refreshToken;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_logger2.default.info('Auth Router: POST /token');
						id = res.locals.user.id;
						token = (0, _jwt.signJWT)({
							id: id
						});
						refreshToken = (0, _jwt.signJWT)({
							id: id
						}, '7d');


						res.status(200).json({
							code: 200,
							error: false,
							data: {
								token: token,
								refreshToken: refreshToken
							}
						});

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

router.post('/logout', _middleware.authMiddleware, function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var id, rs;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_logger2.default.info('Auth Router: POST /logout');
						_context2.prev = 1;
						id = res.locals.user.id;
						_context2.next = 5;
						return _daos.userAccountDAO.update({ status: false }, {
							id: id,
							status: true
						});

					case 5:
						rs = _context2.sent;


						if (rs[0] === 0) {
							res.status(401).json({
								code: 401,
								error: true,
								message: 'Can\'t Logout Of This Account'
							});
						} else {
							res.status(200).json({
								code: 200,
								error: false,
								message: 'Logout Successfully'
							});
						}
						_context2.next = 13;
						break;

					case 9:
						_context2.prev = 9;
						_context2.t0 = _context2['catch'](1);

						_logger2.default.error('Auth Router: POST /logout ' + _context2.t0.toString());
						res.status(200).json({
							code: 200,
							error: true,
							message: 'Logout Failed'
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

router.post('/login', function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var userAccount, pwd, token, refreshToken;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_logger2.default.info('Auth Router: POST /login');
						_context3.prev = 1;
						_context3.next = 4;
						return _daos.userAccountDAO.findOneBy({
							email: req.body.email
						});

					case 4:
						userAccount = _context3.sent;
						pwd = (0, _saltHashPassword.decrypt)(userAccount.get('password'), userAccount.get('saltHash'));

						if (!(pwd !== req.body.password)) {
							_context3.next = 8;
							break;
						}

						return _context3.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							data: {
								password: 'Password Is Incorrect'
							}
						}));

					case 8:
						token = (0, _jwt.signJWT)({
							id: userAccount.get('id')
						});
						refreshToken = (0, _jwt.signJWT)({
							id: userAccount.get('id')
						}, '7d');
						_context3.next = 12;
						return userAccount.update({
							token: token,
							status: true
						});

					case 12:
						return _context3.abrupt('return', res.status(200).json({
							code: 200,
							error: false,
							message: 'Login Successfully',
							data: {
								token: token,
								refreshToken: refreshToken
							}
						}));

					case 15:
						_context3.prev = 15;
						_context3.t0 = _context3['catch'](1);

						_logger2.default.error('Auth Router: POST /login ' + _context3.t0.toString());
						return _context3.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							data: {
								email: 'Email Is Incorrect'
							}
						}));

					case 19:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[1, 15]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

router.post('/signup', _middleware.validateFormMiddleware, function () {
	var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var encrypted, userAccount, rs, isNewEmail, errors, message;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_logger2.default.info('Auth Router: POST /signup');
						_context4.prev = 1;

						// Encrypt password
						encrypted = (0, _saltHashPassword.encrypt)(req.body.password);
						userAccount = {
							email: req.body.email,
							password: encrypted.value,
							saltHash: encrypted.salt,
							UserProfile: {
								firstName: req.body.firstName,
								lastName: req.body.lastName
							}
						};
						_context4.next = 6;
						return _daos.userAccountDAO.findOrCreate(userAccount);

					case 6:
						rs = _context4.sent;
						isNewEmail = rs[1];

						if (isNewEmail) {
							_context4.next = 10;
							break;
						}

						return _context4.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							data: {
								email: 'Email Is Existed'
							}
						}));

					case 10:
						return _context4.abrupt('return', res.status(200).json({
							code: 200,
							error: false,
							message: 'Sign Up Successfully'
						}));

					case 13:
						_context4.prev = 13;
						_context4.t0 = _context4['catch'](1);

						_logger2.default.error('Auth Router: POST /signup ' + _context4.t0.toString());
						errors = _context4.t0.errors;
						message = 'Something broken';


						if (errors[0] && errors[0].type === _constants.UNIQUE_VIOLATION) {
							message = errors[0].path + ' existed';
						}

						return _context4.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							data: {
								email: message
							}
						}));

					case 20:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[1, 13]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());

router.post('/lost-password', function () {
	var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var receiver, userAccount, pwdReminderToken, transporter, mailOptions;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_logger2.default.info('Auth Router: POST /lost-password');
						_context5.prev = 1;
						receiver = req.body.email;
						_context5.next = 5;
						return _daos.userAccountDAO.findOneBy({
							email: receiver
						});

					case 5:
						userAccount = _context5.sent;

						if (!userAccount) {
							_context5.next = 15;
							break;
						}

						pwdReminderToken = (0, _jwt.signJWT)({
							id: userAccount.get('id')
						});
						_context5.next = 10;
						return userAccount.update({
							passwordReminderToken: pwdReminderToken
						});

					case 10:
						transporter = _nodemailer2.default.createTransport({
							service: 'gmail',
							auth: {
								user: process.env.GMAIL_USER,
								pass: process.env.GMAIL_PASS
							}
						});
						mailOptions = {
							from: process.env.GMAIL_USER,
							to: receiver,
							subject: 'Lost Password',
							html: '<p>Token With Reset Password ' + pwdReminderToken + '</p>'
						};


						transporter.sendMail(mailOptions, function (err, info) {
							if (err) {
								return res.status(200).json({
									code: 200,
									error: true,
									data: {
										email: 'Server Can\'t Send Email'
									}
								});
							}
							return res.status(200).json({
								code: 200,
								error: false,
								data: {
									token: pwdReminderToken
								}
							});
						});
						_context5.next = 16;
						break;

					case 15:
						return _context5.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							data: {
								email: 'Email Is Not Registered'
							}
						}));

					case 16:
						_context5.next = 22;
						break;

					case 18:
						_context5.prev = 18;
						_context5.t0 = _context5['catch'](1);

						_logger2.default.error('Auth Router: POST /lost-password ' + _context5.t0.toString());
						return _context5.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							data: {
								email: 'Can\'t Send Email'
							}
						}));

					case 22:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[1, 18]]);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}());

router.post('/reset-password', _middleware.validateFormMiddleware, _middleware.authMiddleware, function () {
	var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var id, newPassword, userAccount, encrypted;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_logger2.default.info('Auth Router: POST /reset-password');
						_context6.prev = 1;
						id = res.locals.user.id;
						newPassword = req.body.password;
						_context6.next = 6;
						return _daos.userAccountDAO.findOneBy({
							id: id
						});

					case 6:
						userAccount = _context6.sent;

						if (!userAccount) {
							_context6.next = 12;
							break;
						}

						encrypted = (0, _saltHashPassword.encrypt)(newPassword);
						_context6.next = 11;
						return userAccount.update({
							password: encrypted.value,
							saltHash: encrypted.salt
						});

					case 11:
						return _context6.abrupt('return', res.status(200).json({
							code: 200,
							error: false,
							message: 'Reset Password Successfully'
						}));

					case 12:
						return _context6.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							message: 'Account Is Not Existed'
						}));

					case 15:
						_context6.prev = 15;
						_context6.t0 = _context6['catch'](1);

						_logger2.default.error('Auth Router: POST /reset-password ' + _context6.t0.toString());
						return _context6.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							message: 'Reset Password Failed'
						}));

					case 19:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[1, 15]]);
	}));

	return function (_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=auth.js.map
