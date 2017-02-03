var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');

gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: ".",
		notify: false
	});

	gulp.watch("sass/**/*.+(sass|scss)", ['sass']);
	gulp.watch("*.html").on('change', browserSync.reload);
	gulp.watch("js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
	return gulp.src("sass/**/*.+(sass|scss)")
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("css/"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
