const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

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

module.exports = grunt => {
	grunt.initConfig({

		//清除文件
		clean: ['dist'],

		//编译sass
		sass: {
			options: {
				sourceMap: true,
				implementation: sass
			},
			main: {
				files: {
				  'dist/css/main.css': 'src/assets/styles/main.scss'
				}
			}
		},

		//编译JavaScript
		babel: {
			options: {
				sourceMap: true,
				presets: ['@babel/preset-env']
			},
			main: {
				files: {
				  'dist/js/main.js': 'src/assets/scripts/main.js'
				}
			}
		},

		//编译模板
		swigtemplates: {
			options: {
				defaultContext: {
					// pageTitle: 'My Title'
					menus: data.menus,
                    date: data.date
				},
				templatesDir: 'src'
			},
			production: {
				dest: 'dist',
				src: ['src/*.html']
			}
			// staging: {
			// 	context: {
			// 		pageTitle: 'My Title (staging)'
			// 	},
			// 	dest: 'build/staging/',
			// 	src: ['src/swig/**/*.swig']
			// }
		},

		//压缩javascript
		uglify: {
			my_target: {
				files: {
					'dist/js/main.min.js': ['dist/js/main.js']
				}
			}
		},

		//压缩css文件
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'dist/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css/',
					ext: '.min.css'
				}]
			}
		},

		//压缩html文件
		htmlmin: {
            payment: {
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html'],
                    dest: 'dist/',
                    ext: '.html'
                }]
            }
        },

        //复制字体
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ['assets/fonts/**'],
                dest: 'dist/assets/fonts',
                flatten: true,
    			filter: 'isFile',
            }
        },

        imagemin: {
        	static: {
	            files: [{
	                expand: true,
	                cwd: 'src/assets/images/',
	                src: ['*.{png,jpg,gif}'],
	                dest: 'dist/assets/images'
	            }]
	        }
        },

        svgmin: {
        	dist: {
        		files: [{
	                expand: true,
	                cwd: 'src/assets/images/',
	                src: ['*.svg'],
	                dest: 'dist/assets/images'
	            }]
        	}
        }

		/*
		//监听
		watch: {
			js: {
				files: ['src/assets/scripts/*.js'],
				tasks: ['babel']
			},
			css: {
				files: ['src/assets/styles/*.scss'],
				tasks: ['sass']
			}
		}
		*/
	})

	loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

	grunt.registerTask('default', [
		'sass',
		'babel',
		'clean',
		'uglify',
		'cssmin',
		'swigtemplates',
		'htmlmin',
		'imagemin',
		'svgmin',
		'copy'
	])
}