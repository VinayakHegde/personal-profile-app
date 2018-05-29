var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var babel = require("gulp-babel");

gulp.task('default', ['connect', 'data', 'build', 'less', 'watch']);

gulp.task("build", function () {
  return gulp.src("app/javascript/profile.js")
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest("dist/js"));
})

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        port: 9100
    });
});

gulp.task('less', function () {
    gulp.src('app/less/*less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('reload', function () {
    gulp.src('dist/**/*')
        .pipe(connect.reload());
});

gulp.task('data', function () {
    gulp.src('app/data/*')
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['app/less/*less'], ['less']);
    gulp.watch(['app/javascript/*js'], ['build']);
    gulp.watch(['app/data/*'], ['data']);
    gulp.watch(['dist/**/*'], ['reload']);
});
