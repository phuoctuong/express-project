'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userProfileDAO = {};

userProfileDAO.findById = function (id) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userProfile.findById(id).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userProfileDAO.create = function (userProfile) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userProfile.create(userProfile).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

userProfileDAO.delete = function (id) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.userProfile.destroy({ where: { id: id } }).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

exports.default = userProfileDAO;
//# sourceMappingURL=userProfile.js.map
