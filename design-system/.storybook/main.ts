import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)", "../../products/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  // The Figma-style board lives in the repo's sync/canvas; serve it at /canvas/ (dev and static build).
  staticDirs: [{ from: "../../workspace/canvas", to: "/canvas" }],
  viteFinal: async (config) => mergeConfig(config, {
    server: { fs: { allow: [path.resolve(import.meta.dirname, "../..")] } },
    resolve: {
      alias: { "storybook/test": fileURLToPath(import.meta.resolve("storybook/test")), ...Object.fromEntries(["react", "react-dom", "lucide-react", "@fontsource", "@material-symbols"].map(name => [name, path.resolve(import.meta.dirname, "../node_modules", name)])) },
      dedupe: ["react", "react-dom"],
    },
  }),
  framework: "@storybook/react-vite",
};
export default config;
