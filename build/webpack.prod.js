const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");
const prodConfig = {
    //模式
    mode: "production",
    devtool: "cheap-eval-source-map"
}

module.exports = merge(commonConfig,prodConfig);