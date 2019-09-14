const { errorHandler } = require('errorhandler');
const notify = require('gulp-notify');
const source = require('path').resolve(__dirname, '../src');
const build = require('path').resolve(__dirname, '../build');

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
        watch: `${build}`
    },
    scripts: {
        input: `${source}/assets/scripts/app.js`,
        watch: `${source}/**/*.js`,
        output: `${build}/scripts`
    },
    styles: {
        input: `${source}/assets/styles/app.scss`,
        watch: `${source}/**/*.scss`,
        output: `${build}/css`
    },
    pages: {
        input: `${source}/pages/**/*.twig`,
        watch: [`${source}/pages/**/*.twig`, `${source}/components/**/*.twig`],
        output: `${build}/pages`
    },
    fonts: {
        input: `${source}/fonts/**/*.{ttf,eot,svg,woff,woff2}`,
        output: `${build}/fonts`
    },
    favicons: {
        input: `${source}/favicons/*.{ico,png,svg}`,
        output: `${build}/favicons`
    },
    img: {
        input: `${source}/img/**/*.{jpg,png,jpeg,webp}`,
        output: `${build}/img/`
    },
    video: {
        input: `${source}/video/**/*.{mp4,avi,mov}`,
        output: `${build}/video/`
    },
    svg: {
        input: `${source}/components/**/*.svg`,
        output: `${build}/icons`
    },
    NODE_ENV : process.env.NODE_ENV || 'development', // or production
    isProduction : this.NODE_ENV === 'production'
};
