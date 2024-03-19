import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "./index.js",
      format: "cjs",
    },
    plugins: [
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
    plugins: [
      typescript({ tsconfig: "./src/atom/tsconfig.json" }),
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
    plugins: [
      dts(),
      postcss({
        inject: false,
      }),
    ],
  },
];
