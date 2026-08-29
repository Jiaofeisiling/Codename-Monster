const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const proxyConfig = {
    target: 'http://localhost:8080',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      const fullUrl = `${proxyConfig.target}${proxyReq.path}`;
      console.log(`Proxying request to: ${fullUrl}`);
    }
  };

  const routes = [
    '/transactions',
    '/users',
    '/me',
    '/roles',
    '/uploads',
    '/categories',
    '/tags',
    '/permissions',
    '/images',
    '/home'
  ];

  routes.forEach(route => {
    app.use(route, createProxyMiddleware(proxyConfig));
  });
};
