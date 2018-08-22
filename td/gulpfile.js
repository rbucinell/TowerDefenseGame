/* eslint-disable*/

var gulp 		= require('gulp'),	
	del			= require('del'),
	concat		= require('gulp-concat')

var src = 'src/';
var dest = 'dist/';

//Until I update the codebase, I'll explicitly build files in order
var files = [ src+'js/TrackMap.js',
	src+'js/Texture.js',
	src+'js/Atlas.js',
	src+'js/Button.js',
	src+'js/TrackInterface.js',
	src+'js/Enemy.js',
	src+'js/Wave.js',
	src+'js/Track.js',
	src+'js/TDGame.js'];

gulp.task( 'clean', function(cb) {
	return del([dest+'/*']);
});

gulp.task('default', ['build']);

gulp.task('html', function(){
	return gulp.src( src + '*.html')
		.pipe( gulp.dest( dest ));
});

gulp.task('css', function(){
	return gulp.src( src + 'css/*.css')
		.pipe( gulp.dest( dest + 'css/' ));
});

gulp.task('data', function(){
	return gulp.src( src + 'data/**.*')
		.pipe( gulp.dest( dest + 'data/' ));
});

gulp.task('img', function(){
	return gulp.src( src + 'img/**.*')
		.pipe( gulp.dest( dest + 'img/' ));
});

gulp.task('js', function(){
	gulp.src( [src +'js/lib/*.js', src+ 'js/*.js', src+'js/main.js'] )
		.pipe( gulp.dest(dest + 'js/'));
});

gulp.task('build', ['clean'], function(){
	gulp.start(['html','js','css','data','img']);
});

gulp.task('watch', function()
{
	gulp.watch( src+'css/*.css', ['css']);
	gulp.watch( src+'js/*.js',   ['js']);
	gulp.watch( src+'*.html',    ['html']);
});
