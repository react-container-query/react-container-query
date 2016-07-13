'use strict';

const join = require('path').join;
const gulp = require('gulp');
const watch = require('gulp-watch');
const debug = require('gulp-debug');
const argv = require('yargs')
  .alias('w', 'watch')
  .argv;

gulp.task('examples:html', function () {
  const src = 'examples/**/*.html';
  return (argv.watch ? watch(join(src), {ignoreInitial: false}) : gulp.src(src))
    .pipe(gulp.dest('public'))
    .pipe(debug({title: 'examples:html'}));
});
