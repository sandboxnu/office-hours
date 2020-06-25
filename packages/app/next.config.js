const path = require("path");
const fs = require("fs");
const withTM = require("next-transpile-modules");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const lessToJS = require("less-vars-to-js");
const withPlugins = require("next-compose-plugins");
const webpack = require("webpack");

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./less/antd-custom.less"), "utf8")
);

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
  [withCSS],
  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
          });
        }
        return config;
      },
    },
  ],
  [withSass],
  [withTM, { transpileModules: ["@template"] }],
  [withCustomWebpack],
];

const config = {};

module.exports = withPlugins(plugins, config);
