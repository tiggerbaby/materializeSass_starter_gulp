var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var pkg = require('./package.json');


// Compile Materialize sass files from /sass into /css
gulp.task('style', function() {
    gulp.src('vendor/materialize/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

// Minify compiled CSS
gulp.task('minify-css', ['style'], function() {
    return gulp.src('vendor/materialize/css/materialize.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Run everything
gulp.task('default', ['style', 'minify-css']);

//Watch task
gulp.task('dev', ['browserSync', 'style', 'minify-css'], function() {
    gulp.watch('vendor/materialize/sass/*.sass', ['style']);
    gulp.watch('vendor/materialize/css/*.css', ['minify-css']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/*.js', browserSync.reload);
});
