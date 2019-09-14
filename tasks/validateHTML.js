/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const config = require('./config');

const validate = cb => {
  src('target/**/*.html')
    .pipe(plumber(config.notify))
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter());

  cb();
};

exports.validate = validate;
