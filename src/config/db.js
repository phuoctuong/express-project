require('dotenv').config();

const config = {
	redis: {
		password: process.env.REDIS_PASSWORD,
		host: 'localhost',
		port: 6379
	},
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
			underscored: true
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
			underscored: true
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
			underscored: true
		}
	},
	docker: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		database: `${process.env.DB_NAME}_docker`,
		host: 'db',
		define: {
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			underscored: true
		}
	}
};

module.exports = config;