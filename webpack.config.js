const path = require("path");

const config = {
  mode: "development",
  entry: {
    index: "./src/page/index",
    login: "./src/page/login",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    jquery: "window.jQuery",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxSize: 0,
      minChunks: 1,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        commons: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = config;
