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
    plugins: [
      [
        "styled-components",
        {
          ssr: true,
          displayName: true,
          preprocess: false,
        },
      ],
    ],
    babelrcRoots: [".", "packages/*"],
  };
};
