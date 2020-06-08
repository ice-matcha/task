const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks")

const data = {
    menus: [{
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
    }, {
        name: 'Features',
        link: 'features.html'
    }, {
        name: 'About',
        link: "about.html"
    }, {
        name: 'Contact',
        link: "#",
        children: [{
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
        }, {
            name: 'About',
            link: 'https://weibo.com/zceme'
        }]
    }],
    date: new Date(),
}

module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            temp: "dist/**", //把temp文件夹下所有的文件都给删除
        },
        // 任务 sass
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            // 目标
            main: {
                files: {
                    'dist/assets/styles/main.css': 'src/assets/styles/main.scss', // 目录文件:源文件
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ["@babel/preset-env"]
            },
            main: {
                files: {
                    'dist/assets/scripts/main.js': "src/assets/scripts/main.js",
                }
            }
        },
        swigtemplates: {
            options: {
                templatesDir: 'src/',
                defaultContext: {
                    pkg: "<%= pkg%>",
                    menus: data.menus,
                    date: data.date
                }
            },
            production: {
                dest: 'dist',
                src: ['src/*.html']
            }
        },
        copy: {
            main: {
                files: [
                    //包括路径中的文件
                    //{expand: true, src: ['public/*'], dest: 'dist/', filter: 'isFile'},
                    {
                        expand: true,
                        flatten: true,
                        src: ['public/**'],
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                    //使得SRC相对于CWD所有
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['assets/fonts/**'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['assets/images/**'],
                        dest: 'dist/'
                    },
                ]
            },
        },
        concat: {
            options: {
                separator: ';'
            },
            css: {
                src: ["./node_modules/bootstrap/dist/css/bootstrap.css"],
                dest: "temp/styles/vendor.css"
            },
            js: {
                src: ["./node_modules/jquery/dist/jquery.js", "./node_modules/popper.js/dist/umd/popper.js", "./node_modules/bootstrap/dist/js/bootstrap.js"],
                dest: "temp/scripts/vendor.js"
            }
        },
        uglify: {
            js: {
                src: '<%= concat.js.dest%>',
                dest: 'dist/assets/scripts/vendor.js'
            },
        },
        cssmin: {
            css: {
                src: '<%= concat.css.dest%>',
                dest: 'dist/assets/styles/vendor.css'
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: ["assets/images/*.{jpg,png,gif}"],
                    dest: "dist/"
                }]
            }
        },
        useref: {
            html: "dist/*.html",
            temp: ["dist"]
        },
        htmlmin: { //压缩html
            payment: {
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: 'dist', // Src matches are relative to this path.
                    src: ['*.html'], // Actual pattern(s) to match.
                    dest: 'dist/', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    loadGruntTasks(grunt);
    grunt.registerTask("default", ["clean", "sass", "babel", "swigtemplates", "copy", "concat", "imagemin", "uglify", "cssmin", "useref", "htmlmin"]);
}