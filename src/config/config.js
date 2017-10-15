require('dotenv').config();

const config = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		database: `${process.env.DB_NAME}_dev`,
		host: '127.0.0.1',
		define: {
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			underscore: true
		}
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		database: `${process.env.DB_NAME}_test`,
		host: '127.0.0.1',
		define: {
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			underscore: true
		}
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		database: `${process.env.DB_NAME}_prod`,
		host: '127.0.0.1',
		define: {
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			underscore: true
		}
	}
};

export default config;