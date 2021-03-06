const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  
  app.use(
    '/login/oauth/access_token',
    createProxyMiddleware({
      target: 'https://github.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/user/repos',
    createProxyMiddleware({
      target: 'https://api.github.com',
      changeOrigin: true,
    })
  );

};
