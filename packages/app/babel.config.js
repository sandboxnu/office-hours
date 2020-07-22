module.exports = {
  presets: [
    [
      "next/babel",
      {
        "class-properties": {
          loose: true,
        },
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "styled-components",
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
};
