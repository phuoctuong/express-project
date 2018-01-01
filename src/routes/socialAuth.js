// @flow

import express from 'express';
import passport from 'passport';
import passportFB from 'passport-facebook';
import passportGG from 'passport-google-oauth';
import configAuth from '../config/auth';
import { userAccountDAO } from '../daos';
import { signJWT } from '../helper/jwt';
import logger from '../helper/logger';

const FacebookStrategy = passportFB.Strategy;
const GoogleStrategy = passportGG.OAuth2Strategy;
const router = express.Router();

passport.use(new FacebookStrategy({
	...configAuth.facebookAuth
}, async (accessToken, refreshToken, profile, done) => {
	logger.info('Passport Facebook');
	try {
		const { id, name, gender, emails, photos } = profile;

		if (emails.length == 0) {
			return done(null, false);
		}

		const userAccount = {
			email: emails[0].value,
			UserProfile: {
				firstName: name.givenName || null,
				lastName: name.familyName || null,
				gender: gender || null,
				profileImg: photos[0] ? photos[0].value : null
			},
			LoginProvider: {
				socialId: id,
				accessToken,
				refreshToken: refreshToken || null,
				provider: 'facebook'
			}
		};

		const rs = await userAccountDAO.findOrCreateSocial(userAccount, 'facebook');
		const token = signJWT({
			id: rs[0].id,
			provider: 'facebook'
		});
		const refToken = signJWT({
			id: rs[0].id,
			provider: 'facebook'
		}, '7d');

		await rs[0].update({
			token,
			status: true
		});

		return done(null, {
			token,
			refreshToken: refToken
		});
	} catch (error) {
		logger.error(`Passport Facebook Error ${error.toString()}`);
		return done(error);
	}
}));

passport.use(new GoogleStrategy({
	...configAuth.googleAuth
}, async (accessToken, refreshToken, profile, done) => {
	logger.info('Passport Google');
	try {
		const { id, name, gender, emails, photos } = profile;

		if (emails.length == 0) {
			return done(null, false);
		}

		const userAccount = {
			email: emails[0].value,
			UserProfile: {
				firstName: name.givenName || null,
				lastName: name.familyName || null,
				gender: gender || null,
				profileImg: photos[0] ? photos[0].value : null
			},
			LoginProvider: {
				socialId: id,
				accessToken,
				refreshToken: refreshToken || null,
				provider: 'google'
			}
		};

		const rs = await userAccountDAO.findOrCreateSocial(userAccount, 'google');
		const token = signJWT({
			id: rs[0].id,
			provider: 'google'
		});
		const refToken = signJWT({
			id: rs[0].id,
			provider: 'google'
		});

		await rs[0].update({
			token,
			status: true
		});

		return done(null, {
			token,
			refreshToken: refToken
		});
	} catch (error) {
		logger.error(`Passport Google ${error.toString()}`);
		return done(error);
	}
}));

router.get('/facebook', passport.authenticate('facebook', {
	scope: ['public_profile', 'email', 'user_birthday']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
	failureRedirect: '/auth/facebook/callback_error',
	session: false
}), (req: Request, res: Response) => {
	res.status(200).json({
		code: 200,
		error: false,
		data: {
			...req.user,
			message: 'Login Successfully'
		}
	});
});

router.get('/facebook/callback_error', (req: Request, res: Response) => {
	logger.error('Passport Facebook Callback Error');
	res.status(401).json({
		code: 401,
		error: true,
		message: 'Authorization Failed'
	});
});

router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
	failureRedirect: '/auth/google/callback_error',
	session: false
}), (req: Request, res: Response) => {
	res.status(200).json({
		code: 200,
		error: false,
		data: {
			...req.user,
			message: 'Login Successfully'
		}
	});
});

router.get('/google/callback_error', (req: Request, res: Response) => {
	logger.error('Passport Google Callback Error');
	res.status(401).json({
		code: 401,
		error: true,
		message: 'Authorization Failed'
	});
});

export default router;