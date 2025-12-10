const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Пути
const paths = {
  html: {
    src: 'skinCare.html',
    dest: 'dist/'
  },
  scripts: {
    src: 'script.js',
    dest: 'dist/'
  },
  styles: {
    src: 'css//*.css',
    dest: 'dist/css/'
  },
  images: {
    src: 'images//*.*',
    dest: 'dist/images/'
  },
  icons: {
    src: 'icons//*.*',
    dest: 'dist/icons/'
  },
  fonts: {
    src: 'fonts//*.*',
    dest: 'dist/fonts/'
  }
};

function clean() {
  return del(['dist']);
}

function html() {
  return src(paths.html.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        keepClosingSlash: true,
        minifyJS: false,
        minifyCSS: false,
        decodeEntities: false,
        minifyURLs: false,
        removeEmptyAttributes: false,
        removeRedundantAttributes: false
      })
    )
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(terser())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(
      cleanCSS({
        level: 2,
        rebase: false 
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}


function images() {
  return src(paths.images.src, { encoding: false })
    .pipe(imagemin({ verbose: true }))
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}


function icons() {
  return src(paths.icons.src)
    .pipe(dest(paths.icons.dest))
    .pipe(browserSync.stream());
}


function fonts() {
  return src(paths.fonts.src)
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}


function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    open: true,
    notify: false
  });

  watch(paths.html.src, html);
  watch(paths.scripts.src, scripts);
  watch(paths.styles.src, styles);
  watch(paths.images.src, images);
  watch(paths.icons.src, icons);
  watch(paths.fonts.src, fonts);
}


const build = series(
  clean,
  parallel(html, scripts, styles, images, icons, fonts)
);

exports.clean = clean;
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.icons = icons;
exports.fonts = fonts;
exports.build = build;
exports.serve = series(build, serve);
exports.default = exports.serve;