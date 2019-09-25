const { errorHandler } = require('errorhandler');
const notify = require('gulp-notify');
const resolve = require('path').resolve;
const source = resolve(__dirname, '../src');
const build = resolve(__dirname, '../build');

module.exports = {
  output: build,
  notify: {
    errorHandler(err) {
      notify.onError({
        title: 'Error',
        message: err.message
      })(err);
      this.emit('end');
    }
  },
  server: {
    watch: `build`
  },
  scripts: {
    input: resolve(__dirname, '../src/assets/scripts/app.js'),
    watch: [`src/assets/**/*.js`, `src/blocks/**/*.js`],
    output: resolve(__dirname, '../build/scripts')
  },
  styles: {
    input: `src/assets/styles/app.scss`,
    watch: [`src/assets/**/*.scss`, `src/blocks/**/*.scss`],
    output: `build/css`
  },
  pages: {
    input: `src/pages/*.twig`,
    watch: [
      `src/pages/**/*.twig`,
      `src/blocks/**/*.twig`,
      `src/components/**/*.twig`,
    ],
    temp: `temp`,
    output: `build`
  },
  fonts: {
    input: `src/fonts/**/*.{ttf,eot,svg,woff,woff2}`,
    output: `build/fonts`
  },
  favicons: {
    input: `src/favicons/*.{ico,png,svg}`,
    output: `build/favicons`
  },
  img: {
    input: `src/img/**/*.{jpg,png,jpeg,webp}`,
    output: `build/img/`
  },
  video: {
    input: `src/video/**/*.{mp4,avi,mov}`,
    output: `build/video/`
  },
  svg: {
    input: `src/components/**/*.svg`,
    output: `build/icons`
  },
  static: {
    input: `src/static/**/*.*`,
    output: `build`
  },
  NODE_ENV: process.env.NODE_ENV || 'development', // or production
  isProduction: this.NODE_ENV === 'production'
};
