var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require("vinyl-source-stream"),
    less = require('gulp-less'),
    path = require('path'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    babelify = require('babelify'),
    del = require('del'),
    runSequence = require('run-sequence'),
    streamqueue = require('streamqueue');

// gulp.task('cleanJS', function() {
//     return del('./public/javascripts/*');
// });

// gulp.task('cleanCSS', function() {
//     return del('./public/stylesheets/*');
// });

// Transform every jsx component into js using reactify and bundle them together with browserify
gulp.task('browserify', function() {
    var b = browserify();
    b.add('./public/javascripts/main.js');
    b.transform("babelify", {
        presets: ["es2015"]
    })
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/javascripts'));
});

// gulp.task('less', function() {
//     return gulp.src(["./lib/client/stylesheets/**/*"])
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         }))
//         .pipe(concatCss("bundle.css"))
//         .pipe(gulp.dest('./public/stylesheets'));
// });

// gulp.task('uglify', function() {
//     return gulp.src('./public/javascripts/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./public/javascripts'));
// });

// gulp.task('minifycss', function() {
//     return gulp.src('./public/stylesheets/*.css')
//         .pipe(minify({
//             compatibility: 'ie8'
//         }))
//         .pipe(gulp.dest('./public/stylesheets'));
// });

gulp.task('default', function() {
    runSequence('browserify');
});


// Watchers
// On linux, if you get an ENOSPC error, run this:
// echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
// gulp.task('watch', function() {
//     console.log("Initial cleaning and default task...");
//     runSequence('cleanJS', 'cleanCSS', 'less', 'browserify', function() {
//         console.log("Watching stylesheets and javascripts...")
//     });
//     gulp.watch("./lib/client/stylesheets/**/*", ['cleanAndLess']);
//     gulp.watch('./lib/client/javascripts/**/*', ['cleanAndBrowserify']);
// });
