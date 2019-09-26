/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const prettyHtml = require('gulp-pretty-html');
const twig = require('gulp-twig');
const data = require('gulp-data');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const config = require('./config');

const { reload } = browserSync;

const isDev = process.env.NODE_ENV === 'development';

const compileTwig = cb => {
  const prettyHtmlConfig = {
    indent_size: 4,
    indent_char: ' ',
    unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
    content_unformatted: []
  };

  // const data = {
  //   title: 'Gulp and Twig',
  //   benefits: [
  //     'Fast',
  //     'Flexible',
  //     'Secure'
  //   ]
  // };

  src(config.pages.input)
    .pipe(plumber(config.notify))
    .pipe(data(function (file) {
      return JSON.parse(fs.readFileSync('src/static/data/test.json'));
    }))
    .pipe(twig({
      // data: data,
      // base: '', // views base folder
      functions: [
        {
          name: "customFunction",
          func: function (args) {
            console.log(args);

            return "the function";
          }
        }
      ],
      filters: [
        {
          name: "customFilter",
          func: function (args) {
            console.log(arguments);
            
            return args + " the filter";
          }
        }
      ],
    }))
    .pipe(gulpif(isDev, prettyHtml(prettyHtmlConfig)))
    .pipe(dest(config.pages.temp))
    .pipe(dest(config.pages.output))
    .pipe(reload({ stream: true }));

  cb();
};

exports.twig = compileTwig;
