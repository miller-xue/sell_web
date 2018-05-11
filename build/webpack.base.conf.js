var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../') //当前项目根目录
/* webPack 基本配置*/
module.exports = {
  entry: { //入口配置
    app: './src/main.js' // webpcak入口编译文件
  },
  output: { // webpack 输出目录
    path: config.build.assetsRoot, // 打包输出的目录
    // 请求静态资源绝对路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'], // 引入文件时,自动补全文件后缀
    fallback: [path.join(__dirname, '../node_modules')], // require模块找不到的时候会指向node_modules
    alias: { // 别名 根据别名缩短路径字符串长度
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      // 'assets': path.resolve(__dirname, '../src/assets'), 没有这个目录了
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')] // 和resolve里的 fallback意思一样
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ], // 会先对 .js .vue 用eslint进行处理
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, // 对 vue文件用 vueLoader 进行处理
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot, // 只检查当前目录瞎的
        exclude: /node_modules/  // 排除这些目录
      }, // 对js用 babelLoader进行处理
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000, // 当图片文件大小10k会生成文件名
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 生成在 /static/img...文件目录下
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter') // eslint 检查到错误，会提示错误信息
  },
  vue: {
    loaders: utils.cssLoaders() // vue文件种css处理的loaders
  }
}
