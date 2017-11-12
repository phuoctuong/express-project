// @flow

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import log from './helper/log';
import connect from './config/connect';
import {
	authRouter,
	socialRouter
} from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/auth', authRouter, socialRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Express Server');
});

// Handle Error
app.get('*', (req: Request, res: Response) => {
	res.status(404).json({
		code: 404,
		error: true,
		message: 'Not Found'
	});
});

app.use((err: ErrorType, req: Request, res: Response, next: Next) => {
	const code = err.status || 500;
	res.status(code).json({
		code,
		erorr: true,
		message: err.message || 'Something broken'
	});
});

connect(() => app.listen(8080, log.info('Listening port 8080')));