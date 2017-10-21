export default (sequelize, DataTypes) => {
	let UserAccount = sequelize.define('userAccount', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			field: 'email'
		},
		userName: {
			type: DataTypes.STRING,
			field: 'user_name'
		},
		password: {
			type: DataTypes.STRING,
			field: 'password_hash'
		},
		activated: {
			type: DataTypes.BOOLEAN,
			field: 'activated'
		},
		saltHash: {
			type: DataTypes.STRING,
			field: 'salt_hash'
		},
		status: {
			type: DataTypes.BOOLEAN,
			field: 'status'
		},
		emailConfirmationToken: {
			type: DataTypes.STRING,
			field: 'email_confirmation_token'
		},
		passwordReminderToken: {
			type: DataTypes.STRING,
			field: 'password_reminder_token'
		}
	}, {
		tableName: 'user_account',
		classMethods: {
			associate: (models) => {
				UserAccount.belongsTo(models.userProfile, {
					as: 'UserProfile',
					foreignKey: 'user_profile_id'
				});
				UserAccount.belongsTo(models.loginProvider, {
					as: 'LoginProvider',
					foreignKey: 'login_provider_id'
				});
			}
		}
	});
	return UserAccount;
};