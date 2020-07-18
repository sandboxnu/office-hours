const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");

const plugins = [
  withTM(["@template"]),
  [withOffline, { dontGenerateSw: true }],
];

const config = {};

module.exports = withPlugins(plugins, config);
