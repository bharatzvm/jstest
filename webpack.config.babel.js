import path from 'path';
import config from 'config';
import AssetsJSONPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cssExtraction = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});

const devBuildPath = path.resolve(__dirname, 'src/compiled');

const prodBuildPath = path.resolve(__dirname, 'build/compiled');

const assetsOptions = {
  development: {
    filename: 'assets.json',
    path: devBuildPath,
    prettyPrint: true,
  },
  newstack: {
    filename: 'assets.json',
    path: devBuildPath,
    prettyPrint: true,
  },
  stage: {
    filename: 'assets.json',
    path: devBuildPath,
    prettyPrint: true,
  },
  production: {
    filename: 'assets.json',
    path: devBuildPath,
    prettyPrint: true,
  },
};

const assetsJSONPlugin = new AssetsJSONPlugin(assetsOptions[config.WEBPACK_ASSETS_JSON] || assetsOptions.production);

const devtool = {
  development: 'cheap-eval-source-map',
  newstack: 'eval',
  stage: 'source-map',
  production: 'nosources-source-map',
};

const buildPath = {
  development: devBuildPath,
  newstack: prodBuildPath,
  stage: prodBuildPath,
  production: prodBuildPath,
};

const stats = {
  development: 'normal',
  newstack: 'detailed',
  stage: 'detailed',
  production: 'errors-only',
};

const publicPath = {
  development: '/public/assets/js/',
  newstack: '/public/assets/js/',
  stage: '/public/assets/js/',
  production: '/public/assets/js/',
};

const getPublicPath = () => publicPath[config.WEBPACK_PUBLIC_PATH] || publicPath.development;
const getBuildPath = () => buildPath[config.WEBPACK_BUILD_PATH] || prodBuildPath;
const getDevTool = () => devtool[config.WEBPACK_DEVTOOL] || false;
const getStats = () => stats[config.WEBPACK_BUILD_STATS] || true;

const plugins = [assetsJSONPlugin, cssExtraction];

const webpackConfig = {
  entry: {
    app: './src/components/quiz/page.jsx',
  },
  devtool: getDevTool(),
  stats: getStats(),
  output: {
    filename: '[name].[hash].bundle.js',
    path: getBuildPath(),
    publicPath: getPublicPath(),
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '*'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: ['stage-3', 'react'],
            plugins: ['transform-class-properties',
              ['module-resolver', {
                root: [
                  './src',
                  './src/components',
                ],
              }],
            ],
          },
        }],
      },
      {
        test: /\.scss$/,
        use: cssExtraction.extract({
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[hash:8]',
            },
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
    ],
  },
};

export default webpackConfig;
