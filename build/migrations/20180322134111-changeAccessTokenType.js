'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.changeColumn('login_provider', 'access_token', {
			type: Sequelize.TEXT
		});
	},

	down: function down(queryInterface, Sequelize) {}
};
//# sourceMappingURL=20180322134111-changeAccessTokenType.js.map
