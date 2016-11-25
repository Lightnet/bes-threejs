const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
