import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { PrototypeShell } from "../../../../../workspace/presentation/PrototypeShell";
import { HosxpHome } from "./HosxpHome";
import { hosxpCase } from "./cases";
const meta = {
  title: "Products/Mock HosXP/Prototypes/Home",
  component: HosxpHome,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HosxpHome>;
export default meta;
type Story = StoryObj<typeof meta>;
// State stories hold their first screen so each Canvas frame stays on the step it names.
const still = (id: string) => ({ ...hosxpCase(id), holdInitial: true });
export const Ready: Story = { args: still("mock-hosxp-home") };
export const Recording: Story = { args: still("hosxp-recording") };
export const Paused: Story = { args: still("hosxp-paused") };
export const Stopped: Story = { args: still("hosxp-stopped") };
export const Playback: Story = { args: still("hosxp-playback") };
export const Generating: Story = { args: still("hosxp-generating") };
export const NoteReady: Story = { args: still("hosxp-result") };
export const Saving: Story = { args: still("hosxp-saving") };
export const Saved: Story = { args: still("hosxp-saved") };
export const Closing: Story = { args: still("hosxp-closing") };
export const FeedbackForm: Story = { args: still("hosxp-feedback") };
export const FeedbackSent: Story = { args: still("hosxp-feedback-sent"), play: async ({ canvasElement }) => {
  const body = within(canvasElement.ownerDocument.body);
  await expect(await body.findByText("Feedback sent")).toBeInTheDocument();
  await expect(within(canvasElement).queryByText("How did Mira do on this note?")).not.toBeInTheDocument();
} };
export const MobileRecording: Story = { args: still("hosxp-mobile-recording"), globals: { viewport: { value: "mobile320", isRotated: false } } };
export const Mobile: Story = { args: still("hosxp-mobile"), globals: { viewport: { value: "mobile320", isRotated: false } } };
export const MobileNoteReady: Story = { args: still("hosxp-feedback-mobile"), globals: { viewport: { value: "mobile320", isRotated: false } }, play: async ({ canvas, canvasElement }) => {
  await expect(await canvas.findByRole("button", { name: "Send feedback" })).toBeInTheDocument();
  const root = canvasElement.ownerDocument.documentElement;
  await expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
} };
export const HappyPath: Story = { play: async ({ canvas, canvasElement, userEvent }) => {
  const body = within(canvasElement.ownerDocument.body);
  await userEvent.click(canvas.getByRole("button", { name: "Start Record" }));
  await userEvent.click(canvas.getByRole("button", { name: /^Stop 00:/ }));
  await expect(canvas.getByRole("heading", { name: "Ready to record" })).toBeVisible();
  const split = canvasElement.querySelector<HTMLElement>("[data-slot=button-split-action]")!;
  await userEvent.click(split);
  await expect(canvas.getByRole("heading", { name: "Generating your note" })).toBeVisible();
  await expect(canvas.getByRole("button", { name: "Mira AI Settings" })).toBeDisabled();
  await expect(await canvas.findByRole("region", { name: "Generated note" }, { timeout: 5000 })).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "Good" }));
  const panel = await canvas.findByRole("dialog", { name: "How did Mira do on this note?" });
  await userEvent.type(within(panel).getByRole("textbox"), "ใช้งานได้ดี");
  await expect(within(panel).getByText("11/500 characters")).toBeVisible();
  await userEvent.click(within(panel).getByRole("button", { name: "Send feedback" }));
  await expect(await body.findByText("Feedback sent")).toBeInTheDocument();
  await expect(canvas.queryByRole("button", { name: "Good" })).not.toBeInTheDocument();
  await userEvent.click(canvas.getByRole("button", { name: "Save to HIS" }));
  await expect(canvas.getByRole("heading", { name: "Saving to HIS" })).toBeVisible();
  await expect(await canvas.findByRole("heading", { name: "Note saved!" }, { timeout: 4000 })).toBeVisible();
  await expect(await canvas.findByRole("heading", { name: "Closing your session..." }, { timeout: 5000 })).toBeVisible();
  await expect(await canvas.findByRole("heading", { name: "Session closed" }, { timeout: 4000 })).toBeVisible();
} };
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
  await expect(canvas.getByRole("heading", { name: "Ready to record" })).toBeVisible();
  await expect(canvasElement.querySelector("[data-slot=button-split-action]")).toHaveTextContent("Transcribe");
  await userEvent.click(canvas.getByRole("button", { name: "Mira AI Settings" }));
  const body = within(canvasElement.ownerDocument.body);
  const dialog = await body.findByRole("dialog");
  await waitFor(() => expect(within(dialog).getByRole("heading", { name: "Mira AI Settings" })).toBeVisible());
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  await userEvent.click(canvas.getByRole("button", { name: "Patient History" }));
  await expect(canvas.queryByRole("complementary", { name: "Patient History" })).not.toBeInTheDocument();
} };

export const Workspace: Story = { render: () => <PrototypeShell currentId="mock-hosxp-home"><HosxpHome /></PrototypeShell>, play: async ({ canvas, userEvent }) => {
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
