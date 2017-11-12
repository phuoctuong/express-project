// @flow

import express from 'express';
import { userAccountDAO } from '../daos';
import { authMiddleware } from './middleware';
import { signJWT } from '../helper/jwt';
import { encrypt } from '../helper/saltHashPassword';
import { UNIQUE_VIOLATION } from '../constants';

const router = express.Router();

router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
	try {
		const { id } = res.locals.user;
		const rs = await userAccountDAO.update({ status: false }, {
			id,
			status: true
		});

		if (rs[0] == 0) {
			res.status(401).json({
				code: 401,
				error: true,
				message: 'Can\'t logout of this account'
			});
		} else {
			res.status(200).json({
				code: 200,
				error: false,
				message: 'Logout successfully'
			});
		}
	} catch (error) {
		res.status(401).json({
			code: 401,
			error: true,
			message: 'Logout Failed'
		});
	}
});

router.post('/login', async (req: Request, res: Response) => {
	try {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({
				code: 400,
				error: true,
				message: 'username or password invalid'
			});
		}
		const userAccount = await userAccountDAO.findOneBy({
			email: req.body.email
		});

		const token = signJWT({
			id: userAccount.get('id')
		});

		await userAccount.update({
			token,
			status: true
		});

		res.status(200).json({
			code: 200,
			error: false,
			data: {
				token,
				message: 'Login Successfully'
			}
		});
	} catch (error) {
		res.status(401).json({
			code: 401,
			error: true,
			message: 'username or password invalid'
		});
	}
});

router.post('/signup', async (req: Request, res: Response) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({
			code: 400,
			error: true,
			message: 'username or password invalid'
		});
	}

	try {
		// Encrypt password
		const encrypted = encrypt(req.body.password);

		const rs = await userAccountDAO.create({
			email: req.body.email,
			password: encrypted.value,
			saltHash: encrypted.salt,
			UserProfile: {
				firstName: req.body.firstName,
				lastName: req.body.lastName
			}
		});

		res.status(200).json({
			code: 200,
			error: false,
			data: {
				message: 'Sign Up Succesfully'
			}
		});
	} catch (error) {
		const { errors } = error;
		let message = 'Something broken';

		if (errors[0] && errors[0].type === UNIQUE_VIOLATION) {
			message = `${errors[0].path} existed`;
		}

		res.status(401).json({
			code: 401,
			error: true,
			message
		});
	}
});

export default router;