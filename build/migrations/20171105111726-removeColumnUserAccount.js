'use strict';

module.exports = {
	up: function up(queryInterface, Sequelize) {
		return queryInterface.removeColumn('user_account', 'user_name');
	},

	down: function down() {}
};
//# sourceMappingURL=20171105111726-removeColumnUserAccount.js.map
