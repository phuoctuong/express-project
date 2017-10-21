import Sequelize from 'sequelize';
import configDB from './config';
import log from '../helper/log';
import seqlizeLog from '../helper/seqlizeLog';
import initialModel from '../models';

const env = process.env.NODE_ENV || 'development';

const connect = async (callback) => {
	let sequelize = null;
	const config = configDB[env];
	sequelize = new Sequelize(config.database, config.username, config.password, {
		dialect: config.dialect,
		define: config.define,
		logging: seqlizeLog
	});

	await sequelize.authenticate()
		.then(() => {
			log.info('Connection has been established');
			console.log(initialModel(sequelize));
		})
		.catch(error => {
			log.error('Error authentication', error.toString());
			throw new Error(error);
		});

	await sequelize.sync({ force: false })
		.then(() => callback())
		.catch(error => {
			log.error('Error sync', error.toString());
			throw new Error(error);
		});
};

export default connect;