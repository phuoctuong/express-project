// @flow

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const maxLength = 15;

const getRandomBytes = (length: number) => {
	return crypto.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length);
};

const encrypt = (data: string) => {
	const key = getRandomBytes(maxLength);
	const cipher = crypto.createCipher(algorithm, key);
	let crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return {
		salt: key,
		value: crypted
	};
};

const decrypt = (data: string, key: string) => {
	const decipher = crypto.createDecipher(algorithm, key);
	let decrypted = decipher.update(data, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};

export { encrypt, decrypt };
