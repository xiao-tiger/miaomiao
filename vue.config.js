module.exports = {
    devServer: {
        proxy: {
            // 反向代理，只要vue中axios的请求url连接是以 /api  开头的
            // 就是自动转到 target 下，一定要设置 changeOrigin为True
            '/api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    }
}

