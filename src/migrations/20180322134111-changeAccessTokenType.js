module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('login_provider', 'access_token', {
			type: Sequelize.TEXT
		});
	},

	down: (queryInterface, Sequelize) => { }
};
