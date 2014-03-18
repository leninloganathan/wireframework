var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var swig = require('gulp-swig');
var marked = require('swig-marked');

var swigoptions  = {
  setup: function(swig) {
    marked.useTag(swig, 'markdown');
  },
  defaults: { cache: false }
};

var sassConfig = {
    loadPath: [
        'src/styles/',
        'bower_modules/'
    ]
};

var paths = {
  sass: 'src/**/*.scss',
  images: 'src/images/**/*',
  javascript: 'src/javascript/**/*.js',
  jquery: 'bower_modules/jquery/dist/jquery.min.js',
  normalizecss: 'bower_modules/normalize.css/normalize.css',
  html: 'src/**/*.html',
  content: ['src/**/*.html','!./src/layouts/*']
};

gulp.task('sass', function() {
	return gulp.src(paths.sass)
		.pipe(sass(sassConfig))
		.pipe(gulp.dest('./build'));
});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(gulp.dest('./build/images'));
});

gulp.task('bowerfiles', function() {
  gulp.src(paths.jquery)
    .pipe(gulp.dest('./build/javascript'));

  gulp.src(paths.normalizecss)
		.pipe(gulp.dest('./build/styles'));
});

gulp.task('javascript', function() {
  return gulp.src(paths.javascript)
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./build/javascript'));
});

gulp.task('templates', function() {
  gulp.src(paths.content)
    .pipe(swig(swigoptions))
    .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['templates']);
  gulp.watch(paths.javascript, ['javascript']);
});

gulp.task('connect', connect.server({
  root: ['build']
}));

gulp.task('default', ['init','watch','connect']);
gulp.task('init', ['bowerfiles','javascript','images','sass','templates']);
