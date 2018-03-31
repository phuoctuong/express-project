// @flow

import express from 'express';
import { userAccountDAO } from '../daos';
import { authMiddleware } from './middleware';
import logger from '../helper/logger';

const router = express.Router();

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
	logger.info('User Router: GET /me');
	try {
		const { id } = res.locals.user;
		const user = await userAccountDAO.findById(id);
		res.status(200).json({
			code: 200,
			error: false,
			data: user
		});
	} catch (error) {
		logger.error(`User Router: GET /me ${error.toString()}`);
		res.status(500).json({
			code: 500,
			error: true,
			message: 'Get Profile Failed'
		});
	}
});

export default router;