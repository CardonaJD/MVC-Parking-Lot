const gulp = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

const SCRIPTS_SRC = 'src/**/*.js';
const STYLES_SRC = 'src/css/*.css';
const IMAGES_SRC = './src/images/**/*';
const HTML_SRC = 'src/html/index.html'

function scripts() {
    return gulp.src(SCRIPTS_SRC)
        .pipe(concat('app.js'))
        .pipe(minify({
            noSource: true
        }))
        .pipe(gulp.dest('dist/js'));
}

function styles() {
    return gulp.src(STYLES_SRC)
        // .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}

function html() {
    return gulp.src(HTML_SRC)
        // .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
}

function images() {
    return gulp.src(IMAGES_SRC)
        .pipe(gulp.dest('dist/images'));
}

function watch_files() {
    gulp.watch(SCRIPTS_SRC, gulp.series(scripts));
    gulp.watch(STYLES_SRC, gulp.series(styles));
}

gulp.task('default', gulp.parallel(scripts, styles, html));
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('html', html);
gulp.task('images', images);
gulp.task('watch', gulp.series(scripts, styles, html, images, watch_files));