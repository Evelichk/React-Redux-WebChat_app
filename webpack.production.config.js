 const merge = require('./node_modules/webpack-merge');
 const common = require('./webpack.common');
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

 module.exports = merge(common, {
   mode: 'production',
   optimization: {
   minimizer: [new UglifyJsPlugin()]
  }
 });