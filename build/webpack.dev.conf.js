var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge') // 合并配置文件
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf') // 开发和运行时贡献的配置文件
var HtmlWebpackPlugin = require('html-webpack-plugin') // webpack提供的操作html插件

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
}) // 热加载技术 失败会自动刷新浏览器

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },// 对独立的css进行编译
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env // 把源码种的process.env 替换成 config.dev.evn
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(), // webpack 优化插件
    new webpack.HotModuleReplacementPlugin(), // 热加载
    new webpack.NoErrorsPlugin(), // 编译错误跳过编译代码 。会发生错误
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 编译后生成文件名
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
