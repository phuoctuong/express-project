import chalk from 'chalk';

class Log {
	error(...messages) {
		console.error(chalk.red(messages.join(' ')));
	}
	info(...messages) {
		console.info(chalk.green(messages.join(' ')));
	}
	warn(...messages) {
		console.warn(chalk.yellow(messages.join(' ')));
	}
}
const log = new Log();

export default log;