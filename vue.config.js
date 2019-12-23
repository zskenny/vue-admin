module.exports = {
  devServer: {
    proxy: {
      '/admin/': {
        target: 'http://127.0.0.4/admin/', // API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/admin/': ''
        }
      }
    }
  }
}
