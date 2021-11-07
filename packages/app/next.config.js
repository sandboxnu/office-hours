const withTM = require("next-transpile-modules")([
  "@koh/app",
  "@koh/common",
  "@koh/api-client",
]);
const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");

const plugins = [withTM, withOffline];

const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const {
  NEXT_PUBLIC_SERVICE_VERSION: SERVICE_VERSION,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env;

const SENTRY_DSN =
  "https://9cfb47804c93495ba3a66a9d79cec084@o440615.ingest.sentry.io/5557379";

const config = {
  generateInDevMode: true,
  experimental: {
    productionBrowserSourceMaps: true,
  },
  webpack: (config, options) => {
    // Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    if (
      (SERVICE_VERSION,
      SENTRY_DSN,
      SENTRY_AUTH_TOKEN && NODE_ENV === "production")
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          org: "sandboxnu",
          project: "khoury-office-hours-frontend",
          include: ".next",
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
          release: SERVICE_VERSION,
        })
      );
    }
    return config;
  },
  eslint: {
    // Updating to next11 caused linting to break during builds for some reason.
    // Disabling lint during build should be ok as long as we continue linting in
    // other github actions
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(plugins, config);
