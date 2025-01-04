import gulp from "gulp";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import pug from "gulp-pug";
import browserSync from "browser-sync";

const bs = browserSync.create();

const sass = gulpSass(dartSass);

gulp.task("html", function () {
  return gulp
    .src("src/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp
    .src(["src/assets/scss/index.scss", "src/assets/css/*.css"])
    .pipe(sass.sync({ style: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(concat("index.css"))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());
});

gulp.task("js", function () {
  return gulp
    .src("src/assets/js/*js")
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("dev", function () {
  bs.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch(
    ["src/assets/scss/*.scss", "src/assets/css/*.css"],
    gulp.series("sass")
  );
  gulp.watch("src/assets/js/*.js", gulp.series("js"));
  gulp.watch("src/*.pug", gulp.series("html")).on("change", bs.reload);
});

// run all tasks
gulp.task("default", gulp.series("sass", "js", "html", "dev"));
gulp.task("build", gulp.series("sass", "js", "html"));
