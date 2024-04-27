const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { DefinePlugin } = require('webpack')

require('dotenv').config()

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

const plugins = [
    new DefinePlugin({
        'process.env': JSON.stringify(process.env)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
            collapseWhitespace: !isDev,
            removeComments: !isDev
        }
    }),
    new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contentbash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[contentbash].css'
    })
]

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode,
    entry: './index.js',
    output: {
        filename: isDev ? '[name].js' : '[name].[contentbash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'public/[name].[contethash][ext][query]'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    devtool: isDev ? 'source-map': false,
    devServer: {
        port: 7777,
        hot: true,
        static: {
            directory: path.join(__dirname, 'public')
        },
        historyApiFallback: true
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins,
    module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]_[hash:base64:7]',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /^((?!\.module).)*s[ac]ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
}