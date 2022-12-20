const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            //target: "192.168.0.122:5000",
            target: "http://localhost:5000", // 3000번 front에서 target을 5000번으로 설정하겠다.
            changeOrigin: true,
        })
    );
};

/**
 * 아이피를 Proxy Server에서 임의로 바꿔 버릴 수 있다. -> 인터넷에서는 접근하는 사람의 ip를 모르게 된다.
 * 보내는 데이터도 임의로 바꿀 수 있다.
 * 방화벽 기능, 웹 필터 기능,
 * 캐쉬 데이터, 공유데이터 제공 기능
 *
 * 사용 이유 :
 *  회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
 *  캐쉬를 이용해 더 빠른 인터넷 이용 제공
 *  더 나은 보안 제공
 *  이용 제한된 사이트 접근 가능
 */
