// @flow

import express from 'express';
import log from '../helper/log';
import { postDAO } from '../daos';
import { authMiddleware } from './middleware';

const router = express.Router();

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
	try {
		const rs = await postDAO.findById(req.params.id, {});

		res.status(200).json({
			code: 200,
			error: false,
			data: rs
		});
	} catch (error) {
		log.error('Post Router', error.toString());
		res.status(500).json({
			code: 500,
			error: true,
			message: error.toString()
		});
	}
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
	try {
		const post = {
			title: req.body.title
		};
		const rs = await postDAO.create(post);
		res.status(200).json({
			code: 200,
			error: false,
			data: rs
		});
	} catch (error) {
		log.error('Post Router', error.toString());
		res.status(500).json({
			code: 500,
			error: true,
			message: error.toString()
		});
	}
});

router.post('/:id/comment', authMiddleware, async (req: Request, res: Response) => {
	try {
		const post = await postDAO.findById(req.params.id, {});
		const rs = await post.createComment({
			title: req.body.title,
			userAccountId: res.locals.user.id
		});

		res.status(200).json({
			code: 200,
			error: false,
			data: rs
		});
	} catch (error) {
		log.error('Post Router', error.toString());
		res.status(500).json({
			code: 500,
			error: true,
			message: 'Interval Server Error'
		});
	}
});

export default router;