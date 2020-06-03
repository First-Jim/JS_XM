
const gulp = require('gulp'); //引入gulp，生成一个gulp对象
const html = require('gulp-minify-html'); //引入html压缩插件  html函数方法
const css = require('gulp-clean-css'); //引入css压缩插件  css函数方法
const sass = require('gulp-sass'); //引入sass编译插件 

//sass
const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
const plugins = require('gulp-load-plugins')(); //生成.map文件 返回的是一个函数体。需要再次执行。
const script = require('gulp-uglify'); //压缩js的插件


// //es6转es5的三个模块
// //gulp-babel@7   babel-core       babel-preset-es2015
const babel = require('gulp-babel'); //主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');


const imagemin = require('gulp-imagemin'); //图片压缩
const watch = require('gulp-watch'); //gulp监听
//测试
gulp.task('hello', () => {
    console.log('hello,gulp');
});

gulp.task('copyfile', () => {
    return gulp.src('src/thirdplugins/*.js')
        .pipe(gulp.dest('dist/thirdplugins'));
});


