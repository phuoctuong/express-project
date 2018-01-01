// @flow

import fs from 'fs';
import path from 'path';
import logger from './logger';

const seqlizeLog = (message: string) => {
	const writeStream = fs.createWriteStream(path.resolve(process.cwd(), 'scripts.txt'), {
		flags: 'a'
	});
	writeStream.write(message, 'UTF8');
	writeStream.end('\n');
	writeStream.on('error', error => logger.error(error.stack));
};

export default seqlizeLog;