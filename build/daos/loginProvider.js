'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginProviderDAO = {};

loginProviderDAO.findById = function (id) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.loginProvider.findById(id).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

loginProviderDAO.create = function (loginProvider) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.loginProvider.create(loginProvider).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

loginProviderDAO.delete = function (id) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.loginProvider.destroy({ where: { id: id } }).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

exports.default = loginProviderDAO;
//# sourceMappingURL=loginProvider.js.map
