const path = require("path");
const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");
const webpack = require("webpack");

function withCustomWebpack(config = {}) {
  config.webpack = (config, ...rest) => {
    // allow other packages to be built with babel
    const babelRule = config.module.rules.find((rule) =>
      rule.use && Array.isArray(rule.use)
        ? rule.use.find((u) => u.loader === "next-babel-loader")
        : rule.use.loader === "next-babel-loader"
    );
    if (babelRule) {
      babelRule.include.push(path.resolve("../"));
    }
    return config;
  };

  return config;
}

const plugins = [
  [withTM, { transpileModules: ["@template"] }],
  [withCustomWebpack],
];

const config = {};

module.exports = withPlugins(plugins, config);
