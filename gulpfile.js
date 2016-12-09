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
    return gulp.src(['src/index.js',
                        'src/**/*.js',
                        '!src/js/**/*',
                        '!src/lib/*',
                        '!src/css/*',
                        '!src/html/*',
                        '!src/assets/*',
                        '!src/thirdparties/**/*',
                        '!src/server_simple.js',
                        '!src/browser/*.js',
                        '!src/babylonjs_framework/*.js',
                        '!src/babylonjs_game/*.js',
                        '!src/threejs_framework/*.js',
                        '!src/threejs_game/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
		//.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
//compile for web javascript
gulp.task('src_browser', () => {
    return gulp.src('src/browser/**/*.js')
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
    return gulp.src(['src/babylonjs_framework/*.js','src/babylonjs_framework/**/*.js'])
    .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]

    }))
    .pipe(gulp.dest('public/babylonjs_framework'));
});
//compile amd for require.js build for web javascript
gulp.task('es6-amd-babylonjs-game', () =>{
    return gulp.src(['src/babylonjs_game/*.js','src/babylonjs_game/**/*.js'])
    .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]

    }))
    .pipe(gulp.dest('public/babylonjs_game'));
});
//compile amd for require.js build for web javascript
gulp.task('es6-amd-threejs', () =>{
    return gulp.src(['src/threejs_framework/*.js','src/threejs_framework/**/*.js'])
    .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]

    }))
    .pipe(gulp.dest('public/threejs_framework'));
});

//compile amd for require.js build for web javascript
gulp.task('es6-amd-threejs-game', () =>{
    return gulp.src(['src/threejs_game/*.js','src/threejs_game/**/*.js'])
    .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]
    }))
    .pipe(gulp.dest('public/threejs_game'));
});

gulp.task('html',['src'], () =>{
    //return gulp.src(['src/html/*.html'])
    return gulp.src(['src/html/index.html',
        'src/html/requirejs_main.html',
        'src/html/babylonjs_requirejs_app.html',
        'src/html/babylonjs_requirejs_main.html',
        'src/html/threejs_requirejs_app.html',
        'src/html/threejs_requirejs_main.html',
        'src/html/gundb.html',
        'src/html/network.html'
    ])
    .pipe(gulp.dest('public'));
});

gulp.task('thirdparties', () =>{
    //return gulp.src(['src/html/*.html'])
    return gulp.src(['src/thirdparties/**/*'],{compact: false})
    .pipe(gulp.dest('public'));
});

gulp.task('assets', () =>{
    //return gulp.src(['src/html/*.html'])
    return gulp.src(['src/assets/**/*'],{compact: false})
    .pipe(gulp.dest('public/assets'));
});

gulp.task('lib', () =>{
    //return gulp.src(['src/html/*.html'])
    return gulp.src(['src/lib/**/*'])
    .pipe(gulp.dest('public/lib'));
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
    gulp.watch(['src/index.js','src/app/**/*.js'],['src']);
    gulp.watch('src/browser/**/*.js', ['src_browser']);
    gulp.watch('src/babylonjs_framework/**/*.js', ['es6-amd-babylonjs']);
    gulp.watch('src/babylonjs_game/**/*.js', ['es6-amd-babylonjs-game']);
    gulp.watch('src/threejs_framework/**/*.js', ['es6-amd-threejs']);
    gulp.watch('src/threejs_game/**/*.js', ['es6-amd-threejs-game']);
});

gulp.task('build',['html','lib','src','src_browser','es6-amd-babylonjs','es6-amd-babylonjs-game','es6-amd-threejs','es6-amd-threejs-game'] ,() =>{

});

gulp.task('buildassets',['assets','thirdparties']);


//main entry call task or default task call
gulp.task('default',['server','build','watch']);
