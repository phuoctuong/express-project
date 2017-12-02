import { GENDER } from '../constants';

export default (sequelize, DataTypes) => {
	const UserProfile = sequelize.define('userProfile', {
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
			validate: [GENDER]
		}
	}, {
		tableName: 'user_profile'
	});
	return UserProfile;
};
