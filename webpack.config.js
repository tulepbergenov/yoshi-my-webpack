const path = require("path");

module.exports = {
  mode: process.env.BUILD_MODE ?? "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.[fullhash].js",
    clean: true,
  },
};
