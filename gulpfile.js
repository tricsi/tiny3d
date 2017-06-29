'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require("del");
const merge = require('merge2');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json', {declaration: true});

gulp.task('clean', function () {
    return del(['lib/*']);
});

gulp.task('compile', ['clean'], function() {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return merge([
        tsResult.dts
            .pipe(gulp.dest('lib')),
        tsResult.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('lib'))
    ]);
});

gulp.task('minify', ['compile'], function() {
    const tsResult = gulp.src('lib/*.js')
        .pipe(minify())
        .pipe(gulp.dest('lib'));
});

gulp.task('default', ['clean', 'compile', 'minify']);

gulp.task('watch', ['default'], function () {
    gulp.watch('src/**/*.ts', ['default']);
});
