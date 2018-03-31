// @flow

import Promise from 'bluebird';
import { sequelize } from '../config/connect';
import { models } from '../models';

const userAccountDAO = {};

userAccountDAO.findById = (id: number, options: Object) => {
	return new Promise((resolve, reject) => {
		models.userAccount.scope('detail').findById(id, {
			attributes: ['email', 'activated', 'status'],
			...options
		})
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userAccountDAO.findBy = (attrs: Object) => {
	return new Promise((resolve, reject) => {
		models.userAccount.scope('detail').findAll({ where: attrs })
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userAccountDAO.findOneBy = (attrs: Object) => {
	return new Promise((resolve, reject) => {
		models.userAccount.scope('detail').findOne({ where: attrs })
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userAccountDAO.create = (userAccount: UserAccount) => {
	return sequelize.transaction((trans) => {
		return new Promise((resolve, reject) => {
			models.userAccount.create(userAccount, {
				include: [{
					model: models.userProfile,
					as: 'UserProfile'
				}]
			})
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	});
};

userAccountDAO.delete = (id: number) => {
	return new Promise((resolve, reject) => {
		models.userAccount.destroy({ where: { id } })
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userAccountDAO.update = (value: Object, where: Object) => {
	return new Promise((resolve, reject) => {
		models.userAccount.update(value, {
			where,
			returning: true
		})
			.then(result => resolve(result))
			.catch(error => reject(error));
	});
};

userAccountDAO.findOrCreate = (userAccount: UserAccount) => {
	return sequelize.transaction((trans) => {
		return new Promise((resolve, reject) => {
			models.userAccount.findOrCreate({
				where: {
					email: userAccount.email
				},
				defaults: userAccount,
				include: [{
					model: models.userProfile,
					as: 'UserProfile'
				}]
			})
				.then(result => resolve(result))
				.catch(error => reject(error));
		});
	});
};

userAccountDAO.findOrCreateSocial = (userAccount: UserAccount, provider: ProviderType) => {
	return sequelize.transaction((trans) => {
		return new Promise((resolve, reject) => {
			models.userAccount.findOrCreate({
				where: {
					email: userAccount.email
				},
				defaults: userAccount,
				include: [
					{
						model: models.userProfile,
						as: 'UserProfile'
					},
					{
						model: models.loginProvider,
						as: 'LoginProvider',
						where: {
							provider
						}
					}
				]
			})
				.then(result => resolve(result))
				.catch(error => reject(error));
		});
	});
};

export default userAccountDAO;