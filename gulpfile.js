/* 压缩文件 */
const gulp = require('gulp');
const html = require('gulp-minify-html');
gulp.task('hehe',function(){
   return gulp.src('src/*.html')
    .pipe(html()) //压缩
     .pipe(gulp.dest('dist/')); //输出
})