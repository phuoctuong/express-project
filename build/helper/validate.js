"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EMAIL_REGEX = /^[A-Za-z0-9!#$%&‘*+-/=?^_`{|}~]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*$/;
var PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\!\\@\\#\\$\\%\\&\\*]).{8,}$/;

var validateEmail = exports.validateEmail = function validateEmail(email) {
	return EMAIL_REGEX.test(email);
};

var validatePassword = exports.validatePassword = function validatePassword(password) {
	return PASSWORD_REGEX.test(password);
};

var validateEmptyString = exports.validateEmptyString = function validateEmptyString(str) {
	return str.length > 0;
};
//# sourceMappingURL=validate.js.map
