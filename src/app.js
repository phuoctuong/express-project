// @flow

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import http from 'http';
import log from './helper/log';
import connect from './config/connect';
import io from './socket';
import {
	authRouter,
	socialRouter,
	userRouter,
	postRouter
} from './routes';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/auth', authRouter, socialRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to our app');
});

// Handle Error
app.get('*', (req: Request, res: Response) => {
	res.status(404).json({
		code: 404,
		error: true,
		message: 'Not Found'
	});
});

app.use((err: ErrorType, req: Request, res: Response) => {
	const code = err.status || 500;
	res.status(code).json({
		code,
		erorr: true,
		message: err.message || 'Something broken'
	});
});

if (process.env.NODE_ENV !== 'test') {
	connect(() => {
		io.listen(server);
		server.listen(8080, () => {
			log.info('Listening server port 8080');
		});
	});
}

export default app;