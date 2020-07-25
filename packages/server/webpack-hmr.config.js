// Webpack with hot module reloading for use in development
// Hot module reloading supposedly lets us reload the server faster
// https://docs.nestjs.com/recipes/hot-reload

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = function (options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100', '@template/common'],
        additionalModuleDirs: [path.resolve(__dirname, '../../node_modules')], // handle yarn workspaces https://github.com/liady/webpack-node-externals/issues/39
      }),
    ],
    devtool: 'source-map',
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
          include: /@template/, // Build packages we depend on
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};
