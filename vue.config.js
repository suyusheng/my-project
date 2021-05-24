module.exports = {
    // publicPath: process.env.CI_PUBLIC_PATH || '/',
    // lintOnSave: false,
    devServer: {
        open: false,  //  项目时是否打开浏览器
        host: 'localhost', // 主机地址
        port: 8081, // 本地端口
        proxy: {
            '/api': {
                // 目标api
                target: 'https://mars1.geek-8.com',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}