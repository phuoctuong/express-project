import Sequelize from 'sequelize';
import configDB from './config';
import log from '../helper/log';
import initialModel from '../models';

const env = process.env.NODE_ENV || 'development';

const connect = async (callback) => {
	let sequelize = null;
	const config = configDB[env];
	sequelize = new Sequelize(config.database, config.username, config.password, {
		dialect: config.dialect,
		define: config.define
	});

	await sequelize.authenticate()
		.then(() => {
			log.info('Connection has been established');
			initialModel(sequelize);
		})
		.catch(error => log.error('Error authentication', error.toString()));

	await sequelize.sync({ force: true })
		.then(() => callback())
		.catch(error => log.error('Error sync', error.toString()));
};

export default connect;