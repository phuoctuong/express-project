import { models } from '../models';
import Promise from 'bluebird';

const loginProviderDAO = {};

loginProviderDAO.create = (loginProvider) => {
	return new Promise((resolve, reject) => {
		models.loginProvider.create(loginProvider)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default loginProviderDAO;