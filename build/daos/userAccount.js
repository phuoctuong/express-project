'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _connect = require('../config/connect');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userAccountDAO = {};

userAccountDAO.findById = function (id, options) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userAccount.scope('detail').findById(id, (0, _extends3.default)({
			attributes: ['email', 'activated', 'status']
		}, options)).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userAccountDAO.findBy = function (attrs) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userAccount.scope('detail').findAll({ where: attrs }).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userAccountDAO.findOneBy = function (attrs) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userAccount.scope('detail').findOne({ where: attrs }).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userAccountDAO.create = function (userAccount) {
	return _connect.sequelize.transaction(function (trans) {
		return new _bluebird2.default(function (resolve, reject) {
			_models.models.userAccount.create(userAccount, {
				include: [{
					model: _models.models.userProfile,
					as: 'UserProfile'
				}]
			}).then(function (result) {
				resolve(result);
			}).catch(function (error) {
				reject(error);
			});
		});
	});
};

userAccountDAO.delete = function (id) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userAccount.destroy({ where: { id: id } }).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userAccountDAO.update = function (value, where) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userAccount.update(value, {
			where: where,
			returning: true
		}).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userAccountDAO.findOrCreate = function (userAccount) {
	return _connect.sequelize.transaction(function (trans) {
		return new _bluebird2.default(function (resolve, reject) {
			_models.models.userAccount.findOrCreate({
				where: {
					email: userAccount.email
				},
				defaults: userAccount,
				include: [{
					model: _models.models.userProfile,
					as: 'UserProfile'
				}]
			}).then(function (result) {
				return resolve(result);
			}).catch(function (error) {
				return reject(error);
			});
		});
	});
};

userAccountDAO.findOrCreateSocial = function (userAccount, provider) {
	return _connect.sequelize.transaction(function (trans) {
		return new _bluebird2.default(function (resolve, reject) {
			_models.models.userAccount.findOrCreate({
				where: {
					email: userAccount.email
				},
				defaults: userAccount,
				include: [{
					model: _models.models.userProfile,
					as: 'UserProfile'
				}, {
					model: _models.models.loginProvider,
					as: 'LoginProvider',
					where: {
						provider: provider
					}
				}]
			}).then(function (result) {
				return resolve(result);
			}).catch(function (error) {
				return reject(error);
			});
		});
	});
};

exports.default = userAccountDAO;
//# sourceMappingURL=userAccount.js.map
