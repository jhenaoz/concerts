//IMPORT THE REQUIRED LIBS
const gulp = require('gulp');
const path = require('path');
const server = require('gulp-express');
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const wiredep = require('wiredep').stream;
const open = require('gulp-open');

//DEFINE GLOBAL PATHS
const config = {
  app: 'app',
  dist: 'dist'
};

gulp.task('reload', function () {
  gulp.src('./app/**/*.*')
    .pipe(connect.reload());
});

gulp.task('clean:temp', function(option){
  return gulp.src('.tmp', {read: false})
  .pipe(clean());

});
gulp.task('clean:dist', function(option){
  return gulp.src(config.dist, {read: false})
  .pipe(clean());
});

gulp.task('watch', ()=> {
  gulp.watch(['./app/**/*.html'], server.notify);
  gulp.watch(['./app/**/*.js'], server.notify);
  gulp.watch(['./app/styles/*.css'], server.notify);
  gulp.watch(['./server/**/*.js'], server.notify);
});

//Inject the bower.json dependencies in index.html file
gulp.task('wiredep', () => {
  gulp.src( path.join(config.app, '/index.html'))
    .pipe(wiredep(
      //Wiredepp special configuration
    )).pipe(gulp.dest(config.app));
});

gulp.task('inject', () => {
  var target = gulp.src( path.join(config.app, '/index.html'));
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    path.join('!' + config.app, '/lib/**/*'),
    path.join(config.app, '/**/*.js'), //this are equivalent'./app/**/*.js'
    path.join(config.app, '/styles/*.css')
  ], {read: false});
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(config.app));
});

gulp.task('server', () => {
  server.run(['server/app.js', '--debug']);
});

gulp.task('open', () => {
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('start', [
  'clean:temp',
  'wiredep',
  'server',
  'open',
  'watch'
]);
