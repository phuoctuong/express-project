// @flow

import express from 'express';
import { userProfileDAO } from '../daos';

let router = express.Router();

router.post('/', (req, res) => {
	const userProfile = req.body;

	userProfileDAO.create(userProfile)
		.then((result) => {
			res.status(200).json({
				code: 200,
				error: false,
				data: result
			});
		})
		.catch((error) => {
			res.status(500).json({
				code: 500,
				error: true,
				message: error.message
			});
		});
});

export default router;