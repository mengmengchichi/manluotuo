var gulp = require('gulp');
var Css = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('default',function(){
	console.log('gulp');
});
gulp.task('say',function(){
	console.log('好热');
});
gulp.task('html',function(){
	gulp.src('app/**/*.html').pipe(gulp.dest('dist')).pipe(connect.reload());
})
gulp.task('css',function(){
	gulp.src('app/css/**/*.css').pipe(Css()).pipe(gulp.dest('dist/css')).pipe(connect.reload());
})
gulp.task('js',function(){
	gulp.src(['app/**/*.js','!app/libs/**/*']).pipe(babel({presets:['@babel/env']})).pipe(uglify()).pipe(gulp.dest('dist')).pipe(connect.reload());
})
gulp.task('server',function(){
	connect.server({
        livereload: true,
        port: 2333,
        root:'dist'
    });
});
gulp.task('libs',function(){
	gulp.src('app/libs/**/*').pipe(gulp.dest('dist/libs'))
})
gulp.task('img',function(){
	gulp.src('app/images/**/*').pipe(gulp.dest('dist/images'));
})
gulp.task('sass',function(){
	gulp.src('app/scss/*.scss').pipe(sass()).pipe(gulp.dest('dist/css')).pipe(connect.reload());
})
gulp.task('watch',function(){
    gulp.watch('app/scss/**/*.scss',['sass']);
    gulp.watch('app/**/*.html',['html']);
    gulp.watch('app/css/**/*.css',['css']);
    gulp.watch('app/**/*.js',['js']);
})

gulp.task("default", ["server",'css', "html", "js", "watch","img","sass","libs"]);
