'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sequelize, DataTypes) {
	var Post = sequelize.define('post', {
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

	Post.associate = function (models) {
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
//# sourceMappingURL=post.js.map
