// @flow

import Promise from 'bluebird';
import { models } from '../models';

const postDAO = {};

postDAO.findById = (id: number, options: Object) => {
	return new Promise((resolve, reject) => {
		models.post.findById(id, {
			include: [
				{
					model: models.comment,
					include: [
						{
							model: models.userAccount,
							as: 'UserAccount',
							attributes: ['id'],
							include: [
								{
									model: models.userProfile,
									as: 'UserProfile'
								}
							]
						}
					]
				}
			],
			...options
		})
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

postDAO.create = (post: Post) => {
	return new Promise((resolve, reject) => {
		models.post.create(post)
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

export default postDAO;