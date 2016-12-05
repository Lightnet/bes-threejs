//https://www.sitepoint.com/transpiling-es6-modules-to-amd-commonjs-using-babel-gulp/

const gulp = require('gulp');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const addsrc = require('gulp-add-src');
const concat = require('gulp-concat');
var cleants = require('gulp-clean-ts-extends');
var optimisejs = require('gulp-optimize-js');
const babel = require('gulp-babel');
const del = require('del');


gulp.task('clean-temp', function(){
  //return del(['dist']);
});

gulp.task('server',['clean-temp'], () => {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});


gulp.task('babylon_framework', () => {
    gulp.src('babylonjs_framework/babylonjs_framework.js')
        //.pipe(addsrc.append('babylonjs_framework/babylonjs_framework_scene.js'))
        //.pipe(addsrc.append('babylonjs_framework/babylonjs_framework_init.js'))
        .pipe(babel({
			presets: ['es2015'] //,
            //modules:"commonjs"
        }))
        //.pipe(concat('babylon_.js'))
        .pipe(concat('babylonjs_framework.js'))
        .pipe(cleants())
		//.pipe(uglify())
        //.pipe(gulp.dest('dist'));
        .pipe(optimisejs())
		.pipe(gulp.dest('public/js/'));
});

//gulp.task('default',['css','js']);
//gulp.task('default',['server','babylon_framework']);

gulp.task('default', function () {
    //gulp.watch('babylonjs_framework/babylonjs_framework.js', ['default']);
    gulp.watch('babylonjs_framework/babylonjs_framework.js', ['server','babylon_framework']);
});
