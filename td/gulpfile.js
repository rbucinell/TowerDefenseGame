var gulp = require('gulp'),	
	babel		= require('gulp-babel'),
	concat		= require('gulp-concat'),
	watch		= require('gulp-watch');

var src = 'src/';
var dest = 'dist/';

gulp.task('watch', function(){
	
});

gulp.task('default', ['html','js']);


gulp.task('html', function(){
	return gulp.src( src + '*.html')
		.pipe( gulp.dest( dest ));
});

gulp.task('js', function(){

	return gulp.src( src + 'js/*.js')
		.pipe( babel({
			presets: ["es2015"]
		}))
		.pipe( concat( 'td.js' ))
		.pipe( gulp.dest(dest + '/js/'));
});