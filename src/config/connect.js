import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';
import configDB from './db';
import logger from '../helper/logger';
import seqlizeLog from '../helper/seqlizeLog';
import { initialModel } from '../models';

let sequelize;
const namespace = cls.createNamespace('own-namespace');
Sequelize.useCLS(namespace); // used for passing transactions automatically

const env = process.env.NODE_ENV || 'development';

const connect = async (callback) => {
	try {
		const config = configDB[env];
		sequelize = new Sequelize(config.database, config.username, config.password, {
			host: config.host,
			dialect: config.dialect,
			define: config.define,
			logging: seqlizeLog,
			operatorsAliases: false
		});
		await sequelize.authenticate();
		initialModel(sequelize);
		await sequelize.sync({
			force: env === 'test'
		});
		callback();
	} catch (error) {
		logger.error(`Error Connection ${error}`);
	}
};

export { sequelize };
export default connect;