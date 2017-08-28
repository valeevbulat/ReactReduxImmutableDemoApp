const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

const analyze = !!process.env.ANALYZE_ENV;
const env = process.env.NODE_ENV || 'development';

const isProduction = env === 'production';

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|svg|ico|jpg|gif)$/,
    use: 'file-loader',
  },
  {
    test: /\.(eot|otf|svg|ttf|woff)/,
    use: [{
      loader: 'file-loader',
    }],
  },
];

const webpackConfig = {
  name: 'client',
  target: 'web',

  entry: {
    app: path.resolve('src/main.js'),
  },

  module: {
    rules,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve('public/dist'),
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    port: isProduction ? 80 : 4000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};

if (analyze) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

if (isProduction) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  );
}

module.exports = webpackConfig;
