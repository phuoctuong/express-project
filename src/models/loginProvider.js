import { PROVIDER } from '../constants';

export default (sequelize, DataTypes) => {
	const LoginProvider = sequelize.define('loginProvider', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		socialId: {
			type: DataTypes.STRING,
			unique: true,
			field: 'social_id'
		},
		accessToken: {
			type: DataTypes.TEXT,
			field: 'access_token'
		},
		refreshToken: {
			type: DataTypes.STRING,
			field: 'refresh_token'
		},
		provider: {
			type: DataTypes.STRING,
			field: 'provider',
			validate: {
				isIn: [PROVIDER]
			}
		},
		expiresInAccess: {
			type: DataTypes.DATE,
			field: 'expires_in_access'
		},
		expiresInRefresh: {
			type: DataTypes.DATE,
			field: 'expires_in_refresh'
		}
	}, {
		tableName: 'login_provider'
	});

	return LoginProvider;
};