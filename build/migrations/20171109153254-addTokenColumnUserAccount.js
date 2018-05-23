'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.addColumn('user_account', 'token', {
			type: Sequelize.STRING,
			unique: true
		});
	},

	down: function down(queryInterface, Sequelize) {
		return queryInterface.removeColumn('user_account', 'token');
	}
};
//# sourceMappingURL=20171109153254-addTokenColumnUserAccount.js.map
