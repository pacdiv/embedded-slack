var path = require('path')
var webpack = require('webpack')
require('dotenv').config()

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      include: __dirname,
      query: {
        presets: [ 'es2015', 'react' ]
      }
    },
    {
      test: /\.scss$/,
      loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }]
  },
  node: {
    fs: 'empty'
  }
}
