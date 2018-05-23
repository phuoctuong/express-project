const Promise = require('bluebird');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('user_profile', 'profile_img', {
				type: Sequelize.STRING
			}),
			queryInterface.addColumn('user_profile', 'gender', {
				type: Sequelize.STRING
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('user_profile', 'profile_img'),
			queryInterface.removeColumn('user_profile', 'gender')
		]);
	}
};
