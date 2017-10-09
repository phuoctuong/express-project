import express from 'express';
import connect from './config/connect';

const app = express();

app.get('/', (req, res) => {
	res.send('Welcome to Express Server');
});

// Handle Error
app.get('*', (req, res, next) => {
	const err = new Error();
	err.status(404);
	next(err);
});

app.use((err, req, res, next) => {
	res.status(404).json({
		error: true,
		data: {
			message: err.message || 'Something broken'
		}
	});
});

connect(() => app.listen(8080, Log.info('Listening port 8080')));
