const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("lib"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      lodash: path.resolve(__dirname, "./node_modules/lodash"),
      uuid: path.resolve(__dirname, "./node_modules/uuid")
    },
  },
};