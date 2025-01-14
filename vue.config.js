module.exports = {
    configureWebpack: {
        resolve: {
          alias: {
            'primevue': require('path').resolve(__dirname, 'node_modules/primevue'),
          },
        },
      },
    devServer: {
        proxy: {
          '/orders': {
            target: 'https://sellingpartnerapi-eu.amazon.com',
            changeOrigin: true,
            pathRewrite: {
              '^/orders': '/orders',  // Rewrite URL if necessary
            },
          },
        },
      },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
};
