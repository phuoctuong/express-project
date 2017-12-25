// @flow

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';
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

app.use(express.static(path.join(process.cwd(), '/node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/auth', authRouter, socialRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to our word!');
});

app.get('/home', (req: Request, res: Response) => {
	res.sendFile(path.join(process.cwd(), 'index.html'));
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

connect(() => {
	app.listen(8080, () => log.info('Listening server port 8080'));
	io.listen(3000);
});
