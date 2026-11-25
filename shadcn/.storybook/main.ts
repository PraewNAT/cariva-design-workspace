import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  // The Figma-style board lives in the repo's sync/canvas; serve it at /canvas/ (dev and static build).
  staticDirs: [{ from: "../../sync/canvas", to: "/canvas" }],
  framework: "@storybook/react-vite",
};
export default config;
