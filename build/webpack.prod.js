const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const prodConfig = {
  // mode:'production',
  mode:'development',
  devtool: 'inline-source-map'
}


module.exports = merge(commonConfig,prodConfig);
