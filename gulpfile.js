'use strict';

// Main dependencies and plugins
var gulp = require('gulp');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less-sourcemap');
// var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');

var less_path = 'www/less/**/*.less';
var css_path = './www/css';


gulp.task('less', function () {
    gulp.src('./www/less/main.less')
    .pipe(less({ generateSourceMap: true }))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest( css_path ));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(less_path, ['less']);
});

gulp.task('demon', ['less', 'watch'], function () {
    nodemon({
        script: 'app.js',
        ext: 'html js css',
        env: {
            'NODE_ENV': 'development'
        }
    });
});

// Default Task
gulp.task('default', ['demon']);