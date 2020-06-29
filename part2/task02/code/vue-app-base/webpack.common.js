const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',	//工作模式(development为开发模式)
	entry: path.join(__dirname, 'src/main.js'),	//入口文件
	output: {
		filename: 'bundle.js',	//输出文件名
		path: path.join(__dirname, 'dist')	//输出文件路径
	},
	devServer: {
	    contentBase: path.join(__dirname, "dist"),
	    compress: true,
	    port: 3000,
	    hot: true,
	    inline: true,
	    historyApiFallback: true,
	    quiet: true,
	    overlay: true
  	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
		        test: /\.js$/,
		        loader: 'eslint-loader',
		        exclude: /node_modules/,
		        enforce: 'pre'
      		},
      		{
		        test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/
      		},
			{
				test: /\.css$/,
				loader: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				loader: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10 * 1024,	//大小,10kb
						esModule: false
					}
				}
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: 'test-vue-title',
			template: './public/index.html',
			filename: 'index.html',
    	}),
    	new webpack.DefinePlugin({
			BASE_URL: JSON.stringify('/'),
		})
	]
}