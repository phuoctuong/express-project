'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.createTable('post', {
			id: {
				type: Sequelize.BIGINT,
				unique: true,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: Sequelize.STRING
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
		return queryInterface.dropTable('post');
	}
};
//# sourceMappingURL=20171213133011-post.js.map
