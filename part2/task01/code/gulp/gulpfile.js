const { src, dest, parallel, series, watch } = require("gulp");	//引入gulp

const del = require('del');

const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();

const browserSync = require('browser-sync');  
const bs = browserSync.create();

/*
const sass = require("gulp-sass");	//引入sass
const babel = require('gulp-babel');	//引入babel
const swig = require('gulp-swig');		//引入gulp-swig
const imagemin = require('gulp-imagemin');  //引入gulp-imagemin
*/

//模板编译需要的data
const data = {
    menus: [
		{
			name: 'Home',
			icon: 'aperture',
			link: 'index.html'
		},
		{
			name: 'Features',
			link: 'features.html'
		},
		{
			name: 'About',
			link: 'about.html'
		},
		{
			name: 'Contact',
			link: '#',
			children: [
				{
					name: 'Twitter',
					link: 'https://twitter.com/'
				},
				{
					name: 'About',
					link: 'https://weibo.com/'
				},
				{
					name: 'divider'
				},
				{
					name: 'About',
					link: 'https://github.com/ice-matcha'
				}
			]
		}
    ],
    pkg: require('./package.json'),
    date: new Date()
}

//文件清理
const clean = () => {
	return del(['dist', 'temp']);
}

//样式编译(这里已sass为例)
const style = () => {
	return src('src/assets/styles/*.scss', { base: 'src' })
		.pipe(plugins.sass({ outputStyle: 'expanded' }))	//outputStyle 将 .sass 改为 .css
    	.pipe(dest('temp'))	//将文件放在临时文件
    	.pipe(bs.reload({stream: true}))	//修改后重启开发服务器
}

//脚本编译
const script = () => {
	return src("src/assets/scripts/*.js", { base: 'src' })
		.pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    	.pipe(dest('temp'))
    	.pipe(bs.reload({stream: true}))
}

//模板编译
const templet = () => {
  	return src('src/*.html', { base: 'src' })
	    .pipe(plugins.swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
	    .pipe(dest('temp'))
	    .pipe(bs.reload({ stream: true }))
}

//图片转换
const image = () => {
	return src('src/assets/images/**', {base: 'src'})
	    .pipe(plugins.imagemin())
	    .pipe(dest('dist'))
}

//文字转换
const font = () => {
	return src('src/assets/fonts/**', {base: 'src'})
	    .pipe(plugins.imagemin())
	    .pipe(dest('dist'))
}

const extra = () => {
	return src('public/**', {base: 'public'})
		.pipe(dest('dist'))
}

//开发运行服务器
const runserver = () => {
	watch('src/assets/styles/*.scss', style);	//监听css
    watch('src/assets/scripts/*.js', script);	//监听js
    watch('src/*.html', templet);				//监听模板

    watch([
		'src/assets/images/**',
		'src/assets/fonts/**',
		'public/**'
    ], bs.reload);	//监听资源

	bs.init({
		notify: false,
		port: 3000,	//启动端口
		open: false,	//是否自动打开浏览器
		server: {
			baseDir: ['temp', 'src', 'public'], // 按顺序查找
			routes: {
				'/node_modules': 'node_modules'
			}
		}
    });
}

//useref文件引用
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
	    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
	    .pipe(plugins.if(/\.js$/, plugins.uglify()))
	    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
	    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true
    	})))
    	.pipe(dest('dist'))
}

//组合
const compile = parallel(style, script, templet);

//build生产
const build = series(
	clean,
	parallel(
		series(compile, useref),
		image,
		font,
		extra
    )
);

//dev开发
const dev = series(compile, runserver)

module.exports = {
	clean,
	build,
	dev
}