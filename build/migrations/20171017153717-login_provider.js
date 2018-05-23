'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.createTable('login_provider', {
			id: {
				type: Sequelize.BIGINT,
				unique: true,
				autoIncrement: true,
				primaryKey: true
			},
			social_id: {
				type: Sequelize.STRING,
				unique: true
			},
			access_token: {
				type: Sequelize.STRING
			},
			refresh_token: {
				type: Sequelize.STRING
			},
			provider: {
				type: Sequelize.STRING
			},
			expires_in_access: {
				type: Sequelize.DATE
			},
			expires_in_refresh: {
				type: Sequelize.DATE
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
		return queryInterface.dropTable('login_provider');
	}
};
//# sourceMappingURL=20171017153717-login_provider.js.map
