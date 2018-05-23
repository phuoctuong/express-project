module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('user_account', 'user_name');
	},

	down: () => {}
};
