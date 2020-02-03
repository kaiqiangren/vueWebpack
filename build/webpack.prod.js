const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");
const prodConfig = {
    //模式
    mode: "production",
    //出口
    output: {
        filename: "./js/[name][contenthash].js", //contenthash为了解决生产环境浏览器缓存问题
        chunkFilename:"./js/[name][contenthash].js"
    },
    devtool: "eval-source-map"
}

module.exports = merge(commonConfig,prodConfig);