'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postDAO = {};

postDAO.findById = function (id, options) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.post.findById(id, (0, _extends3.default)({
			include: [{
				model: _models.models.comment,
				include: [{
					model: _models.models.userAccount,
					as: 'UserAccount',
					attributes: ['id'],
					include: [{
						model: _models.models.userProfile,
						as: 'UserProfile'
					}]
				}]
			}]
		}, options)).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

postDAO.create = function (post) {
	return new _bluebird2.default(function (resolve, reject) {
		_models.models.post.create(post).then(function (result) {
			return resolve(result);
		}).catch(function (error) {
			return reject(error);
		});
	});
};

exports.default = postDAO;
//# sourceMappingURL=post.js.map
