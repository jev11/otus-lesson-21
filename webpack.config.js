const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  // devtool: "source-map",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    // hot: true,
    port: 9000,
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/html/index.html",
      minify: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
