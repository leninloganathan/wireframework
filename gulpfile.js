var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var swig = require('gulp-swig');
var marked = require('swig-marked');
var buildbranch = require('buildBranch');

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
  sass: 'src/styles/**/*.scss',
  images: 'src/images/**/*',
  javascript: 'src/javascript/**/*.js',
  jquery: 'bower_modules/jquery/dist/jquery.min.js',
  bootstrap: ['bower_modules/bootstrap/dist/css/bootstrap.css','bower_modules/bootstrap/dist/css/bootstrap-theme.css','bower_modules/bootstrap/dist/js/bootstrap.js','bower_modules/bootstrap/dist/fonts/*'],
  html: 'src/**/*.html',
  content: ['src/**/*.html','!./src/_layouts/*']
};

gulp.task('sass', function() {
	return gulp.src(paths.sass)
		.pipe(sass(sassConfig))
		.pipe(gulp.dest('./build/styles'));
});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(gulp.dest('./build/images'));
});

gulp.task('bowerfiles', function() {
    gulp.src(paths.jquery)
    .pipe(gulp.dest('./build/javascript'));

    gulp.src([paths.bootstrap[0],paths.bootstrap[1]])
    .pipe(gulp.dest('./build/styles'));

    gulp.src(paths.bootstrap[2])
    .pipe(gulp.dest('./build/javascript'));

    gulp.src(paths.bootstrap[3])
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('javascript', function() {
  return gulp.src(paths.javascript)
    .pipe(concat('all.js'))
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

gulp.task('githubpages',function(){
    buildbranch({
        branch: 'gh-pages',
        ignore: ['build','node_modules','bower_modules','src'],
        folder: 'build',
        domain: 'www.wireframework.com'
    }, function(err) {
        if(err) {
            throw err;
        }
        console.log('Published!');
    });
});

gulp.task('default', ['init','watch','connect']);
gulp.task('init', ['bowerfiles','javascript','images','sass','templates']);
