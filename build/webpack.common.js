const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
    return path.resolve(__dirname, "..", dir)
}

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist")
    },
    resolve: {
        extensions: ['.js', '.vue','.ts'],
        alias: {
            '@': resolve('src') //提供@的路径索引
        }
    },
    // optimization: {
    //     usedExports: true,
    //     splitChunks: {
    //         chunks: 'all',
    //         cacheGroups:{
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10,
    //                 name:"vendors"
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime',"dynamic-import-webpack"]
                    }
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.css$/,
                use:[
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 2}
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: '[name]_[hash].[ext]',//设置打包后的文件名以及后缀，[name]是打包前的名字
                        outputPath: 'img/',
                        limit: 30000,//如果文件大小超过限制字节，则打包，否则打包为base64格式
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: "file-loader",
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin(),
    ]

}