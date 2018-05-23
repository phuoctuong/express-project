// @flow

import jwt from 'jsonwebtoken';
import auth from '../config/auth';

const signJWT = (obj: any, expiresTime: string = auth.basicAuth.expiresIn) => {
	return jwt.sign({
		data: obj
	}, auth.basicAuth.secretOrKey, {
		expiresIn: expiresTime,
		algorithm: auth.basicAuth.algorithm
	});
};

const verifyJWT = (token: string) => {
	const decode = jwt.verify(token, auth.basicAuth.secretOrKey, {
		algorithm: auth.basicAuth.algorithm
	});
	return decode.data;
};

export { signJWT, verifyJWT };