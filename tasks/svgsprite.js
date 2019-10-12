const { src, dest } = require('gulp');
const plumber       = require('gulp-plumber');
const svgSprite     = require('gulp-svg-sprite');
const cheerio       = require('gulp-cheerio');
const config        = require('./config');

const svgsprite = cb => {
  
  return src(config.svgsprite.input)
    .pipe(plumber(config.notify))
    
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    
    //.pipe(replace('&gt;', '>'))
    
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'sprite-svg.svg',
          dest: '.',
          example: true,
        },
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        rootAttributes: {
          class: 'svgsprite'
        }
      }
    }))
    
    .pipe(dest(config.svgsprite.output));
  
  //cb();
};

exports.svgsprite = svgsprite;
