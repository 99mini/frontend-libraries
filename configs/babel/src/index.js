/**
 *
 * @param {"react" | undefined} options
 */
exports.generateBabelConfig = function generateBabelConfig(options) {
  const presets = [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ];
  if (options === "react") {
    presets.push(["@babel/preset-react", { runtime: "automatic" }]);
  }

  return { presets };
};
