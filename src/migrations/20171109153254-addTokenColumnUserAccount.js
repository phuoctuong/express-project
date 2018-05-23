module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('user_account', 'token', {
			type: Sequelize.STRING,
			unique: true
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('user_account', 'token');
	}
};