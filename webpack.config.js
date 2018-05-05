
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'app/public/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'app/dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8096,
                            name: '[name]_001.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //webpack编译过程中以及页面上自己写的js代码上判断 环境 均可 用 process.env来判断
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new htmlWebpackPlugin()
    ]
}

if (isDev) {
    //浏览器调试，映射代码片段，定位错误
    config.devtool = '#cheap-module-eval-source-map';
    //webpack2 才有的devServer
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',  // 可以通过localhost 127.0.0.1 或 本机内网ip 访问(其他电脑或手机调试等)
        overlay: {      //webpack编译错误
            errors: true
        },
        hot: true,
        open : true,
        // spa 前端路由， 没有做映射的地址，映射到入口index.html上
        // historyFallback: {

        // }
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}

module.exports = config;