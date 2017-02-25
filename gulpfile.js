var gulp            = require('gulp'),    
    fs              = require('fs'),    
    watch           = require('gulp-watch');


gulp.task('make-src', function () {
    return fs.mkdir('src', function (err) {
        if (err) {
            console.log('Failed: ' + err);
        }
    });
});

gulp.task('watch', function () {
    return gulp.watch('./src/**/**', [
        'make-src-folder'        
    ]);
});

gulp.task('build', [
    'make-src'    
]);

gulp.task('default', [
    'build',
    'watch'
]);