const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, "client", "App.js"),
	output: {
		path: path.resolve(__dirname, "client", "dist"),
	},
	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ]
					}
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "client", "public", "index.html"),
		}),
	],
};