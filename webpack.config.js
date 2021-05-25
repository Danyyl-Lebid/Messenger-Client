const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  entry: {
    index: ["@babel/polyfill", path.resolve(__dirname, "./src/js/index.js")],
    registration: [
      "@babel/polyfill",
      path.resolve(__dirname, "./src/js/registration.js"),
    ],
    chat: [
      "@babel/polyfill",
      path.resolve(__dirname, "./src/js/chat.js"),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "src/chat.html",
      filename: "chat.html",
      chunks: ["chat"],
    }),
    new HtmlWebpackPlugin({
      template: "src/registration.html",
      filename: "registration.html",
      chunks: ["registration"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/img/", to: "img" }],
    }),

  ],
  resolve: {
    extensions: [".js"],
  },
  module: {



    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|jfif)/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              svgo: {
                enabled: false,
              },
            },
          },
        ],
      },
    ],
  },
};
