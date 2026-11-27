import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { MiraRecorder, type MiraRecorderState } from "./mira-recorder";
import { Button } from "@/lib/app/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/lib/app/components/ui/dialog";
const meta = {
  title: "Products/Mock Mira/Components/Recorder",
  component: MiraRecorder,
  tags: ["autodocs"],
  args: { state: "recording", elapsedSeconds: 1, onPause: fn(), onResume: fn(), onStop: fn(), onDiscard: fn(), onPlay: fn(), onSeek: fn(), onTranscribe: fn() },
  parameters: { docs: { description: { component: "Controlled Mira recorder presentation. Four Figma states; parent owns microphone access, timer, audio storage and transcription. No audio API is called. Figma reference waveforms are local SVGs; pass waveform data for live levels." } } },
} satisfies Meta<typeof MiraRecorder>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Recording: Story = {};
export const Paused: Story = { args: { state: "pause", elapsedSeconds: 721 } };
export const ReadyToTranscribe: Story = { args: { state: "ready-to-transcribe", elapsedSeconds: 721 } };
export const Playback: Story = { args: { state: "playback", elapsedSeconds: 301, positionSeconds: 301 } };
export const AllStates: Story = { render: args => <div className="flex flex-wrap items-start gap-6">{(["recording", "pause", "ready-to-transcribe", "playback"] as const).map(state => <MiraRecorder {...args} key={state} state={state} elapsedSeconds={state === "recording" ? 1 : state === "playback" ? 301 : 721} />)}</div> };
function ControlledRecorder() {
  const [state, setState] = useState<MiraRecorderState>("recording");
  const [position, setPosition] = useState(0);
  const [message, setMessage] = useState("");
  return <div><MiraRecorder state={state} positionSeconds={position} durationSeconds={30} elapsedSeconds={position || 1} onPause={() => setState(state === "playback" ? "ready-to-transcribe" : "pause")} onResume={() => setState("recording")} onStop={() => setState("ready-to-transcribe")} onPlay={() => setState("playback")} onSeek={setPosition} onDiscard={() => setMessage("ลบเสียงตัวอย่างแล้ว")} onTranscribe={() => setMessage("ส่งคำขอถอดเสียงตัวอย่างแล้ว")} /><p role="status">{message}</p></div>;
}
export const Interaction: Story = { render: () => <ControlledRecorder />, play: async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "พักบันทึก" }));
  await expect(canvas.getByText("Pause", { exact: true })).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "บันทึกต่อ" }));
  await userEvent.click(canvas.getByRole("button", { name: "หยุดบันทึก" }));
  await expect(canvas.getByText("Ready to Transcribe")).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "เล่นเสียง" }));
  await expect(canvas.getByText("Playback", { exact: true })).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "เดินหน้า 5 วินาที" }));
  await expect(canvas.getByRole("slider", { name: "ตำแหน่งเล่นเสียง" })).toHaveValue("5");
  await userEvent.click(canvas.getByRole("button", { name: "Transcribe" }));
  await expect(canvas.getByText("ส่งคำขอถอดเสียงตัวอย่างแล้ว")).toBeVisible();
} };
export const PageAndDialog: Story = { render: args => <div className="flex flex-wrap items-start gap-6"><MiraRecorder {...args} /><Dialog><DialogTrigger render={<Button variant="outline" />}>เปิด Recorder</DialogTrigger><DialogContent><DialogTitle>Mira Recorder</DialogTitle><MiraRecorder {...args} /></DialogContent></Dialog></div>, play: async ({ canvas, canvasElement, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "เปิด Recorder" }));
  const dialog = await within(canvasElement.ownerDocument.body).findByRole("dialog");
  await waitFor(() => expect(within(dialog).getByRole("group", { name: "Voice Recorder" })).toBeVisible());
} };
export const MobileThai: Story = { args: { title: "เครื่องบันทึกเสียงสำหรับสรุปการตรวจรักษาผู้ป่วย", state: "ready-to-transcribe" }, globals: { viewport: { value: "mobile320", isRotated: false } } };
export const Callbacks: Story = { play: async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: "พักบันทึก" }));
  await expect(args.onPause).toHaveBeenCalled();
  await userEvent.click(canvas.getByRole("button", { name: "หยุดบันทึก" }));
  await expect(args.onStop).toHaveBeenCalled();
} };
export const ZeroDuration: Story = {
  args: { state: "ready-to-transcribe", durationSeconds: 0, elapsedSeconds: 0 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "เล่นเสียง" })).toBeDisabled();
    await expect(canvas.getByRole("slider", { name: "ตำแหน่งเล่นเสียง" })).toBeDisabled();
  },
};
