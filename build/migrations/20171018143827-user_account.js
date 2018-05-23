'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.createTable('user_account', {
			id: {
				type: Sequelize.BIGINT,
				unique: true,
				primaryKey: true,
				autoIncrement: true
			},
			email: {
				type: Sequelize.STRING
			},
			user_name: {
				type: Sequelize.STRING
			},
			password_hash: {
				type: Sequelize.STRING
			},
			activated: {
				type: Sequelize.BOOLEAN
			},
			salt_hash: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			email_confirmation_token: {
				type: Sequelize.STRING
			},
			password_reminder_token: {
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
			},
			user_profile_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user_profile',
					key: 'id'
				}
			},
			login_provider_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'login_provider',
					key: 'id'
				}
			}
		});
	},

	down: function down(queryInterface) {
		return queryInterface.dropTable('user_account');
	}
};
//# sourceMappingURL=20171018143827-user_account.js.map
