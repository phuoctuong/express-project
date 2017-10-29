// @flow

import models from '../models';
import Promise from 'bluebird';

const userProfileDAO = {};

userProfileDAO.create = (userProfile) => {
	return new Promise((resolve, reject) => {
		models.userProfile.create(userProfile)
			.then((result) => {
				resolve(result);
			})
			.then((error) => {
				reject(error);
			});
	});
};

export default userProfileDAO;