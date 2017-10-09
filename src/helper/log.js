import chalk from 'chalk';

export default class Log {
	static error(...messages) => console.error(chalk.red(messages.join(' ')));
	static info(...messages) => console.info(chalk.blue(messages.join(' ')));
	static warn(...messages) => console.warn(chalk.yellow(messages.join(' ')));
};