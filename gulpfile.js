import gulp from "gulp";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import pug from "gulp-pug";
import browserSync from "browser-sync";
import terser from "gulp-terser";
import sourcemaps from "gulp-sourcemaps";
import imagemin from "gulp-imagemin";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import plumberNotifier from "gulp-plumber-notifier";
import zip from "gulp-zip";

const bs = browserSync.create();

const sass = gulpSass(dartSass);

const locales = {
  ar: {
    lang: "ar",
    langDir: "rtl",
    baseUrl: "../dist/ar",
    dest: "./dist/ar",
  },
  en: {
    lang: "en",
    langDir: "ltr",
    baseUrl: "/",
    dest: "./dist/en",
  },
};

// gulp.task("html", function html(locale) {
//   return gulp
//     .src("src/pug/pages/**/*.pug")
//     .pipe(plumber())
//     .pipe(plumberNotifier())
//     .pipe(
//       pug({
//         pretty: true,
//         data: {
//           lang: locale.lang,
//           langDir: locale.langDir,
//           baseUrl: locale.baseUrl,
//         },
//       })
//     )
//     .pipe(gulp.dest(locale.dest));
// });

function html(locale) {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(plumber())
    .pipe(plumberNotifier())
    .pipe(
      pug({
        pretty: true,
        data: {
          lang: locale.lang,
          langDir: locale.langDir,
          baseUrl: locale.baseUrl,
        },
      })
    )
    .pipe(gulp.dest(locale.dest));
}

gulp.task("generateLocalizedViews", function (done) {
  html(locales.en);
  html(locales.ar);
  done();
});
gulp.task("generateDefaultView", function (done) {
  html({ ...locales.en, dest: "./dist/" });
  done();
});

gulp.task("sass", function () {
  return gulp
    .src(["src/assets/scss/**/index.scss", "src/assets/css/**/index.css"])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Gulp Sass Error",
          message: "Error: <%= error.message %>",
        }),
      })
    )
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
    .src("src/assets/js/*.js")
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

gulp.task("copyFonts", function () {
  return gulp
    .src("src/assets/fonts/*.ttf", { encoding: false })
    .pipe(gulp.dest("dist/assets/fonts/"))
    .pipe(bs.stream());
});

gulp.task("dev", function () {
  bs.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp
    .watch(
      ["src/assets/scss/**/*.scss", "src/assets/css/**/*.css"],
      gulp.series("sass")
    )
    .on("change", bs.reload);
  gulp.watch("src/assets/js/*.js", gulp.series("js")).on("change", bs.reload);
  gulp
    .watch("src/pug/**/*.pug", gulp.series("generateLocalizedViews"))
    .on("change", bs.reload);
  gulp
    .watch("src/pug/**/*.pug", gulp.series("generateDefaultView"))
    .on("change", bs.reload);
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

gulp.task("archive", function () {
  return gulp.src("dist/**/*.*").pipe(zip("dist.zip")).pipe(gulp.dest("."));
});

// run all tasks
gulp.task(
  "default",
  gulp.series(
    "sass",
    "js",
    "generateDefaultView",
    "generateLocalizedViews",
    "img",
    "copyFonts",
    "dev"
  )
);
gulp.task(
  "build",
  gulp.series(
    "sass",
    "js",
    "generateDefaultView",
    "generateLocalizedViews",
    "img",
    "copyFonts"
  )
);
