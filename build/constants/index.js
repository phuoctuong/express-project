'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var UNIQUE_VIOLATION = exports.UNIQUE_VIOLATION = 'unique violation';
var PROVIDER = exports.PROVIDER = ['facebook', 'google'];
var GENDER = exports.GENDER = ['male', 'female'];
var GRAPH = exports.GRAPH = {
	facebook: {
		url: 'https://graph.facebook.com',
		version: 'v2.12',
		fields: ['id', 'name', 'first_name', 'last_name', 'email', 'gender', 'picture']
	}
};
//# sourceMappingURL=index.js.map
