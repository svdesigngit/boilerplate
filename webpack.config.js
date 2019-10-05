const config = require('./tasks/config');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		app: config.scripts.input,
	},
	output: {
		filename: '[name].js',
		path    : config.scripts.output
	},
	devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
		]
	},
	devServer: {
		overlay: false
	}
}
