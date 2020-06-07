const path = require('path');
module.exports = {

    output: {
        path: path.resolve(__dirname, 'web/lib'),
        filename: 'ezui.js',
        publicPath: "lib/"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "web"),
        compress: true,
        port: 9000,
        proxy: {
            '/service': {
                target: 'http://localhost:9001',
                pathRewrite: { "^/service": "" }
            }

        },
    }

}