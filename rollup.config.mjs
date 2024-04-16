import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "./index.js",
      format: "cjs",
    },
    external: ["react", "classnames"],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        inject: true,
        extensions: [".css", ".scss"],
      }),
    ],
  },
  {
    input: "src/core/index.ts",
    output: {
      file: "./core/index.js",
      format: "cjs",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        inject: true,
        extensions: [".css", ".scss"],
      }),
    ],
  },
  {
    input: "src/atom/index.ts",
    output: {
      file: "./atom/index.js",
      format: "cjs",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        inject: true,
        extensions: [".css", ".scss"],
      }),
    ],
  },
  {
    input: "src/molecular/index.ts",
    output: {
      file: "./molecular/index.js",
      format: "cjs",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        inject: true,
        extensions: [".css", ".scss"],
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "./index.d.ts",
      format: "es",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      dts(),
      postcss({
        inject: false,
      }),
    ],
  },
  {
    input: "src/core/index.ts",
    output: {
      file: "./core/index.d.ts",
      format: "es",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      dts(),
      postcss({
        inject: false,
      }),
    ],
  },
  {
    input: "src/atom/index.ts",
    output: {
      file: "./atom/index.d.ts",
      format: "es",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      dts(),
      postcss({
        inject: false,
      }),
    ],
  },
  {
    input: "src/molecular/index.ts",
    output: {
      file: "./molecular/index.d.ts",
      format: "es",
    },
    external: ["react", "classnames"],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      dts(),
      postcss({
        inject: false,
      }),
    ],
  },
];
