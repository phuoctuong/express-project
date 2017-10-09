import Sequelize from 'sequelize';
import configDB from './config';
import Log from '../helper/log';
import initialModel from '../models';

const env = process.env.NODE_ENV || 'development';

const connect = async (callback) => {
	let sequelize = null;
	const config = configDB[env];
	sequelize = new Sequelize(config.database, config.username, config.password, {
		dialect: config.dialect,
		define: config.define,
	});

	await sequelize.authenticate()
		.then(response => {
			Log.info('Connection has been established');
			initialModel(sequelize);
		})
		.catch(error => Log.error('Error authentication'));

	await sequelize.sync({ force: true })
		.then(() => callback())
		.catch(error => Log.error('Error sync', error.toString());
};

export default connect;