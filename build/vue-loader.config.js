module.exports = (isDev) => {
  return {
    // 阻止 .vue文件 元素间生成空白内容
    preserveWhitespace: true,
    // 
    extractCSS: !isDev,
    // cssModules: {
    //   localIdentName: '[path]-[name]-[hash:base64:5]',
    //   camelCase: true
    // },
    // hotReload: false   //根据环境变量生成 .false 时，更新vue文件元素刷新页面，改改vue style 不刷新页面， 注释后，都是不刷新页面
  }
};