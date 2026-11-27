import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { PrototypeShell } from "../../../../../workspace/presentation/PrototypeShell";
import { HosxpHome } from "./HosxpHome";
import { hosxpCase } from "./cases";
const meta = {
  title: "Products/CarivaSpace HosXP/Prototypes/Home",
  component: HosxpHome,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HosxpHome>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Ready: Story = { args: hosxpCase("hosxp-home") };
export const Recording: Story = { args: hosxpCase("hosxp-recording") };
export const Paused: Story = { args: hosxpCase("hosxp-paused") };
export const Stopped: Story = { args: hosxpCase("hosxp-stopped") };
export const Playback: Story = { args: hosxpCase("hosxp-playback") };
export const MobileRecording: Story = { args: hosxpCase("hosxp-mobile-recording"), globals: { viewport: { value: "mobile320", isRotated: false } } };
export const Mobile: Story = { args: hosxpCase("hosxp-mobile"), globals: { viewport: { value: "mobile320", isRotated: false } } };
export const Interaction: Story = { play: async ({ canvas, canvasElement, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Start Record" }));
  const recorder = await canvas.findByRole("group", { name: "Voice Recorder" });
  await expect(recorder).toBeVisible();
  await expect(recorder).toHaveFocus();
  const bar = recorder.querySelector<HTMLElement>(".mira-recorder-bars span")!;
  const reduced = canvasElement.ownerDocument.defaultView!.matchMedia("(prefers-reduced-motion: reduce)").matches;
  await expect(getComputedStyle(bar).animationName).toBe(reduced ? "none" : "mira-recording-wave");
  await userEvent.click(canvas.getByRole("button", { name: "พักบันทึก" }));
  await expect(within(recorder).getByText("Pause", { exact: true })).toBeVisible();
  await expect(getComputedStyle(bar).animationName).toBe("none");
  await userEvent.click(canvas.getByRole("button", { name: "บันทึกต่อ" }));
  await userEvent.click(canvas.getByRole("button", { name: "หยุดบันทึก" }));
  await expect(canvas.getByRole("textbox", { name: "CC (Chief Complaint)" })).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "Mira AI Settings" }));
  const body = within(canvasElement.ownerDocument.body);
  const dialog = await body.findByRole("dialog");
  await waitFor(() => expect(within(dialog).getByRole("heading", { name: "Mira AI Settings" })).toBeVisible());
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  await userEvent.click(canvas.getByRole("button", { name: "Patient History" }));
  await expect(canvas.queryByRole("complementary", { name: "Patient History" })).not.toBeInTheDocument();
} };

export const Workspace: Story = { render: () => <PrototypeShell currentId="hosxp-home"><HosxpHome /></PrototypeShell>, play: async ({ canvas, userEvent }) => {
  await expect(canvas.getByRole("complementary", { name: "เลือก prototype" })).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "ย่อแถบเลือกงาน" }));
  await expect(canvas.getByRole("button", { name: "ขยายแถบเลือกงาน" })).toBeVisible();
  await userEvent.keyboard("{Control>}[Backslash]{/Control}");
  await expect(canvas.queryByRole("complementary", { name: "เลือก prototype" })).not.toBeInTheDocument();
  await userEvent.keyboard("{Control>}[Backslash]{/Control}");
  await expect(canvas.getByRole("complementary", { name: "เลือก prototype" })).toBeVisible();
} };

export const DiscardRecording: Story = { args: { initialState: "paused", initialElapsedSeconds: 12 }, play: async ({ canvas, canvasElement, userEvent }) => {
  await userEvent.click(await canvas.findByRole("button", { name: "ลบเสียงบันทึก" }));
  const body = within(canvasElement.ownerDocument.body);
  const dialog = await body.findByRole("dialog");
  await waitFor(() => expect(within(dialog).getByRole("button", { name: "ลบและเริ่มใหม่" })).toBeVisible());
  await userEvent.click(within(dialog).getByRole("button", { name: "ลบและเริ่มใหม่" }));
  await expect(canvas.getByRole("button", { name: "Start Record" })).toBeVisible();
  await expect(canvas.queryByRole("group", { name: "Voice Recorder" })).not.toBeInTheDocument();
} };
