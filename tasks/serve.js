/* eslint-disable import/no-extraneous-dependencies */
const { series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('./config');
const { scss } = require('./scss');
const { twig } = require('./twig');
const { javascript } = require('./javascript');
const { img } = require('./img');
const { fonts } = require('./fonts');
const { video } = require('./video');

const serve = cb => {
  browserSync.init({
    server: config.output,
    startPath: 'index.html',
    open: false,
    port: 8081
  });

  watch(config.pages.watch).on(
    'change',
    series(twig, browserSync.reload)
  );

  watch(config.styles.watch).on(
    'change',
    series(scss, browserSync.reload)
  );

  watch(config.scripts.watch).on(
    'change',
    series(javascript, browserSync.reload)
  );

  watch(config.img.input).on(
    'change',
    series(img, browserSync.reload)
  );

  watch(config.img.input).on(
    'add',
    series(img, browserSync.reload)
  );

  watch(config.video.input).on(
    'change',
    series(video, browserSync.reload)
  );

  watch(config.video.input).on(
    'add',
    series(video, browserSync.reload)
  );

  watch(config.fonts.input).on(
    'change',
    series(fonts, browserSync.reload)
  );

  watch(config.fonts.input).on(
    'add',
    series(fonts, browserSync.reload)
  );

  cb();
};

exports.serve = serve;
