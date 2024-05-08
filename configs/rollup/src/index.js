const typescript = require("@rollup/plugin-typescript");
const { dts } = require("rollup-plugin-dts");
const postcss = require("rollup-plugin-postcss");
const { typescriptPaths } = require("rollup-plugin-typescript-paths");
const fs = require("fs");
const path = require("path");

/**
 * @param {{packageDir: string, react?: boolean}} option
 */
exports.generateRollupConfig = function generateRollupConfig(option) {
  function generateIndexConfig(subPackageDir) {
    return {
      input: `${option.packageDir}/src/${subPackageDir ? `${subPackageDir}/` : ""}index.ts`,
      output: {
        file: `dist/${subPackageDir ? `${subPackageDir}/` : ""}index.js`,
        format: "cjs",
      },
      external: option.react ? ["react", "classnames"] : [],
      plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        option.react &&
          postcss({
            inject: true,
            extensions: [".css", ".scss"],
          }),
      ],
    };
  }

  function generateTypeConfig(subPackageDir) {
    return {
      input: `${option.packageDir}/src/${subPackageDir ? `${subPackageDir}/` : ""}index.ts`,
      output: {
        file: `dist/${subPackageDir ? `${subPackageDir}/` : ""}index.d.ts`,
        format: "es",
      },
      external: option.react ? ["react", "classnames"] : [],
      plugins: [
        typescriptPaths({ preserveExtensions: true }),
        dts(),
        option.react &&
          postcss({
            inject: false,
          }),
      ],
    };
  }

  const subDirectories = fs
    .readdirSync(path.join(option.packageDir, "src"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const subDirecotoryConfigs = subDirectories
    .map((subDirectory) => [
      generateIndexConfig(subDirectory),
      generateTypeConfig(subDirectory),
    ])
    .flat();

  return [generateIndexConfig(), generateTypeConfig(), ...subDirecotoryConfigs];
};
