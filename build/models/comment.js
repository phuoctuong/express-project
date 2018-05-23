'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sequelize, DataTypes) {
	var Comment = sequelize.define('comment', {
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

	Comment.associate = function (models) {
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
//# sourceMappingURL=comment.js.map
