// @flow

import { verifyJWT } from '../helper/jwt';

const authMiddleware = (req: Request, res: Response, next: Next) => {
	try {
		const token = req.header('Authorization').split(' ')[1];
		const { id } = verifyJWT(token);
		res.locals.user = { id };
		next();
	} catch (error) {
		res.status(401).json({
			code: 401,
			error: true,
			message: 'Authentication Failed'
		});
	}
};

export { authMiddleware };