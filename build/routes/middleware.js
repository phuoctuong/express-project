'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.validateFormMiddleware = exports.authMiddleware = undefined;

var _lodash = require('lodash');

var _jwt = require('../helper/jwt');

var _validate = require('../helper/validate');

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
	_logger2.default.info('Auth Middleware');
	try {
		var auth = req.header('Authorization').split(' ');
		if (auth[0] !== 'JWT') {
			throw new Error();
		}
		var token = auth[1];

		var _verifyJWT = (0, _jwt.verifyJWT)(token),
		    id = _verifyJWT.id;

		res.locals.user = { id: id };
		next();
	} catch (error) {
		_logger2.default.error('Auth Middleware ' + error.toString());
		res.status(401).json({
			code: 401,
			error: true,
			message: 'Authentication Failed'
		});
	}
};

var validateFormMiddleware = exports.validateFormMiddleware = function validateFormMiddleware(req, res, next) {
	_logger2.default.info('Form Validation Middleware');
	try {
		var _req$body = req.body,
		    _req$body$email = _req$body.email,
		    email = _req$body$email === undefined ? null : _req$body$email,
		    _req$body$password = _req$body.password,
		    password = _req$body$password === undefined ? null : _req$body$password,
		    _req$body$firstName = _req$body.firstName,
		    firstName = _req$body$firstName === undefined ? null : _req$body$firstName,
		    _req$body$lastName = _req$body.lastName,
		    lastName = _req$body$lastName === undefined ? null : _req$body$lastName;

		var validation = {};

		if (email !== null && !(0, _validate.validateEmail)(email)) {
			validation.email = ['It is not a valid email'];
		}

		if (password !== null && !(0, _validate.validatePassword)(password)) {
			validation.password = ['It is at least 8 letters', 'Must contain at least 1 uppercase letter, 1 lowercase letter and 1 number', 'Must contain at least special character'];
		}

		if (firstName !== null && !(0, _validate.validateEmptyString)(firstName)) {
			validation.firstName = ['It is not empty string'];
		}

		if (lastName !== null && !(0, _validate.validateEmptyString)(lastName)) {
			validation.lastName = ['It is not empty string'];
		}

		if (!(0, _lodash.isEmpty)(validation)) {
			return res.status(200).json({
				code: 200,
				error: true,
				data: validation
			});
		}
		next();
	} catch (error) {
		_logger2.default.error('Form Validation Middleware ' + error.toString());
		return res.status(200).json({
			code: 200,
			error: true,
			message: 'Validate Form Failed'
		});
	}
};
//# sourceMappingURL=middleware.js.map
