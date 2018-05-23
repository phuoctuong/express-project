'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = require('../constants');

exports.default = function (sequelize, DataTypes) {
	var UserProfile = sequelize.define('userProfile', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		firstName: {
			type: DataTypes.STRING,
			field: 'first_name'
		},
		lastName: {
			type: DataTypes.STRING,
			field: 'last_name'
		},
		profileImg: {
			type: DataTypes.STRING,
			field: 'profile_img'
		},
		gender: {
			type: DataTypes.STRING,
			field: 'gender',
			validate: {
				isIn: [_constants.GENDER]
			}
		}
	}, {
		tableName: 'user_profile'
	});
	return UserProfile;
};
//# sourceMappingURL=userProfile.js.map
