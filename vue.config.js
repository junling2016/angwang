module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.easy-mock.com/mock/5c853a87f1695d7bd69436d7',
        changeOrigin: true
      }
    }
  }
}
