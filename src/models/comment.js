export default (sequelize, DataTypes) => {
	const Comment = sequelize.define('comment', {
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		title: {
			type: DataTypes.STRING
		},
		commentable: {
			type: DataTypes.STRING,
			field: 'commentable'
		},
		commentableId: {
			type: DataTypes.INTEGER,
			field: 'commentable_id'
		},
		userAccountId: {
			type: DataTypes.INTEGER,
			field: 'user_account_id'
		}
	}, {
		tableName: 'comment'
	});

	Comment.associate = (models) => {
		Comment.belongsTo(models.post, {
			foreignKey: 'commentable_id',
			// constraints: false,
			as: 'post'
		});

		Comment.belongsTo(models.userAccount, {
			foreignKey: 'user_account_id',
			as: 'UserAccount'
		});
	};

	return Comment;
};