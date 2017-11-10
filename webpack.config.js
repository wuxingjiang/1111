const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
module.exports = (options = { dev: false }) => ({
    entry: {
        vendor: './src/vendor',
        index: './src/main.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            }, {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|png)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000000000
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src')
        }
    },
    devServer: {
        compress: true,
        port: 80,
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        },
        disableHostCheck: true
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
});