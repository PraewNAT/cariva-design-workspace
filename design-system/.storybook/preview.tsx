import type { Preview } from "@storybook/react-vite";
import { TooltipProvider } from "../src/lib/app/components/ui/tooltip";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: "Mobile 390px",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        mobile320: {
          name: "Mobile 320px",
          styles: { width: "320px", height: "700px" },
          type: "mobile",
        },
      },
    },
    docs: {
      codePanel: true,
      source: { type: "dynamic" },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
