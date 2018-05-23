'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sequelize, DataTypes) {
	var UserAccount = sequelize.define('userAccount', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		token: {
			type: DataTypes.STRING,
			unique: true,
			field: 'token'
		},
		email: {
			type: DataTypes.STRING,
			field: 'email'
		},
		password: {
			type: DataTypes.STRING,
			field: 'password_hash'
		},
		saltHash: {
			type: DataTypes.STRING,
			field: 'salt_hash'
		},
		activated: {
			type: DataTypes.BOOLEAN,
			field: 'activated',
			defaultValue: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			field: 'status',
			defaultValue: false
		},
		emailConfirmationToken: {
			type: DataTypes.STRING,
			field: 'email_confirmation_token',
			defaultValue: null
		},
		passwordReminderToken: {
			type: DataTypes.STRING,
			field: 'password_reminder_token',
			defaultValue: null
		}
	}, {
		tableName: 'user_account'
	});

	UserAccount.associate = function (models) {
		UserAccount.belongsTo(models.userProfile, {
			as: 'UserProfile',
			foreignKey: 'user_profile_id'
		});
		UserAccount.belongsTo(models.loginProvider, {
			as: 'LoginProvider',
			foreignKey: 'login_provider_id'
		});
	};

	UserAccount.loadScope = function (models) {
		UserAccount.addScope('detail', {
			include: [{
				model: models.userProfile,
				as: 'UserProfile'
			}, {
				model: models.loginProvider,
				as: 'LoginProvider',
				attributes: ['id', 'provider']
			}]
		}, { override: true });
	};

	return UserAccount;
};
//# sourceMappingURL=userAccount.js.map
