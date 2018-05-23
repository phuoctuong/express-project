'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initialModel = exports.models = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = {};
var initialModel = function initialModel(sequelize) {
	_fs2.default.readdirSync(_path2.default.resolve(__dirname)).filter(function (file) {
		return file.indexOf('.') !== -1 && file !== 'index.js';
	}).forEach(function (file) {
		var model = sequelize.import(_path2.default.resolve(__dirname, file));
		models[model.name] = model;
	});

	(0, _keys2.default)(models).forEach(function (modelName) {
		if (models[modelName].hasOwnProperty('associate')) {
			models[modelName].associate(models);
		}
		if (models[modelName].hasOwnProperty('loadScope')) {
			models[modelName].loadScope(models);
		}

		models[modelName].prototype.toJSON = function () {
			return (0, _lodash.mapKeys)(this.get(), function (value, key) {
				return (0, _lodash.camelCase)(key);
			});
		};
	});

	return models;
};

exports.models = models;
exports.initialModel = initialModel;
//# sourceMappingURL=index.js.map
