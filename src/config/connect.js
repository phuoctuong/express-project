import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';
import configDB from './db';
import log from '../helper/log';
import seqlizeLog from '../helper/seqlizeLog';
import initialModel from '../models';

let sequelize;
const namespace = cls.createNamespace('own-namespace');
Sequelize.useCLS(namespace); // used for passing transactions automatically

const env = process.env.NODE_ENV || 'development';

const connect = async (callback) => {
	const config = configDB[env];
	sequelize = new Sequelize(config.database, config.username, config.password, {
		dialect: config.dialect,
		define: config.define,
		logging: seqlizeLog,
		operatorsAliases: false
	});

	await sequelize.authenticate()
		.then(() => {
			initialModel(sequelize);
			log.info('Connection has been established');
		})
		.catch(error => {
			log.error('Error authentication', error.toString());
		});

	await sequelize.sync({ force: false })
		.then(() => callback())
		.catch(error => {
			log.error('Error sync', error.toString());
		});
};

export { sequelize };
export default connect;