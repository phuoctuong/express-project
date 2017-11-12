const gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	nodemon = require('gulp-nodemon'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	gutil = require('gulp-util'),
	clean = require('gulp-clean'),
	flow = require('gulp-flowtype'),
	sequence = require('gulp-sequence');
const path = require('path');

const paths = {
	es6: ['src/**/*.js'],
	sourceRoot: path.join(__dirname, 'src')
};

gulp.task('clean', () => {
	return gulp.src('./dist', { read: false })
		.pipe(clean());
});

gulp.task('lint', () => {
	return gulp.src(paths.es6)
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('flow', () => {
	return gulp.src(paths.es6)
		.pipe(flow({
			killFlow: false,
			declarations: './src/flow-typed'
		}));
});

gulp.task('scripts', ['lint', 'flow'], () => {
	return gulp.src(paths.es6)
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});

gulp.task('build_prod', ['clean', 'scripts']);
gulp.task('build_dev', () => {
	nodemon({
		script: 'src/app.js',
		exec: './node_modules/.bin/babel-node',
		env: { NODE_ENV: 'development' },
		watch: paths.es6,
		tasks: 'lint'
	});
});

gulp.task('production', ['build_prod'], () => {
	gutil.log('Bundle Successfully');
});

gulp.task('development', () => {
	sequence(['lint', 'flow'], 'build_dev', (err) => {
		if (err) {
			gutil.log('Run Dev Failed');
		}
	});
});

gulp.task('default', ['production']);