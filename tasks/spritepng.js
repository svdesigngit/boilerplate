// ЗАДАЧА: сшивка PNG-спрайта
gulp.task('png:sprite', function () {
  let fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
  let spriteData = gulp.src('src/img/png-sprite/*.png')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(spritesmith({
      imgName: fileName,
      cssName: 'sprite.sass',
      cssFormat: 'sass',
      padding: 4,
      imgPath: '../img/' + fileName
    }));
    
  let imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));

  let cssStream = spriteData.css
    .pipe(gulp.dest(dirs.source + '/sass/'));

  return merge(imgStream, cssStream);
});
