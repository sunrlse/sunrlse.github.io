const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const createVueLoaderOptions = require('./vue-loader.config');

const config = {
  target: 'web',
  entry: path.join(__dirname, '../app/public/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../app/dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'  // 先处理eslint 再 之后的 vue-loader处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8096,
              name: 'resources/[path][name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;