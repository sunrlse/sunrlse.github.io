
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');// 非js文件处理
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';
const defaultPlugins = [
  //webpack编译过程中以及页面上自己写的js代码上判断 环境 均可 用 process.env来判断
  new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new htmlWebpackPlugin()
];
const devServer = {
  port: '8000',
  host: '0.0.0.0',  // 可以通过localhost 127.0.0.1 或 本机内网ip 访问(其他电脑或手机调试等)
  overlay: {      //webpack编译错误
    errors: true
  },
  hot: true,
  open : false,
  // spa 前端路由， 没有做映射的地址，映射到入口index.html上
  // historyFallback: {

  // }
};
let config;

if (isDev) {
  config = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
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
    //浏览器调试，映射代码片段，定位错误
    devtool: '#cheap-module-eval-source-map',
    //webpack2 才有的devServer
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../app/public/index.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                },
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      // extract css文件单独打包到css文件，但是.vue文件中的style并未出来
      new ExtractTextWebpackPlugin('styles.[contentHash:8].css'),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // })
    ])
  })
}

module.exports = config;
