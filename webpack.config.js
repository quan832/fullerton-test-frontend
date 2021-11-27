const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, agrv) => {
  const isDev = agrv.mode === 'development';
  const isAnalyze = env && env.analyze;

  const basePlugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "**/*",
    //       to: "",
    //       globOptions: {
    //         ignore: ["public/index.html"]
    //       }
    //       // context: path.resolve("public")
    //     }
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'static/css/[name].[contenthash:6].css'
    }),
    new webpack.ProgressPlugin()
  ];

  let prodPlugins = [
    ...basePlugins,
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.(css|js|html|svg)$/
    })
  ];
  if (isAnalyze) {
    prodPlugins = [...prodPlugins, new BundleAnalyzerPlugin()];
  }

  return {
    entry: ['./src/index.js'],
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$|jsx/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: isDev ? true : false }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isDev ? true : false }
            }
          ]
        },
        { test: /\.txt$/, use: 'raw-loader' },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isDev ? '[path][name].[ext]' : 'static/media/[name].[contenthash:6].[ext]'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.jsx', '*'],
      modules: [path.resolve(__dirname, 'js'), 'node_modules'],
      alias: {
        App: path.resolve(__dirname, './src/App/'),
        routes: path.resolve(__dirname, './src/routes/'),
        components: path.resolve(__dirname, './src/components/'),
        assets: path.resolve(__dirname, './src/assets/'),
        modules: path.resolve(__dirname, './src/modules/'),
        stylesheet: path.resolve(__dirname, './src/stylesheet/'),
        apis: path.resolve(__dirname, './src/apis/'),
        utils: path.resolve(__dirname, './src/utils/'),
        pages: path.resolve(__dirname, './src/pages/'),
        template: path.resolve(__dirname, './src/template/')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      historyApiFallback: true,
      compress: true,
      port: 8080
    },
    performance: {
      maxEntrypointSize: 800000 //  Khi có 1 file build vượt quá giới hạn này (tính bằng byte) thì sẽ bị warning trên terminal.
    },
    devtool: 'inline-source-map',
    plugins: isDev ? basePlugins : prodPlugins
  };
};
