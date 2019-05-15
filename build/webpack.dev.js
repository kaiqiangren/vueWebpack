const path = require("path");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");
const devConfig = {
    //模式
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    //dev服务
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open:true,
        port:8000,
        hot:true,//
        hotOnly:true,//不自动刷新
        proxy:{
            '/api':'http://localhost:3000'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig,devConfig)