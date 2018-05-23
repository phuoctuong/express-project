'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.verifyJWT = exports.signJWT = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signJWT = function signJWT(obj) {
	var expiresTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _auth2.default.basicAuth.expiresIn;

	return _jsonwebtoken2.default.sign({
		data: obj
	}, _auth2.default.basicAuth.secretOrKey, {
		expiresIn: expiresTime,
		algorithm: _auth2.default.basicAuth.algorithm
	});
};

var verifyJWT = function verifyJWT(token) {
	var decode = _jsonwebtoken2.default.verify(token, _auth2.default.basicAuth.secretOrKey, {
		algorithm: _auth2.default.basicAuth.algorithm
	});
	return decode.data;
};

exports.signJWT = signJWT;
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.js.map
