const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const htmlAttr = [
  {
    tag: "img",
    attribute: "src",
    type: "src",
  },
  {
    tag: "img",
    attribute: "data-gallery-src",
    type: "src",
  },
  {
    tag: "link",
    attribute: "href",
    type: "src"
  },
  {
    tag: "audio",
    attribute: "src",
    type: "src"
  }
]

module.exports = {
  /* here you can define another js file */
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: {
            list: htmlAttr,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/icons/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/sounds/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },

  devServer: {
    port: 8080,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: [
              '**/*.DS_Store',
              '**/Thumbs.db',
            ],
          },
        },
      ],
    }),

    /* here you can define another html file and its dependencies */
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
  ],
};
