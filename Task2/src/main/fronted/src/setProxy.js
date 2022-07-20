// 경로 : src/main/frontend/src/setProxy.js
// CORS 관련 오류 방지를 위한 Proxy 설정

// 프론트에서 '/api' 로 요청을 보내면 백엔드인 8080포트(=target)으로 요청이 도착하게 된다
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};