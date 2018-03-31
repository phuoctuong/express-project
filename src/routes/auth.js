// @flow

import express from 'express';
import nodemailer from 'nodemailer';
import logger from '../helper/logger';
import { userAccountDAO } from '../daos';
import { authMiddleware, validateFormMiddleware } from './middleware';
import { signJWT } from '../helper/jwt';
import { encrypt, decrypt } from '../helper/saltHashPassword';
import { UNIQUE_VIOLATION } from '../constants';

const router = express.Router();

router.post('/token', authMiddleware, async (req: Request, res: Response) => {
	logger.info('Auth Router: POST /token');
	const { id } = res.locals.user;
	const token = signJWT({
		id
	});
	const refreshToken = signJWT({
		id
	}, '7d');

	res.status(200).json({
		code: 200,
		error: false,
		data: {
			token,
			refreshToken
		}
	});
});

router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
	logger.info('Auth Router: POST /logout');
	try {
		const { id } = res.locals.user;
		const rs = await userAccountDAO.update({ status: false }, {
			id,
			status: true
		});

		if (rs[0] === 0) {
			res.status(401).json({
				code: 401,
				error: true,
				message: 'Can\'t Logout Of This Account'
			});
		} else {
			res.status(200).json({
				code: 200,
				error: false,
				message: 'Logout Successfully'
			});
		}
	} catch (error) {
		logger.error(`Auth Router: POST /logout ${error.toString()}`);
		res.status(200).json({
			code: 200,
			error: true,
			message: 'Logout Failed'
		});
	}
});

router.post('/login', async (req: Request, res: Response) => {
	logger.info('Auth Router: POST /login');
	try {
		const userAccount = await userAccountDAO.findOneBy({
			email: req.body.email
		});

		const pwd = decrypt(userAccount.get('password'), userAccount.get('saltHash'));
		if (pwd !== req.body.password) {
			return res.status(200).json({
				code: 200,
				error: true,
				message: 'Password Is Incorrect'
			});
		}

		const token = signJWT({
			id: userAccount.get('id')
		});
		const refreshToken = signJWT({
			id: userAccount.get('id')
		}, '7d');

		await userAccount.update({
			token,
			status: true
		});

		return res.status(200).json({
			code: 200,
			error: false,
			message: 'Login Successfully',
			data: {
				token,
				refreshToken
			}
		});
	} catch (error) {
		logger.error(`Auth Router: POST /login ${error.toString()}`);
		return res.status(401).json({
			code: 200,
			error: true,
			message: 'Email Or Password Invalid'
		});
	}
});

router.post('/signup', validateFormMiddleware, async (req: Request, res: Response) => {
	logger.info('Auth Router: POST /signup');
	try {
		// Encrypt password
		const encrypted = encrypt(req.body.password);
		const userAccount = {
			email: req.body.email,
			password: encrypted.value,
			saltHash: encrypted.salt,
			UserProfile: {
				firstName: req.body.firstName,
				lastName: req.body.lastName
			}
		};
		const rs = await userAccountDAO.findOrCreate(userAccount);
		const isNewEmail = rs[1];
		if (!isNewEmail) {
			return res.status(200).json({
				code: 200,
				error: true,
				message: 'Email Is Existed'
			});
		}
		return res.status(200).json({
			code: 200,
			error: false,
			message: 'Sign Up Successfully'
		});
	} catch (error) {
		logger.error(`Auth Router: POST /signup ${error.toString()}`);
		const { errors } = error;
		let message = 'Something broken';

		if (errors[0] && errors[0].type === UNIQUE_VIOLATION) {
			message = `${errors[0].path} existed`;
		}

		return res.status(200).json({
			code: 200,
			error: true,
			message
		});
	}
});

router.post('/lost-password', async (req: Request, res: Response) => {
	logger.info('Auth Router: POST /lost-password');
	try {
		const receiver = req.body.email;
		const userAccount = await userAccountDAO.findOneBy({
			email: receiver
		});

		if (userAccount) {
			const pwdReminderToken = signJWT({
				id: userAccount.get('id')
			});
			await userAccount.update({
				passwordReminderToken: pwdReminderToken
			});
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.GMAIL_USER,
					pass: process.env.GMAIL_PASS
				}
			});

			const mailOptions = {
				from: process.env.GMAIL_USER,
				to: receiver,
				subject: 'Lost Password',
				html: `<p>Token With Reset Password ${pwdReminderToken}</p>`
			};

			transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					return res.status(200).json({
						code: 200,
						error: true,
						data: err
					});
				}

				return res.status(200).json({
					code: 200,
					error: true,
					data: {
						token: pwdReminderToken
					}
				});
			});
		} else {
			return res.status(200).json({
				code: 200,
				error: true,
				message: 'Email Is Not Registered'
			});
		}
	} catch (error) {
		logger.error(`Auth Router: POST /lost-password ${error.toString()}`);
		return res.status(200).json({
			code: 200,
			error: true,
			message: 'Can\'t Send Email'
		});
	}
});

router.post('/reset-password', validateFormMiddleware, authMiddleware, async (req: Request, res: Response) => {
	logger.info('Auth Router: POST /reset-password');
	try {
		const { id } = res.locals.user;
		const newPassword = req.body.password;
		const userAccount = await userAccountDAO.findOneBy({
			id
		});

		if (userAccount) {
			const encrypted = encrypt(newPassword);
			await userAccount.update({
				password: encrypted.value,
				saltHash: encrypted.salt
			});

			return res.status(200).json({
				code: 200,
				error: false,
				message: 'Reset Password Successfully'
			});
		}

		return res.status(200).json({
			code: 200,
			error: true,
			message: 'Account Is Not Existed'
		});
	} catch (error) {
		logger.error(`Auth Router: POST /reset-password ${error.toString()}`);
		return res.status(200).json({
			code: 200,
			error: true,
			message: 'Reset Password Failed'
		});
	}
});

export default router;