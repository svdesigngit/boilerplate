/* eslint-disable import/no-extraneous-dependencies */
const { series, parallel } = require('gulp');
const { clean } = require('./tasks/clean');

const { scss } = require('./tasks/scss');
const { twig } = require('./tasks/twig');
const { javascript } = require('./tasks/javascript');
const { img } = require('./tasks/img');
const { fonts } = require('./tasks/fonts');
const { video } = require('./tasks/video');
const { serve } = require('./tasks/serve');
// const { injects } = require('./tasks/injects');
const { static } = require('./tasks/static');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  exports.default = series(
    clean,
    parallel(
      img,
      fonts,
      twig,
      scss,
      javascript,
      video,
    ),
    static,
    // injects,
    serve
  );
} else {
  exports.default = series(
    clean,
    parallel(
      img,
      fonts,
      twig,
      javascript,
      video,
      scss
    )
  );
}
