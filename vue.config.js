module.exports = {
  publicPath: '/swagger-replace-tools/',
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: '0.0.0.0',
    port: '8080',
    https: false,
    hotOnly: false,
    proxy: {
      '/swagger': {
        target: 'https://xietiansheng.cn',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
