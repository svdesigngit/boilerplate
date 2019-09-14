/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');
const flatten = require('gulp-flatten');
const config = require('./config');

const img = cb => {
  src(config.img.input)
    .pipe(plumber(config.notify))
    .pipe(flatten())
    .pipe(dest(config.img.output))
    .pipe(webp())
    .pipe(dest(config.img.output));

  cb();
};

exports.img = img;
