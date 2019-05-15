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
        port:8000,//端口号
        hot:true,//是否开启热重载
        hotOnly:true,
        historyApiFallback:true,//解决SPA路由问题,生产nginx需配置try_files index.html
        proxy:{
            '/api':'http://localhost:3000'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig,devConfig)