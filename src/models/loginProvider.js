export default (sequelize, DataTypes) => {
	let LoginProvider = sequelize.define('loginProvider', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		accessToken: {
			type: DataTypes.STRING,
			field: 'access_token'
		},
		refreshToken: {
			type: DataTypes.STRING,
			field: 'refresh_token'
		},
		providerId: {
			type: DataTypes.STRING,
			field: 'provider_id'
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