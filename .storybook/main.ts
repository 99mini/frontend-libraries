import type { AddonOptionsWebpack } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-webpack5";
import { dirname, join } from "path";

const coverageConfig: AddonOptionsWebpack = {
  istanbul: {
    include: [
      "../packages/**/src/**/*.mdx",
      "../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
  },
};

const storybookConfig: StorybookConfig = {
  stories: [
    "../packages/**/src/**/*.mdx",
    "../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    {
      name: getAbsolutePath("@storybook/addon-coverage"),
      options: coverageConfig,
    },
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  docs: {},
};

export default storybookConfig;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
