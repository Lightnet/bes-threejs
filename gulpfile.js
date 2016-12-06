//https://www.sitepoint.com/transpiling-es6-modules-to-amd-commonjs-using-babel-gulp/

const gulp = require('gulp');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const addsrc = require('gulp-add-src');
const concat = require('gulp-concat');
const cleants = require('gulp-clean-ts-extends');
const optimisejs = require('gulp-optimize-js');
const babel = require('gulp-babel');
const del = require('del');
const requirejs = require('gulp-requirejs');

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

gulp.task('src_browser', () => {
    gulp.src('src_browser/**/*.js')
        .pipe(babel({
			presets: ['es2015']
        }))
        .pipe(cleants())
		//.pipe(uglify())
        .pipe(optimisejs())
		.pipe(gulp.dest('public/js/'));
});

gulp.task('babylon_framework', () => {
    gulp.src('babylonjs_framework/babylonjs_framework.js')
        //.pipe(addsrc.append('babylonjs_framework/babylonjs_framework_scene.js'))
        //.pipe(addsrc.append('babylonjs_framework/babylonjs_framework_init.js'))
        .pipe(babel({
			presets: ['es2015'] ,
            modules:["common"]
        }))
        .pipe(concat('babylonjs_framework.js'))
        .pipe(cleants())
		//.pipe(uglify())
        .pipe(optimisejs())
		.pipe(gulp.dest('public/js/'));
});

//gulp.task('default',['server','babylon_framework']);

gulp.task('es6-amd', function(){
    return gulp.src(['babylonjs_framework/*.js','babylonjs_framework/**/*.js'])
    .pipe(babel({
        //plugins: ['transform-runtime'],
        modules:["amd"]
    }))
    .pipe(gulp.dest('dest/temp'));
});

gulp.task('bundle-amd-clean', function(){
  return del(['es5/amd']);
});

gulp.task('amd-bundle',['es6-amd'], function(){
  return requirejs({
    name: 'bootstrap',
    baseUrl: 'dest/temp',
    out: 'app.js'
  })
  .pipe(uglify())
  .pipe(gulp.dest("es5/amd"));
});

//gulp.task('default',['amd-bundle'], function () {
gulp.task('default', function () {
    //gulp.watch('babylonjs_framework/babylonjs_framework.js', ['default']);
    gulp.watch('src/**/*.js', ['server']);
    gulp.watch('src_browser/**/*.js', ['src_browser']);
    gulp.watch('babylonjs_framework/**/*.js', ['babylon_framework']);
});
