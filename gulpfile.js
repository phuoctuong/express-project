var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		nodemon = require('gulp-nodemon'),
		sourcemaps = require('gulp-sourcemaps'),
		babel = require('gulp-babel'),
		eslint = require('gulp-eslint'),
		gutil = require('gulp-util'),
		clean = require('gulp-clean');
var path = require('path');

var paths = {
	es6: ['src/**/*.js'],
	sourceRoot: path.join(__dirname, 'src'),
};

gulp.task('clean', function() {
	return gulp.src('./dist',{ read: false })
				.pipe(clean());
});

gulp.task('lint', function() {
	return gulp.src(paths.es6)
				.pipe(plumber())
				.pipe(eslint())
				.pipe(eslint.format())
				.pipe(eslint.failAfterError());
});

gulp.task('scripts', ['lint'], function() {	
	return gulp.src('src/**/*.js')
				.pipe(babel())
				.pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'scripts']);

gulp.task('production', ['build'], function() {
	gutil.log('Bundle Successfully');
});

gulp.task('development', function() {
	gulp.start('lint');
	nodemon({
		script: 'src/app.js',
		exec: './node_modules/.bin/babel-node',
		env: {'NODE_ENV': 'development'},
		watch: 'src/**/*.js',
		tasks: ['lint'],
	});
});

gulp.task('default', ['production']);