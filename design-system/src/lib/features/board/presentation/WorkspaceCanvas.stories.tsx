import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

/**
 * Figma-style board of live stories — the repo's `sync/canvas/index.html`,
 * served at `/canvas/`. Frames come from `sync/canvas/frames.prototype.json`.
 */
function WorkspaceCanvas({ width }: { width?: number }) {
  return (
    <iframe
      title="Cariva Canvas"
      allow="fullscreen"
      src="./canvas/index.html?frames=frames.prototype"
      style={{ position: "fixed", inset: 0, width: width || "100%", maxWidth: "100%", height: "100%", border: 0 }}
    />
  );
}

const meta = {
  title: "Workspace/Canvas",
  component: WorkspaceCanvas,
  parameters: { layout: "fullscreen", docs: { disable: true } },
} satisfies Meta<typeof WorkspaceCanvas>;

export default meta;
export const Board: StoryObj<typeof meta> = {
  play: async ({ canvasElement, userEvent }) => {
    const iframe = canvasElement.querySelector("iframe")!;
    await waitFor(() => expect(iframe.contentDocument?.querySelector("#case option")).toBeTruthy(), { timeout: 15000 });
    const body = within(iframe.contentDocument!.body);
    const selection = body.getByLabelText("เลือกหน้า / เคส");
    await userEvent.selectOptions(selection, "appointment");
    await userEvent.click(body.getByRole("button", { name: "Preview" }));
    await expect(body.getByRole("button", { name: "Preview" })).toHaveAttribute("aria-pressed", "true");
    await expect(body.getByRole("link", { name: "เปิดเต็มหน้า ↗" })).toHaveAttribute("href", "http://localhost:5173/?case=appointment");
    await userEvent.click(body.getByRole("button", { name: "Canvas" }));
    await expect(selection).toHaveValue("appointment");
  },
};

export const Mobile: StoryObj<typeof meta> = {
  args: { width: 320 },
  play: async ({ canvasElement }) => {
    const iframe = canvasElement.querySelector("iframe")!;
    await waitFor(() => expect(iframe.contentDocument?.querySelector("#case option")).toBeTruthy(), { timeout: 15000 });
    const doc = iframe.contentDocument!;
    await expect(doc.documentElement.clientWidth).toBe(320);
    await expect(doc.querySelector("#modes")!.getBoundingClientRect().right).toBeLessThanOrEqual(320);
  },
};
