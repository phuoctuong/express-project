'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('login_provider', {
			id: {
				type: Sequelize.BIGINT,
				unique: true,
				autoIncrement: true,
				primaryKey: true
			},
			access_token: {
				type: Sequelize.STRING
			},
			refresh_token: {
				type: Sequelize.STRING
			},
			provider_id: {
				type: Sequelize.DATE
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

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('login_provider');
	}
};
