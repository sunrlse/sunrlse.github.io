const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }

  try {
    console.log('-------------------------try one----------------------')
    console.log(renderer)
    console.log('-------------------------try one----------------------')
    const appString = await renderer.renderToString(context)
    console.log('-------------------------server-render- appstring----------------------')
    console.log(appString)
    console.log('-------------------------server-render- appstring----------------------')
    const { title } = context.meta.inject()
    console.log('-------------------------server-render- title----------------------')
    console.log(title)
    console.log('-------------------------server-render- title----------------------')
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error: ', err)
    throw err
  }
}
