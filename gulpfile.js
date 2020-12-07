const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function sassStyle() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream()); // stream changes to browserSync    
}

function style() {
    return gulp.src('./css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream()); // stream changes to browserSync    
}

function watch() {
    // Start browserSync...
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    // also watch the scss files
    gulp.watch('./scss/**/*.scss', gulp.series(sassStyle, style));
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.default = style;
exports.watch = watch;