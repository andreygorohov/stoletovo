const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        tunnel: true
    });
}

function clean() {
    return del(['dist/*']);
}

function fonts() {
    src('app/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('dist/fonts/'));
    return src('app/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts/'));
}


function svgSprites() {
    return src('app/img/icons/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(dest('dist/img'));
}



function scripts() {
    return src('app/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(fileinclude())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(cleancss(({ level: { 1: { specialComments: 0 } }, format: 'expanded' })))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

function htmlInclude() {
    return src(['app/**.html', '!app/_*.html'])
        .pipe(fileinclude())
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function images() {
    return src('app/img/**/*')
        .pipe(newer('dist/img/'))
        .pipe(imagemin())
        .pipe(dest('dist/img/'));
}
function resources() {
    return src('app/resources/**/*')
        .pipe(dest('dist/resources/'));
}

watch('app/**/*.scss', styles);
watch('app/js/**/*.js', scripts);//.on('change', browserSync.reload);//, '!app/**/*.min.js'
watch('app/**/*.html', htmlInclude).on('change', browserSync.reload);
watch('app/img/**/*', images);
watch('app/img/icons/*.svg', svgSprites);
watch('app/img/**.svg', svgSprites);

// exports.browsersync = browsersync;
// exports.scripts = scripts;
// exports.styles = styles;
// exports.Include = htmlInclude;
// exports.images = images;
exports.fonts = fonts;
// exports.clean = clean;
exports.resources = resources;

// дефолтный таск

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, styles, images, svgSprites, resources), browsersync);


//build

function scriptsBuild() {
    return src('app/js/main.js')
        .pipe(fileinclude())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        // .pipe(uglify())
        .pipe(dest('dist/js'));
}

function stylesBuild() {
    return src('app/scss/style.scss')
        .pipe(scss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(cleancss(({ level: { 1: { specialComments: 0 } }, format: 'beautify' })))
        .pipe(dest('dist/css/'));
}


exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, images, svgSprites, resources), stylesBuild);

