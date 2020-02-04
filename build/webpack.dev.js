const path = require("path");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");

const proxy = require("./proxy");

const devConfig = {
    //模式
    mode: "development",
    devtool: "cheap-eval-source-map",
    //出口
    output: {
        filename: "./js/[name].js",
        chunkFilename:"./js/[name].js",
    },
    //dev服务
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open:false, //是否自动打开浏览器
        port:8000,//端口号
        hot:true,//是否开启热重载
        hotOnly:true,
        historyApiFallback:true,//解决SPA路由问题,生产nginx需配置try_files index.html
        proxy:proxy
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig,devConfig)