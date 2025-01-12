module.exports = {
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
    ? '/SellingPartener/'
    : '/'
};
