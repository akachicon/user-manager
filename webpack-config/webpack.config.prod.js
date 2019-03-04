const merge = require('webpack-merge');
const webpack = require('webpack');
const MinifyJSPlugin = require('babel-minify-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.config.base.js');
const { inProject } = require('../utils');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: inProject('bundle-report.html')
    })
  ],
  optimization: {
    noEmitOnErrors: false,
    minimize: true,
    minimizer: [
      new MinifyJSPlugin(
        {
          mangle: { topLevel: true },
        }
      )
    ]
  }
});
