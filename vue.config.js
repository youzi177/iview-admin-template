const path = require('path')
const os = require('os')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}
/**
 * 自动获取本机局域网 IPv4
 */
const getLocalIp = () => {
  const interfaces = os.networkInterfaces()

  // 优先常见的局域网网段
  const candidates = []

  Object.keys(interfaces).forEach((name) => {
    interfaces[name].forEach((item) => {
      // 只要 IPv4，并且不是 127.0.0.1
      if (item.family === 'IPv4' && !item.internal) {
        candidates.push(item.address)
      }
    })
  })

  // 优先选择常见局域网地址
  const localIp = candidates.find((ip) => {
    return (
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
    )
  })

  return localIp || candidates[0] || 'localhost'
}

const LOCAL_IP = getLocalIp()

console.log(`\n🚀 Local IP: ${LOCAL_IP}\n`)
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // proxy: 'localhost:3000'
    host: '0.0.0.0',
    port: 8080,
    // 自动设置 Network 地址
    public: `http://${LOCAL_IP}:8080`,
  },
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true,
      },
    },
  },
}
