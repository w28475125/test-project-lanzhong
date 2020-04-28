module.exports = {
    devServer: {
        open : true,
        proxy: {
            "/api": {
                target: 'http://192.168.1.244:9088/property-system-web',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        }
    }
}