const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: 'development',
  devtool: 'cheap-eval-inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../src/assets'), // 设置服务器启动目录
    host:'localhost',
    port:8080,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        }
      },
      changeOrigin: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig,devConfig)
