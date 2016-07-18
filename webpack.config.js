var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackDevServer = require("webpack-dev-server");

// 路径配置
var _ = {
		src: './src',
		js: './src/js',
		css: './src/css',
		sass: './src/sass',
		img: './src/img',
		output: './src/output/',
		dist: './src/dist'
	};

module.exports = {
	// 入口文件
	entry: {
		'index': _.js +'/entry.js'
	},
	output: {
		// 打包地址
		path: _.dist + '/js',
		// 网站运行时的访问地址 (用于资源cdn请求)
		publicPath: 'http://localhost:8080/dist/js',
		// 打包后文件名
		filename: "[name].bundle.js"
	},
	module: {
		// 加载器配置
		loaders: [
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.scss$/, loader: 'style!css!autoprefixer!sass?sourceMap' },
			{ test: /\.(jpeg|png|gif|svg)$/i, loader: 'url-loader?limit=8192' },
			{ test: /\.tsx?$/, loader: "ts-loader" }
		],
		preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
	},
	resolve: {
        //查找module的话从这里开始查找
        root: _.src, //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {}
    },
    externals: {
    	// 其他的类库
    	"jquery": "jQuery"
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings:false
			}
		})
	],
	devServer:{
        contentBase:'./src'
    }
};