module.exports = {
	up: (queryInterface, Sequelize) => {
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

	down: (queryInterface) => {
		return queryInterface.dropTable('user_profile');
	}
};
