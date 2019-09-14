/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const config = require('./config');
const webpackConfig = require('../webpack.config.js');

const javascript = cb => {
  src(config.scripts.input)
    .pipe(plumber(config.notify))
    .pipe(webpack(webpackConfig))
    .pipe(dest(config.scripts.output));

  cb();
};

exports.javascript = javascript;
