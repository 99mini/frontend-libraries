const { generateRollupConfig } = require("@99mini/rollup-config");

module.exports = generateRollupConfig({
  packageDir: __dirname,
  react: true,
  ignorePackages: ["GridContext", "TabContext"],
});
