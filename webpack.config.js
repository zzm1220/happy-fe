const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
console.log(WEBPACK_ENV);

const getHtmlConfig = function(name) {
  return {
    template: `./src/view/${name}.html`,
    filename: `view/${name}.html`,
    inject: true,
    hash: true,
    chunks: ["vendors","chunks",name],
  };
}
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
  resolve: {
    alias: {
      util: __dirname + "/src/util",
      page: __dirname + "/src/page",
      service: __dirname + "/src/service",
      image: __dirname + "/src/image",
    },
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
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        commons: {
          name: "commons",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100,
              name: "[name].[ext]",
              outputPath: "resource/",
              publicPath: "../resource/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin(getHtmlConfig("index")),
    new HtmlWebpackPlugin(getHtmlConfig("login")),
  ],
  devServer: {
    contentBase: "./dist",
    open: true,
    openPage: "view/index.html",
    proxy: {
      "/api": {
        target: "http://test.happymmall.com",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
};

module.exports = config;
