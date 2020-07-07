module.exports = {
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: { "react/react-in-jsx-scope": "off" },
  globals: { React: "writable" },
};
