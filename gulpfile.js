import gulp from "gulp";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import pug from "gulp-pug";
import browserSync from "browser-sync";
import terser from "gulp-terser";
import sourcemaps from "gulp-sourcemaps";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";

const bs = browserSync.create();

const sass = gulpSass(dartSass);

gulp.task("html", function () {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp
    .src(["src/assets/scss/**/index.scss", "src/assets/css/**/*.css"])
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(concat("index.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(bs.stream());
});

gulp.task("js", function () {
  return gulp
    .src("src/assets/js/*js")
    .pipe(concat("index.js"))
    .pipe(terser())
    .pipe(gulp.dest("./dist/assets/js/"));
});

gulp.task("img", function () {
  return gulp
    .src(
      [
        "src/assets/img/**/*.svg",
        "src/assets/img/**/*.jpg",
        "src/assets/img/**/*.png",
      ],
      { encoding: false }
    )
    .pipe(imagemin({ optipng: [0.1], mozjpeg: [0.7], svgo: [0.7] }))
    .pipe(gulp.dest("./dist/assets/img/"));
});

gulp.task("dev", function () {
  bs.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch(
    ["src/assets/scss/**/*.scss", "src/assets/css/**/*.css"],
    gulp.series("sass")
  );
  gulp.watch("src/assets/js/*.js", gulp.series("js")).on("change", bs.reload);
  gulp.watch("src/pug/**/*.pug", gulp.series("html")).on("change", bs.reload);
  gulp
    .watch(
      [
        "src/assets/img/**/*.svg",
        "src/assets/img/**/*.jpg",
        "src/assets/img/**/*.png",
      ],
      gulp.series("img")
    )
    .on("change", bs.reload);
});

// run all tasks
gulp.task("default", gulp.series("sass", "js", "html", "img", "dev"));
gulp.task("build", gulp.series("sass", "js", "html", "img"));
