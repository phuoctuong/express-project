'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var auth = {
	basicAuth: {
		secretOrKey: 'estore',
		algorithm: 'HS256',
		expiresIn: '1h'
	},
	googleAuth: {
		clientID: '450932602522-i0brqmv58lto09ptv8t4jlsrr1togr3s.apps.googleusercontent.com', //eslint-disable-line
		clientSecret: 'z6yAc56fTxL5aQCweG4MIyXs',
		callbackURL: 'http://localhost:8080/auth/google/callback'
	},
	facebookAuth: {
		clientID: '714333155432593',
		clientSecret: '7f6c0af9174821e3bb894d296ca8845a',
		callbackURL: 'http://localhost:8080/auth/facebook/callback',
		profileFields: ['id', 'name', 'gender', 'picture', 'email', 'birthday']
	}
};

exports.default = auth;
//# sourceMappingURL=auth.js.map
