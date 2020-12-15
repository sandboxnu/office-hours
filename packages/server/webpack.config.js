// Webpack config for building for production
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const SentryPlugin = require('@sentry/webpack-plugin');

module.exports = function (options) {
  return {
    ...options,
    externals: [
      nodeExternals({
        allowlist: ['@koh/common'],
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
      // SERVICE_VERSION is the git hash, passed during build time.
      new SentryPlugin({
        release: process.env.SERVICE_VERSION,
        include: './dist',
      }),
      // Encode it as a global at build time so we can pass it to Sentry at run time
      new webpack.EnvironmentPlugin({
        SERVICE_VERSION: process.env.SERVICE_VERSION,
      }),
    ],
  };
};
