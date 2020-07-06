module.exports = {
  extends: ["plugin:react/recommended"],
  rules: { "react/react-in-jsx-scope": "off" },
  globals: { React: "writable" },
};
