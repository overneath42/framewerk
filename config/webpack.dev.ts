import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as LiveReloadPlugin from 'webpack-livereload-plugin';
import * as path from 'path';
import commonConfig from './webpack.common';

declare var __dirname;

const config = function(): webpack.Configuration {
  return webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    output: {
      path: path.resolve(__dirname, '../demo/js'),
      filename: 'fw.bundle.js',
      sourceMapFilename: '[file].map'
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: true
    },
    plugins: [new LiveReloadPlugin({ appendScriptTag: true })]
  });
};

export default config;
