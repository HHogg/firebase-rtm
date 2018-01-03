const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    filename: 'race-to-mars.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    }),
  ],
  devServer: {
    contentBase: './src',
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    hot: true,
  },
};
