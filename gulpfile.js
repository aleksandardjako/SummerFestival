const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');

// compile scss to css
function style() {
    // 1. where is my scss file
    return gulp.src('./src/scss/style.scss')
    // 2. pass that file through sass compiler
    .pipe(sass())
    // 3. where do i save the compiled css?
    .pipe(gulp.dest('./dist'))
    // 4. strean changes to all browser
    .pipe(browserSync.stream());
}

function fonticon() {
    return gulp.src('./src/assets/svg/*.svg')
    .pipe(iconfont({
      fontName: 'iconfont',
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      appendCodepoints: true,
      appendUnicode: false,
      normalize: true,
      fontHeight: 1000,
      centerhorizontally: true
    }))
    .on('glyphs', function(glyphs, options) {
      gulp.src('src/iconfont-template/iconfont.scss')
      .pipe(consolidate('underscore', {
        glyphs: glyphs,
        fontName: options.fontName,
        fontDate: new Date().getTime()
      }))
      .pipe(gulp.dest('./src/scss/icon-font'));
    })
    .pipe(gulp.dest('dist/fonts'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir:'./'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.fonticon = fonticon;
exports.watch = watch;