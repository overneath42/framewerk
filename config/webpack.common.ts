import * as webpack from 'webpack';

const commonConfig: webpack.Configuration = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by
      // 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['awesome-typescript-loader']
      },

      // All output '.js' files will have any sourcemaps re-processed by
      // 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  }
};

export default commonConfig;
