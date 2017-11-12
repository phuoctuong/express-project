// @flow

type TestType = {
	name: string
};

const test = (obj: TestType) => {
	console.log('HELLO');
};

test();

// import express from 'express';
// import axios from 'axios';
// import log from './helper/log';
// import connect from './config/connect';

// type TestType = {
// 	name: string
// };

// const test = (a: TestType) => {
// 	console.log('HELLO');
// };

// test();

// const app = express();

// app.get('/', (req, res) => {
// 	res.send('Welcome to Express Server');
// });

// app.get('/test', (req, res) => {
// 	axios.post('https://www.netflix.com/api/shakti/386236be/account/playbackprefs', {
// 		authURL: '1508550696557.XEcxgQYkSaznw7ulYLv6fdGVNaU=',
// 		autoplay: true,
// 		videoQuality: 'EconomyStreams'
// 	}, {
// 		withCredentials: true
// 	})
// 		.then((response) => {
// 			console.log('Completely', response);
// 		})
// 		.catch((error) => {
// 			console.log('Erorr', error);
// 		});
// 	res.send('OK');
// });

// // Handle Error
// app.get('*', (req, res, next) => {
// 	const err = new Error();
// 	err.status(404);
// 	next(err);
// });

// app.use((err, req, res, next) => {
// 	res.status(404).json({
// 		error: true,
// 		data: {
// 			message: err.message || 'Something broken'
// 		}
// 	});
// });
// connect(() => app.listen(8080, log.info('Listening port 8080')));