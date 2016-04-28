'use strict';

var gulp = require('gulp');
var es = require('event-stream');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var order = require('gulp-order');

const apiDist = '../api';

/**
 * Clean ups api dist folder
 */
gulp.task('clean', function() {
  return gulp
    .src(apiDist, {read: false})
    .pipe(clean({force: true}))
    .on('error', log);
});

/**
 * Processes Handlebars templates
 */
function templates() {
  return gulp
    .src(['./template/**/*'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Handlebars.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .on('error', log);
}

/**
 * Build a distribution
 */
gulp.task('dist', ['clean'], function() {

  return es.merge(
      gulp.src([
        './javascript/**/*.js',
        './node_modules/swagger-client/browser/swagger-client.js'
      ]),
      templates()
    )
    .pipe(order(['scripts.js', 'templates.js']))
    .pipe(concat('swagger-ui.js'))
    .pipe(wrap('(function(){<%= contents %>}).call(this);'))
    .pipe(gulp.dest(apiDist))
    .pipe(uglify())
    .on('error', log)
    .pipe(rename({extname: '.min.js'}))
    .on('error', log)
    .pipe(gulp.dest(apiDist));
});

/**
 * Processes less files into CSS files
 */
gulp.task('less', ['clean'], function() {

  return gulp
    .src([
      './less/screen.less',
      './less/print.less',
      './less/reset.less'
    ])
    .pipe(less())
    .on('error', log)
    .pipe(gulp.dest('./html/css/'));
});


/**
 * Copy lib and html folders
 */
gulp.task('copy', ['less'], function() {

  // copy JavaScript files inside lib folder
  gulp
    .src(['./lib/**/*.{js,map}'])
    .pipe(gulp.dest(`${apiDist}/lib`))
    .on('error', log);

  // copy all files inside html folder
  gulp
    .src(['./html/**/*'])
    .pipe(gulp.dest(apiDist))
    .on('error', log);
});

function log(error) {
  console.error(error.toString && error.toString());
}


gulp.task('default', ['dist', 'copy']);
