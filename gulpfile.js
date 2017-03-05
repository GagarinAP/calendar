var gulp            = require('gulp'),    
    fs              = require('fs'),
    less            = require('gulp-less'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    cleanCSS        = require('gulp-clean-css'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    concatCss       = require('gulp-concat-css'),
    watch           = require('gulp-watch');
    
gulp.task('vendor-js', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/lodash/dist/lodash.min.js',        
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-resource/angular-resource.min.js',
        './bower_components/angular-ui-bootstrap/dist/ui-bootstrap-2.5.0.min.js',
        './bower_components/angular-ui-bootstrap/dist/ui-bootstrap-tpls-2.5.0.min.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});


gulp.task('vendor-css', function () {
    return gulp.src([        
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        './bower_components/angular-ui-bootstrap/dist/ui-bootstrap-2.5.0-csp.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concatCss('vendor.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('compile-html', function () {
    return gulp.src(['./front/html/**/**'])
        .pipe(gulp.dest('./public'));
});

gulp.task('compile-json', function () {
    return gulp.src(['./front/json/*.json'])
        .pipe(concat('todo.json'))
        .pipe(gulp.dest('./public/json'));
});

gulp.task('compile-fonts', function () {
    return gulp.src(['./bower_components/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('compile-js', function () {
    return gulp.src([
        './front/js/*.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest("./public/js"))
});

gulp.task('watch', function () {
    return gulp.watch('./front/**/**', [
        'compile-js',        
        'compile-html'        
    ]);
});

gulp.task('build', [    
    'compile-js',
    'vendor-js',
    'vendor-css',
    'compile-html',
    'compile-fonts',
    'compile-json'    
]);

gulp.task('default', [
    'build',
    'watch'
]);