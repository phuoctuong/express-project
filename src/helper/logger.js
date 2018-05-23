// levels: {
// 	error: 0,
// 	warn: 1,
// 	info: 2,
// 	verbose: 3,
// 	debug: 4,
// 	silly: 5
// }

import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logPath = path.join(process.cwd(), 'log');

if (!fs.existsSync(logPath)) {
	fs.mkdirSync(logPath);
}

const myFormat = winston.format.printf(info => {
	return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.simple()
	),
	exceptionHandlers: [
		new winston.transports.File({ filename: path.join(logPath, 'exceptions.log') })
	],
	transports: [
		new winston.transports.File({ filename: path.join(logPath, 'error.log'), level: 'error', timestamp: true }),
		new winston.transports.File({
			filename: path.join(logPath, 'all.log'),
			timestamp: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5
		})
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.colorize(),
			myFormat
		)
	}));
}

export default logger;