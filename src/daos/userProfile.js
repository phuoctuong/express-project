// @flow

import Promise from 'bluebird';
import { models } from '../models';

const userProfileDAO = {};

userProfileDAO.findById = (id: number) => {
	return new Promise((resolve, reject) => {
		models.userProfile.findById(id)
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userProfileDAO.create = (userProfile: UserProfile) => {
	return new Promise((resolve, reject) => {
		models.userProfile.create(userProfile)
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userProfileDAO.delete = (id: number) => {
	return new Promise((resolve, reject) => {
		models.userProfile.destroy({ where: { id } })
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

export default userProfileDAO;