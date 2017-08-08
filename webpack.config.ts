import * as webpack from 'webpack';
import webpackDevConfig from './config/webpack.dev';
import webpackProdConfig from './config/webpack.prod';

declare var process;

let config: webpack.Configuration;

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    config = webpackProdConfig();
    break;
  case 'dev':
  case 'development':
  default:
    config = webpackDevConfig();
}

export default config;
