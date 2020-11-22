const withTM = require("next-transpile-modules")(["@koh"], {
  unstable_webpack5: true,
});
const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");

const plugins = [withTM, withOffline];

const config = {
  generateInDevMode: true,
  experimental: {
    productionBrowserSourceMaps: true,
  },
};

module.exports = withPlugins(plugins, config);
