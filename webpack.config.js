var webpack = require('webpack');
var path = require('path');

var BUILD = path.resolve(__dirname, 'src/client/public');
var CLIENT = path.resolve(__dirname, 'src/client/app')

module.exports = {
  entry: [
    CLIENT + '/app.jsx',
    'webpack/hot/dev-server'
    ],

  output: {
    path: BUILD,
    publicPath: '/client/public',
    filename: 'bundle.js'
  },
  devServer: {
      colors: true,
      historyApiFallback: true,
      inline: true,
      hot: true,
      contentBase: './src/client',
      port: 8080
  },
  module: {
    loaders: [
      {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        // cacheDirectory: 'babel_cache',
        presets: ['es2015', 'react']
      }
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  // devtool: 'source-map',
};