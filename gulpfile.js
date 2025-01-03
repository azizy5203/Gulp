import gulp from "gulp";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

gulp.task("scss", function () {
  return gulp
    .src("src/assets/scss/index.scss")
    .pipe(sass.sync({ style: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(concat("index.css"))
    .pipe(gulp.dest("dist"));
});

gulp.task("js", function () {
  return gulp
    .src("src/assets/js/*js")
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist"));
});

// run all tasks
gulp.task("default", gulp.series("scss", "js"));
