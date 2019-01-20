const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const uglifyJsPlugin = new UglifyJsPlugin({
    extractComments: true,
    sourceMap: true
});

const config = {
    target: "node",
    entry: "./src/main.js",
    output: {
        path: __dirname + "/build",
        filename: "main.js"
    },
    devtool: "sourcemap",
    mode: "development",
    optimization: {
        minimizer: [uglifyJsPlugin],
    }
};

module.exports = config;
