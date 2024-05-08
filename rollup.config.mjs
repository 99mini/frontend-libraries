import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default [
  {
    input: "packages/index.ts",
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
    input: "packages/core/index.ts",
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
    input: "packages/atom/index.ts",
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
    input: "packages/molecular/index.ts",
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
    input: "packages/index.ts",
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
    input: "packages/core/index.ts",
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
    input: "packages/atom/index.ts",
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
    input: "packages/molecular/index.ts",
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
