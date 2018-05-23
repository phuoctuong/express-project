// @flow

type SocialType = {
	clientID: string,
	clientSecret: string,
	callbackURL: string,
	profileFields?: string[]
};

type BasicType = {
	secretOrKey: string,
	expiresIn: string,
	algorithm: jwt$Algorithm
};

type AuthType = {
	basicAuth: BasicType,
	googleAuth: SocialType,
	facebookAuth: SocialType
};

const auth: AuthType = {
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

export default auth;