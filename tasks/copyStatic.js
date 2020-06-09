/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./config');

const copyStatic = () => {
  return src(config.static.input, { read: false })
    .pipe(plumber(config.notify))
    .pipe(dest(config.static.output));
};

exports.copyStatic = copyStatic;
