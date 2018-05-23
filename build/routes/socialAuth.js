'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _passportGoogleOauth = require('passport-google-oauth');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _auth = require('../config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _daos = require('../daos');

var _jwt = require('../helper/jwt');

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookStrategy = _passportFacebook2.default.Strategy;
var GoogleStrategy = _passportGoogleOauth2.default.OAuth2Strategy;
var router = _express2.default.Router();

_passport2.default.use(new FacebookStrategy((0, _extends3.default)({}, _auth2.default.facebookAuth), function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accessToken, refreshToken, profile, done) {
		var id, name, gender, emails, photos, userAccount, rs, token, refToken;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_logger2.default.info('Passport Facebook');
						_context.prev = 1;
						id = profile.id, name = profile.name, gender = profile.gender, emails = profile.emails, photos = profile.photos;

						if (!(emails.length === 0)) {
							_context.next = 5;
							break;
						}

						return _context.abrupt('return', done(null, false));

					case 5:
						userAccount = {
							email: emails[0].value,
							UserProfile: {
								firstName: name.givenName || null,
								lastName: name.familyName || null,
								gender: gender || null,
								profileImg: photos[0] ? photos[0].value : null
							},
							LoginProvider: {
								socialId: id,
								accessToken: accessToken,
								refreshToken: refreshToken || null,
								provider: 'facebook'
							}
						};
						_context.next = 8;
						return _daos.userAccountDAO.findOrCreateSocial(userAccount, 'facebook');

					case 8:
						rs = _context.sent;
						token = (0, _jwt.signJWT)({
							id: rs[0].id,
							provider: 'facebook'
						});
						refToken = (0, _jwt.signJWT)({
							id: rs[0].id,
							provider: 'facebook'
						}, '7d');
						_context.next = 13;
						return rs[0].update({
							token: token,
							status: true
						});

					case 13:
						return _context.abrupt('return', done(null, {
							token: token,
							refreshToken: refToken
						}));

					case 16:
						_context.prev = 16;
						_context.t0 = _context['catch'](1);

						_logger2.default.error('Passport Facebook Error ' + _context.t0.toString());
						return _context.abrupt('return', done(_context.t0));

					case 20:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 16]]);
	}));

	return function (_x, _x2, _x3, _x4) {
		return _ref.apply(this, arguments);
	};
}()));

_passport2.default.use(new GoogleStrategy((0, _extends3.default)({}, _auth2.default.googleAuth), function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(accessToken, refreshToken, profile, done) {
		var id, name, gender, emails, photos, userAccount, rs, token, refToken;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_logger2.default.info('Passport Google');
						_context2.prev = 1;
						id = profile.id, name = profile.name, gender = profile.gender, emails = profile.emails, photos = profile.photos;

						if (!(emails.length === 0)) {
							_context2.next = 5;
							break;
						}

						return _context2.abrupt('return', done(null, false));

					case 5:
						userAccount = {
							email: emails[0].value,
							UserProfile: {
								firstName: name.givenName || null,
								lastName: name.familyName || null,
								gender: gender || null,
								profileImg: photos[0] ? photos[0].value : null
							},
							LoginProvider: {
								socialId: id,
								accessToken: accessToken,
								refreshToken: refreshToken || null,
								provider: 'google'
							}
						};
						_context2.next = 8;
						return _daos.userAccountDAO.findOrCreateSocial(userAccount, 'google');

					case 8:
						rs = _context2.sent;
						token = (0, _jwt.signJWT)({
							id: rs[0].id,
							provider: 'google'
						});
						refToken = (0, _jwt.signJWT)({
							id: rs[0].id,
							provider: 'google'
						});
						_context2.next = 13;
						return rs[0].update({
							token: token,
							status: true
						});

					case 13:
						return _context2.abrupt('return', done(null, {
							token: token,
							refreshToken: refToken
						}));

					case 16:
						_context2.prev = 16;
						_context2.t0 = _context2['catch'](1);

						_logger2.default.error('Passport Google ' + _context2.t0.toString());
						return _context2.abrupt('return', done(_context2.t0));

					case 20:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[1, 16]]);
	}));

	return function (_x5, _x6, _x7, _x8) {
		return _ref2.apply(this, arguments);
	};
}()));

router.get('/facebook', _passport2.default.authenticate('facebook', {
	scope: ['public_profile', 'email', 'user_birthday']
}));

router.get('/facebook/callback', _passport2.default.authenticate('facebook', {
	failureRedirect: '/auth/facebook/callback_error',
	session: false
}), function (req, res) {
	res.status(200).json({
		code: 200,
		error: false,
		message: 'Login Successfully',
		data: (0, _extends3.default)({}, req.user)
	});
});

router.get('/facebook/callback_error', function (req, res) {
	_logger2.default.error('Passport Facebook Callback Error');
	res.status(200).json({
		code: 200,
		error: true,
		message: 'Login Failed'
	});
});

router.get('/google', _passport2.default.authenticate('google', {
	scope: ['profile', 'email']
}));

router.get('/google/callback', _passport2.default.authenticate('google', {
	failureRedirect: '/auth/google/callback_error',
	session: false
}), function (req, res) {
	res.status(200).json({
		code: 200,
		error: false,
		message: 'Login Successfully',
		data: (0, _extends3.default)({}, req.user)
	});
});

router.get('/google/callback_error', function (req, res) {
	_logger2.default.error('Passport Google Callback Error');
	res.status(200).json({
		code: 200,
		error: true,
		message: 'Login Failed'
	});
});

router.post('/profile', function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var userAccount, rs, token, refToken;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_logger2.default.error('Profile Api Router: POST /profile');
						_context3.prev = 1;
						userAccount = {
							email: req.body.email,
							UserProfile: {
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								gender: req.body.gender || null,
								profileImg: req.body.profileImg
							},
							LoginProvider: {
								socialId: req.body.id,
								accessToken: req.body.accessToken,
								refreshToken: req.body.refreshToken || null,
								provider: req.body.provider
							}
						};
						_context3.next = 5;
						return _daos.userAccountDAO.findOrCreateSocial(userAccount, req.body.provider);

					case 5:
						rs = _context3.sent;
						token = (0, _jwt.signJWT)({
							id: rs[0].id,
							provider: req.body.provider
						});
						refToken = (0, _jwt.signJWT)({
							id: rs[0].id,
							provider: req.body.provider
						});
						_context3.next = 10;
						return rs[0].update({
							token: token,
							refreshToken: refToken
						});

					case 10:
						return _context3.abrupt('return', res.status(200).json({
							code: 200,
							error: false,
							data: {
								token: token,
								refreshToken: refToken
							}
						}));

					case 13:
						_context3.prev = 13;
						_context3.t0 = _context3['catch'](1);

						_logger2.default.error('Profile Api Router: POST /profile');
						return _context3.abrupt('return', res.status(200).json({
							code: 200,
							error: true,
							message: 'Can\'t Save Profile'
						}));

					case 17:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[1, 13]]);
	}));

	return function (_x9, _x10) {
		return _ref3.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=socialAuth.js.map
