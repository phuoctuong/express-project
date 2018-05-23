'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.createTable('comment', {
			id: {
				type: Sequelize.BIGINT,
				unique: true,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: Sequelize.STRING
			},
			commentable: {
				type: Sequelize.STRING
			},
			commentable_id: {
				type: Sequelize.INTEGER
			},
			user_account_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user_account',
					key: 'id'
				}
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},

	down: function down(queryInterface) {
		return queryInterface.dropTable('comment');
	}
};
//# sourceMappingURL=20171213132409-comment.js.map
