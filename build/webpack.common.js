const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve(dir) {
    return path.resolve(__dirname, "..", dir)
}

module.exports = {
    //入口
    entry: {
        main: "./src/main.js"
    },
    //出口
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist")
    },
    resolve: {
        // 自动补全的扩展名
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('src') //提供@的路径索引
        }
    },
    optimization: {
        usedExports: true,
        // runtimeChunk: {
        //     name: 'runtime'//解决老版本webpack4的缓存问题
        // },
        splitChunks: {
            chunks: 'all',
            //缓存node_modules中的代码
            cacheGroups:{
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name:"vendors"
                }
            }
        }
    },
    //模块
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime',"dynamic-import-webpack"]
                    }
                }
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader', // creates style nodes from JS strings
                    // },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 2}
                    },
                    {
                        loader: 'postcss-loader', // compiles postcss
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,//以jpg结尾的文件
                use: {
                    loader: "url-loader", //使用file-loader/url-loader进行打包
                    options: {
                        name: '[name]_[hash].[ext]',//设置打包后的文件名以及后缀，[name]是打包前的名字
                        outputPath: 'img/',
                        // limit: 30000,//如果文件大小超过限制字节，则打包，否则打包为base64格式
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,//以jpg结尾的文件
                use: {
                    loader: "file-loader", //使用file-loader打包字体图标文件
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin(),
    ]

}