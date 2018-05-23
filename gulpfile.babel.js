const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const sequence = require('gulp-sequence');

gulp.task('lint', () => {
	return gulp.src('src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('watch-lint-flow', ['lint'], () => {
	gulp.watch('src/**/*.js', ['lint']);
});

gulp.task('dev', ['watch-lint-flow'], () => {
	nodemon({
		script: 'src/app.js',
		exec: './node_modules/.bin/babel-node',
		watch: 'src/**/*.js'
	});
});

gulp.task('clean', () => {
	return gulp.src('./dist', { read: false })
		.pipe(clean());
});

gulp.task('build', ['clean'], () => {
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build'));
});

gulp.task('production', sequence(['lint'], 'build'));