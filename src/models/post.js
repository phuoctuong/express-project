export default (sequelize, DataTypes) => {
	const Post = sequelize.define('post', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		title: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'post'
	});

	Post.associate = (models) => {
		Post.hasMany(models.comment, {
			foreignKey: 'commentable_id',
			// constraints: false,
			scope: {
				commentable: 'post'
			}
		});
	};

	return Post;
};