/* eslint-disable import/no-extraneous-dependencies */
const {series, parallel} = require('gulp');
const {clean} = require('./tasks/clean');

const {scss} = require('./tasks/scss');
const {svgsprite} = require('./tasks/svgsprite');
const {svgspritehtml} = require('./tasks/svgspritehtml');
const {twig} = require('./tasks/twig');
const {javascript} = require('./tasks/javascript');
const {img} = require('./tasks/img');
const {fonts} = require('./tasks/fonts');
const {video} = require('./tasks/video');
const {serve} = require('./tasks/serve');
const {copyStatic} = require('./tasks/copyStatic');
// const { injects } = require('./tasks/injects');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  exports.default = series(
    clean,
    parallel(
      img,
      fonts,
      twig,
      scss,
      svgsprite,
      javascript,
      video
    ),
    svgspritehtml,
    copyStatic,
    serve,
    // injects,
  );
} else {
  exports.default = series(
    clean,
    parallel(
      img,
      fonts,
      twig,
      svgsprite,
      javascript,
      video,
      scss
    ),
    svgspritehtml,
    copyStatic,
    // injects,
  );
}
