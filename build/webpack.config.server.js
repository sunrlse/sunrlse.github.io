
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // 非js文件处理
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'

let plugins = [
  new MiniCssExtractPlugin({filename: 'styles.[contentHash:5].css'}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }),
  new VueServerPlugin()
]
// if (isDev) {
//   plugins.push(new VueServerPlugin())
// }

let config
config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins
})

module.exports = config
