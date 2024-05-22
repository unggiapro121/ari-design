const path = require("path");
const turbosnap = require("vite-plugin-turbosnap");
const { mergeConfig } = require("vite");

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    // Often used for tailwind
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { importLoaders: 1 },
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: "postcss-loader",
                options: { implementation: require.resolve("postcss") },
              },
            ],
          },
        ],
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
    "@storybook/addon-mdx-gfm",
  ],

  staticDirs: ["../assets", "../src/images"],

  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === "PRODUCTION"
          ? [turbosnap({ rootDir: config.root ?? process.cwd() })]
          : [],
      // ...And any other config you need to change...
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
  },

  docs: {
    autodocs: true,
  },

  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
};

export default config;
