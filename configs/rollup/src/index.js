import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

/**
 * @param {{packageDir: string, react?: boolean}} option
 */
export const generateRollupConfig = ({ option }) => {
  const indexConfig = {
    input: `${option.packageDir}/src/index.ts`,
    output: {
      file: "./index.js",
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
  const typeConfig = {
    input: `${option.packageDir}/src/index.ts`,
    output: {
      file: "./index.d.ts",
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

  return [indexConfig, typeConfig];
};
