// @flow

import express from 'express';
import { userAccountDAO } from '../daos';
import { authMiddleware } from './middleware';

const router = express.Router();

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
	try {
		const { id } = res.locals.user;
		const user = await userAccountDAO.findById(id);
		res.status(200).json({
			code: 200,
			error: false,
			data: user
		});
	} catch (error) {
		res.status(500).json({
			code: 500,
			error: true,
			message: 'Interval Server Error'
		});
	}
});

export default router;