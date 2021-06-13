const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	output: {
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false,
					minimize: false,
				},
			},
			{
				test: /\.css$/i,
				exclude: /styles.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /styles.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
       			use: [
          		{
            		loader: 'file-loader',
          		},
          		],
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: 'Testing Webpack',
			template: './src/index.html',
			//filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css',
		}),
		new CopyPlugin({
        	patterns: [
        		{ from: "src/images/", to: "images/" },
        		// { from: "other", to: "public" },
      		],
    	}),
	]
}