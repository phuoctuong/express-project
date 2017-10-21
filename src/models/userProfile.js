export default (sequelize, DataTypes) => {
	let UserProfile = sequelize.define('userProfile', {
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
		}
	}, {
		tableName: 'user_profile'
	});
	return UserProfile;
};
