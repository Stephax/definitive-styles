const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const rename = require('gulp-rename');

sass.compiler = require("node-sass");

gulp.task("minify-html", () => {
    return gulp
        .src("../html/*.html")
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: false,
                removeComments: false,
                removeEmptyElements: false,
            })
        )
        .pipe(gulp.dest("../../dist"));
});

gulp.task("sass", function() {
    return gulp
        .src("../sass/**/*.scss")
        .pipe(sass({outputStyle: 'expanded'}).on("error", sass.logError))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest("../../dist/styles"));
});

gulp.task("sass-minify", function() {
    return gulp
        .src("../sass/**/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest("../../dist/styles"));
});

gulp.task("default", gulp.parallel("minify-html", "sass", "sass-minify"));

gulp.task("watch", function() {
    gulp.watch("../../src/**/*", gulp.series("default"));
    return;
});