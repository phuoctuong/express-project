// @flow

import { isEmpty } from 'lodash';
import { verifyJWT } from '../helper/jwt';
import { validateEmail, validatePassword, validateEmptyString } from '../helper/validate';
import logger from '../helper/logger';

export const authMiddleware = (req: Request, res: Response, next: Next) => {
	logger.info('Auth Middleware');
	try {
		const auth = req.header('Authorization').split(' ');
		if (auth[0] !== 'JWT') {
			throw new Error();
		}
		const token = auth[1];
		const { id } = verifyJWT(token);
		res.locals.user = { id };
		next();
	} catch (error) {
		logger.error(`Auth Middleware ${error.toString()}`);
		res.status(401).json({
			code: 401,
			error: true,
			message: 'Authentication Failed'
		});
	}
};

export const validateFormMiddleware = (req: Request, res: Response, next: Next) => {
	logger.info('Form Validation Middleware');
	try {
		const {
			email = null,
			password = null,
			firstName = null,
			lastName = null
		} = req.body;
		const validation = {};

		if (email !== null && !validateEmail(email)) {
			validation.email = ['It is not a valid email'];
		}

		if (password !== null && !validatePassword(password)) {
			validation.password = ['It is at least 8 letters',
				'Must contain at least 1 uppercase letter, 1 lowercase letter and 1 number',
				'Must contain at least special character'];
		}

		if (firstName !== null && !validateEmptyString(firstName)) {
			validation.firstName = ['It is not empty string'];
		}

		if (lastName !== null && !validateEmptyString(lastName)) {
			validation.lastName = ['It is not empty string'];
		}

		if (!isEmpty(validation)) {
			return res.status(200).json({
				code: 200,
				error: true,
				data: validation
			});
		}
		next();
	} catch (error) {
		logger.error(`Form Validation Middleware ${error.toString()}`);
		return res.status(200).json({
			code: 200,
			error: true,
			message: 'Validate Form Failed'
		});
	}
};

