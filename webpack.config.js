const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
console.log(WEBPACK_ENV);

const getHtmlConfig = function (name, title) {
  return {
    template: `./src/view/${name}.html`,
    filename: `view/${name}.html`,
    title,
    inject: true,
    hash: true,
    chunks: ["vendors", "chunks", name],
  };
}
const config = {
  mode: "development",
  entry: {
    index: "./src/page/index",
    list: "./src/page/list",
    login: "./src/page/login",
    result: "./src/page/result",
    register: "./src/page/register",
    "pass-reset": "./src/page/pass-reset",
    center: "./src/page/center",
    "center-update": "./src/page/center-update",
    "pass-update": "./src/page/pass-update",
    detail: "./src/page/detail",
    cart: "./src/page/cart"
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
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
      node_modules: __dirname + "/node_modules",
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
    rules: [{
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
        use: [{
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 100,
            name: "[name].[ext]",
            outputPath: "resource/",
            publicPath: "../resource/",
          },
        }, ],
      },
      {
        test: /\.string$/,
        use: "html-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new HtmlWebpackPlugin(getHtmlConfig("index", "首页")),
    new HtmlWebpackPlugin(getHtmlConfig("list", "商品列表页")),
    new HtmlWebpackPlugin(getHtmlConfig("login", "登录")),
    new HtmlWebpackPlugin(getHtmlConfig("result", "操作结果")),
    new HtmlWebpackPlugin(getHtmlConfig("register", "注册")),
    new HtmlWebpackPlugin(getHtmlConfig("pass-reset", "密码找回")),
    new HtmlWebpackPlugin(getHtmlConfig("center", "个人中心")),
    new HtmlWebpackPlugin(getHtmlConfig("center-update", "修改个人信息")),
    new HtmlWebpackPlugin(getHtmlConfig("pass-update", "修改密码")),
    new HtmlWebpackPlugin(getHtmlConfig("detail", "商品详情页")),
    new HtmlWebpackPlugin(getHtmlConfig("cart", "购物车"))
  ],
  devServer: {
    contentBase: "./dist",
    open: true,
    openPage: "dist/view/index.html",
    proxy: {
      "/api": {
        target: "http://test.happymmall.com/",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
};

module.exports = config;