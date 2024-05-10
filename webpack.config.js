const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const isProduction = process.env.BUILD_MODE === "production";
const isDevelopment = process.env.BUILD_MODE === "development";

module.exports = {
  mode: process.env.BUILD_MODE ?? "development",
  entry: path.resolve(__dirname, "src", "index.ts"),
  devtool: isDevelopment ? "inline-source-map" : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.[fullhash].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      minify: isProduction,
    }),
    isDevelopment && new webpack.ProgressPlugin(),
  ],
};
