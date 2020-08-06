/* 压缩文件 */
const gulp = require('gulp');/* 导入 */
const html = require('gulp-minify-html');
/* 压缩html */
gulp.task('uglifyhtml',function(){/* 新建gulp任务 */
   return gulp.src('src/*.html') /* 设置引入文件路径 */
    .pipe(html()) //压缩
     .pipe(gulp.dest('dist/')); //输出至哪个文件夹
})
/* sass */
//sass
// const sass = require('gulp-sass'); //引入sass编译插件 
// const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
// const plugins = require('gulp-load-plugins')(); //生成.map文件 返回的是一个函数体。需要再次执行。
// gulp.task('compilesass', () => {
//    return gulp.src('src/sass/*.scss')
//        .pipe(plugins.sourcemaps.init()) //初始化gulp-sourcemaps插件
//        .pipe(plugins.sass({
//            outputStyle: 'compressed' //压缩
//        }))
//        .pipe(plugins.sourcemaps.write('.')) //通过sourcemaps,生成.map文件
//        .pipe(gulp.dest('dist/css/'));
// });
// //监听
// const watch = require('gulp-watch');
// js
const script = require('gulp-uglify'); //压缩js的插件
//6.压缩js
gulp.task('uglifyjs', () => {
   return gulp.src('src/js/details*.js') //输入
       .pipe(babel({ //先将es6转换成es5
           presets: ['es2015'] //es2015->es6  es2016->es7...
       }))
       .pipe(script()) //压缩
       .pipe(gulp.dest('dist/js/details/')); //输出
});
/* css */
const css = require('gulp-clean-css'); //压缩css
gulp.task('uglifycss', () => {
   return gulp.src('src/css/*.css') //输入
       .pipe(css()) //压缩
       .pipe(gulp.dest('dist/css')); //输出
});

// //监听

gulp.task('default', () => { //default默认的任务名。
   watch(['src/sass/*.scss'], gulp.parallel('compilesass'));
});