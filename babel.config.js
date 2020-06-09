module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "12.16",
          },
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: ["styled-components"],
    babelrcRoots: [".", "packages/*"],
  };
};
