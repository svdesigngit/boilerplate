/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-cleancss');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const objectFitImages = require('postcss-object-fit-images');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const config = require('./config');
const { reload } = browserSync;

const isDev = process.env.NODE_ENV === 'development';

const scss = cb => {
  const plugins = [
    autoprefixer(),
    // mqpacker({
    //   sort: true
    // }),
    objectFitImages()
  ];

  src(config.styles.input)
    .pipe(plumber(config.notify))
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(postcss(plugins))
    .pipe(gulpif(isDev, sourcemaps.write('/')))
    .pipe(gulpif(!isDev, cleanCSS()))
    .pipe(rename('style.css'))
    .pipe(dest(config.styles.output))
    .pipe(gulpif(!isDev, rename('style.min.css')))
    .pipe(gulpif(!isDev, dest(config.styles.output)))
    .pipe(reload({ stream: true }));

  cb();
};

exports.scss = scss;
