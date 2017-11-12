const auth = {
	basicAuth: {
		secretOrKey: 'estore',
		algorithm: 'HS256',
		expiresIn: '1h'
	},
	googleAuth: {
		clientID: '',
		clientSecret: '',
		callbackURL: ''
	},
	facebookAuth: {
		clientID: '714333155432593',
		clientSecret: '7f6c0af9174821e3bb894d296ca8845a',
		callbackURL: 'http://localhost:8080/auth/facebook/callback',
		profileFields: ['id', 'name', 'gender', 'picture', 'email', 'birthday']
	}
};

export default auth;