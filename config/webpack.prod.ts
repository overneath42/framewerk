import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as path from 'path';
import commonConfig from './webpack.common';

declare var __dirname;

const config = function(): webpack.Configuration {
  return webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'fw.js',
      library: 'framewerk',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        mangle: false
      })
    ]
  });
};

export default config;
