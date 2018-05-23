// @flow

import redis from 'redis';
import config from '../config/db';
import logger from '../helper/logger';

let redisClient;

if (!redisClient) {
	redisClient = redis.createClient({
		host: config.redis.host,
		port: config.redis.port
	});

	// $FlowFixMe
	redisClient.auth(config.redis.password, (err) => {
		if (err) {
			logger.error(`Error Auth in Redis ${err}`);
		}
	});

	redisClient.on('ready', () => {
		logger.info('Redis is ready');
	});

	redisClient.on('error', (err) => {
		logger.error(`Error in Redis ${err}`);
	});
}

export default redisClient;