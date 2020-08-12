const withTM = require("next-transpile-modules")(["@template"]);
const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");

const plugins = [withTM, withOffline];

const config = { generateInDevMode: true };

module.exports = withPlugins(plugins, config);
