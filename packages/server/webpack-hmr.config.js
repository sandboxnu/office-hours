// Webpack with hot module reloading for use in development
// Hot module reloading supposedly lets us reload the server faster
// https://docs.nestjs.com/recipes/hot-reload

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('razzle-start-server-webpack-plugin');

module.exports = function (options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100', '@koh/common'],
        additionalModuleDirs: [path.resolve(__dirname, '../../node_modules')], // handle yarn workspaces https://github.com/liady/webpack-node-externals/issues/39
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          include: /@koh/, // Build packages we depend on
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
      new StartServerPlugin(),
    ],
  };
};
