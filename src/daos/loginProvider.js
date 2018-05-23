// @flow

import Promise from 'bluebird';
import { models } from '../models';

const loginProviderDAO = {};

loginProviderDAO.findById = (id: number) => {
	return new Promise((resolve, reject) => {
		models.loginProvider.findById(id)
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

loginProviderDAO.create = (loginProvider: LoginProvider) => {
	return new Promise((resolve, reject) => {
		models.loginProvider.create(loginProvider)
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

loginProviderDAO.delete = (id: number) => {
	return new Promise((resolve, reject) => {
		models.loginProvider.destroy({ where: { id } })
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

export default loginProviderDAO;