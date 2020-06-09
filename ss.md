yeoman

安装: yarn add -g yo

安装: yarn add -g generator-node

运行: yo node 项目初始化

添加cli: yo node:cli

全局范围 yarn link

安装网页版generator: yarn add -g genertor-webapp

运行: yo webapp

generator基本结构:

|-generators/		生成器目录
|	app/			默认生成器目录
|		index.js	默认生成器实现
|	component/		其他生成器目录
|		index.js	其他生成器实现
|-package.json		模块包配置文件


创建:
	mkdir sample
	cd sample
初始化:
	yarn init
安装generator模块
	yarn add yeoman-generator
创建generator/app目录,并创建index.js文件作为入口


接收用户输入

plop
