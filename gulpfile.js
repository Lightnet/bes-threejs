/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

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
const server = require('gulp-express');

gulp.task('clean-temp', () =>{
  //return del(['dist/*']);
});
//run express server
gulp.task('server',['src'], () => {
    // Start the server at the beginning of the task
    server.run(['dist/index.js']);

    //return gulp.watch(['dist/index.js'], server.notify);
    return gulp.watch(['dist/index.js'], [server.run]);
});
//compile nodejs javascript
gulp.task('src', () => {
    return gulp.src(['src/*.js','src/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
		//.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
//compile for web javascript
gulp.task('src_browser', () => {
    return gulp.src('src_browser/**/*.js')
        .pipe(babel({
			presets: ['es2015']
        }))
        .pipe(cleants())
		//.pipe(uglify())
        .pipe(optimisejs())
		.pipe(gulp.dest('public/js/'));
});
//compile amd for require.js build for web javascript
gulp.task('es6-amd-babylonjs', () =>{
    return gulp.src(['babylonjs_framework/*.js','babylonjs_framework/**/*.js'])
    .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]

    }))
    .pipe(gulp.dest('public/babylonjs_framework'));
});
//compile amd for require.js build for web javascript
gulp.task('es6-amd-threejs', () =>{
    return gulp.src(['threejs_framework/*.js','threejs_framework/**/*.js'])
    .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]

    }))
    .pipe(gulp.dest('public/threejs_framework'));
});


//copy all files to single one [NOT recommended]
//gulp.task('amd-bundle',['es6-amd'], () =>{
    //return requirejs({
        //name: 'babylonjs_framework_boot',
        //baseUrl: 'public/babylonjs_app',
        //out: 'app.js'
    //})
    //.pipe(uglify())
    //.pipe(gulp.dest("public/babylonjs_app"));
//});

//watch files changes and auto compile file.
gulp.task('watch', () =>{
    gulp.watch('src/**/*.js',['src']);
    gulp.watch('src_browser/**/*.js', ['src_browser']);
    gulp.watch('babylonjs_framework/**/*.js', ['es6-amd-babylonjs']);
    gulp.watch('threejs_framework/**/*.js', ['es6-amd-threejs']);
});

//main entry call task or default task call
gulp.task('default',['src','server','src_browser','es6-amd-babylonjs','es6-amd-babylonjs','watch']);
