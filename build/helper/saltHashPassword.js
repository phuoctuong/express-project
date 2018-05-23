'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.decrypt = exports.encrypt = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var algorithm = 'aes-256-cbc';

var maxLength = 15;

var getRandomBytes = function getRandomBytes(length) {
	return _crypto2.default.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

var encrypt = function encrypt(data) {
	var key = getRandomBytes(maxLength);
	var cipher = _crypto2.default.createCipher(algorithm, key);
	var crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return {
		salt: key,
		value: crypted
	};
};

var decrypt = function decrypt(data, key) {
	var decipher = _crypto2.default.createDecipher(algorithm, key);
	var decrypted = decipher.update(data, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};

exports.encrypt = encrypt;
exports.decrypt = decrypt;
//# sourceMappingURL=saltHashPassword.js.map
