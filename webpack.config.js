const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  mode: argv.mode === "development" ? "development" : "production",
  entry: {
    main: "./src/index.ts",
    register: "./src/pages/register/register.ts",
  },
  devtool: argv.mode === "development" ? "inline-source-map" : false,
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }],
      },
      {
        test: /.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /.s[ac]ss$/i,
        use: [
          // Creates style nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["main"],
    }),
    new HTMLWebpackPlugin({
      template: "./src/pages/register/register.html",
      filename: "./register.html",
      chunks: ["register"],
    }),
  ],
});
