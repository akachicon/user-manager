const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');
const project = require('../project.config.js');
const { inProject } = require('../utils');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: project.sourceMaps,
  output: {
    filename: '[name].e.js',
    chunkFilename: '[name].c.js'
  },
  devServer: {
    port: project.dev.port,
    host: project.dev.host,
    contentBase: inProject(project.outDir),
    clientLogLevel: project.dev.logLevel,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
