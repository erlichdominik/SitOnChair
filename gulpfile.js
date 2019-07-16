const gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');


sass.compiler = require('node-sass');

function showError(err) {
    console.log('____________________');
    console.log(err.messageFormatted);
    console.log('____________________');
    
    notifier.notify({
        title: 'Error SASS',
        message: err.messageFormatted
    });
}


const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        //browser: "google chrome"
        notify: false
    });
    cb();
}

const css = function() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', showError))
        .pipe(autoprefixer({}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

const watcher = function() {
    gulp.watch("scss/**/*.scss", gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);

}

exports.css = css;   
exports.watcher = watcher;
exports.default = gulp.series(css,server,watcher);