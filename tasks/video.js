/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./config');

const video = cb => {
  src(config.video.input)
    .pipe(plumber(config.notify))
    .pipe(dest(config.video.output));

  cb();
};

exports.video = video;
