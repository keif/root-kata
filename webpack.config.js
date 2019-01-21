const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const uglifyJsPlugin = new UglifyJsPlugin({
    extractComments: true,
    sourceMap: true
});

const copyWebpackPlugin = new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, "./src/data/inputs.txt"),
        to: path.resolve(__dirname, "./build/data.txt")
    }
]);

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
        minimizer: [uglifyJsPlugin]
    },
    plugins: [copyWebpackPlugin]
};

module.exports = config;
