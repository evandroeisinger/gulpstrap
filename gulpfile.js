'use strict';

var gulp 	  = require('gulp'),
	connect   = require('gulp-connect'),
	watch	  = require('gulp-watch'),
	usemin    = require('gulp-usemin'),
	sass      = require('gulp-sass'),
	uglify    = require('gulp-uglify'),
	htmlmin   = require('gulp-minify-html'),
	jasmine   = require('gulp-jasmine');

gulp.task('server', function() {

	connect.server({ livereload: true, root: 'app' });

});

gulp.task('styles', function() {

	return gulp.src('app/scss/**/*.scss')
    	.pipe(sass({ sourceComments: 'map', sourceMap: 'scss', outputStyle: 'compressed' }))
    	.pipe(gulp.dest('app/css'));

});

gulp.task('test', function () {

	gulp.src('test/**')
		.pipe(jasmine());

});

gulp.task('default', ['server'], function(){

	gulp.src('app/**', { read: false })
    	.pipe(watch())
    	.pipe(connect.reload());

    watch({ glob: 'app/scss/**/*.scss' })
    	.pipe(sass({ sourceComments: 'map', sourceMap: 'scss', outputStyle: 'compressed' }))
    	.pipe(gulp.dest('app/css'));

});

gulp.task('build', ['test','styles'], function() {

	var buildName    = ['build', Date.now()].join('/'),
		buildTasks   = { js: [uglify()], html: [htmlmin()] },
		buildMessage = ['Build', buildName, 'created.'].join(' ');

	gulp.src('app/*.html')
		.pipe(usemin(buildTasks))
		.pipe(gulp.dest(buildName));

});