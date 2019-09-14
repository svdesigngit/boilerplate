/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./config');

const fonts = cb => {
  src(config.fonts.input)
    .pipe(plumber(config.notify))
    .pipe(dest(config.fonts.output));

  cb();
};

exports.fonts = fonts;
