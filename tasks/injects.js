const { src, dest } = require('gulp');
const resolve = require('path').resolve;
const plumber = require('gulp-plumber');
const inject = require('gulp-inject');
const config = require('./config');
const wait = require('gulp-wait');

const injects = cb => {
  // const css = src(['build/css/style.css', 'src/static/**/*.css'], {read: false});
  // const scripts = src('build/scripts/app.js', {read: false});

  src('temp/*.html')
    .pipe(plumber(config.notify))
    // .pipe(wait(10000))
    .pipe(inject(src(['build/css/style.css', 'src/static/**/*.css'], { read: false }), { relative: false }))
    .pipe(inject(src('build/scripts/app.js', { read: false }), { relative: true }))
    .pipe(dest(config.pages.output))

  cb();
};

exports.injects = injects;
