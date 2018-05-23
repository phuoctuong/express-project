'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.createTable('user_profile', {
			id: {
				type: Sequelize.BIGINT,
				unique: true,
				primaryKey: true,
				autoIncrement: true
			},
			first_name: {
				type: Sequelize.STRING
			},
			last_name: {
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
		return queryInterface.dropTable('user_profile');
	}
};
//# sourceMappingURL=20171017152044-user_profile.js.map
