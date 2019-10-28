/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./config');

// https://www.npmjs.com/package/gulp-filenames

const static = cb => {
  return src(config.static.input, { read: false })
    .pipe(plumber(config.notify))
    .pipe(dest(config.static.output));

  // cb();
};

exports.static = static;
