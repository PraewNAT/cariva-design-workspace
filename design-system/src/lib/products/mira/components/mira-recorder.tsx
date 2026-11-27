import type { ComponentProps, CSSProperties } from "react";
import micIcon from "@material-symbols/svg-400/rounded/mic-fill.svg";
import pauseIcon from "@material-symbols/svg-400/rounded/pause-fill.svg";
import playIcon from "@material-symbols/svg-400/rounded/play_arrow-fill.svg";
import stopIcon from "@material-symbols/svg-400/rounded/stop-fill.svg";
import deleteIcon from "@material-symbols/svg-400/rounded/delete_forever.svg";
import replayIcon from "@material-symbols/svg-400/rounded/replay_5.svg";
import forwardIcon from "@material-symbols/svg-400/rounded/forward_5.svg";
import transcribeIcon from "./assets/recorder/transcribe-icon.svg";
import { Card } from "@/lib/app/components/ui/card";
import { Button } from "@/lib/app/components/ui/button";
import { TagColor } from "@/lib/app/components/ui/tag";
import { cn } from "cn";
import readyWaveform from "./assets/recorder/ready-waveform.svg";
import playbackWaveform from "./assets/recorder/playback-waveform.svg";
import timeline from "./assets/recorder/timeline.svg";
import { recorderWaveform } from "./recorder-waveform";
import "../theme/mira.css";
import "./mira-recorder.css";
function RecorderIcon({ src }: { src: string }) {
  return <span className="mira-recorder-symbol" aria-hidden style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }} />;
}
export const miraRecorderStates = ["recording", "pause", "ready-to-transcribe", "playback"] as const;
export type MiraRecorderState = typeof miraRecorderStates[number];
export type MiraRecorderProps = Omit<ComponentProps<"div">, "title" | "onChange"> & {
  title?: string;
  state?: MiraRecorderState;
  elapsedSeconds?: number;
  durationSeconds?: number;
  positionSeconds?: number;
  waveform?: readonly number[];
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onDiscard?: () => void;
  onPlay?: () => void;
  onSeek?: (seconds: number) => void;
  onTranscribe?: () => void;
};
function formatTime(seconds: number) {
  const value = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return [Math.floor(value / 3600), Math.floor(value / 60) % 60, value % 60].map(n => n.toString().padStart(2, "0")).join(":");
}
/** Controlled presentation/actions. Caller owns audio permissions, recording and transcription. */
export function MiraRecorder({ title = "Voice Recorder", state = "recording", elapsedSeconds = 1, durationSeconds = 721, positionSeconds = 0, waveform, onPause, onResume, onStop, onDiscard, onPlay, onSeek, onTranscribe, className, ...props }: MiraRecorderProps) {
  const transport = state === "ready-to-transcribe" || state === "playback";
  const duration = Math.max(0, Number.isFinite(durationSeconds) ? durationSeconds : 0);
  const position = Math.min(duration, Math.max(0, Number.isFinite(positionSeconds) ? positionSeconds : 0));
  const tag = state === "recording" ? ["pink", "Recording"] as const : state === "pause" ? ["amber", "Pause"] as const : state === "playback" ? ["sky", "Playback"] as const : ["emerald", "Ready to Transcribe"] as const;
  const info = <div className="mira-recorder-info"><TagColor color={tag[0]}>{tag[1]}</TagColor><output className="mira-recorder-time" role="timer" aria-live="off" aria-label="Recording time">{formatTime(elapsedSeconds)}</output></div>;
  const controls = transport ? <div className="mira-recorder-controls"><Button variant="ghost" color="secondary" size="icon-lg" aria-label="ย้อนกลับ 5 วินาที" onClick={() => onSeek?.(Math.max(0, position - 5))}><RecorderIcon src={replayIcon} /></Button><Button variant="outline" color="secondary" size="icon-lg" aria-label={state === "playback" ? "พักการเล่น" : "เล่นเสียง"} disabled={duration === 0} onClick={state === "playback" ? onPause : onPlay}>{state === "playback" ? <RecorderIcon src={pauseIcon} /> : <RecorderIcon src={playIcon} />}</Button><Button variant="ghost" color="secondary" size="icon-lg" aria-label="เดินหน้า 5 วินาที" onClick={() => onSeek?.(Math.min(duration, position + 5))}><RecorderIcon src={forwardIcon} /></Button></div> : <div className="mira-recorder-controls"><Button variant="outline" color="destructive" size="icon" className="mira-recorder-small-action" aria-label="ลบเสียงบันทึก" onClick={onDiscard}><RecorderIcon src={deleteIcon} /></Button><Button variant="default" color="destructive" size="icon-lg" aria-label="หยุดบันทึก" onClick={onStop}><RecorderIcon src={stopIcon} /></Button><Button variant="outline" color="secondary" size="icon" className="mira-recorder-small-action" aria-label={state === "pause" ? "บันทึกต่อ" : "พักบันทึก"} onClick={state === "pause" ? onResume : onPause}>{state === "pause" ? <RecorderIcon src={micIcon} /> : <RecorderIcon src={pauseIcon} />}</Button></div>;
  return <Card data-mira-theme data-slot="mira-recorder" role="group" aria-label={title} data-state={state} className={cn("mira-recorder", className)} {...props}>
    <div className="mira-recorder-header"><h3>{title}</h3>{transport && <Button variant="ghost" color="destructive" size="icon-sm" aria-label="ลบเสียงบันทึก" onClick={onDiscard}><RecorderIcon src={deleteIcon} /></Button>}</div>
    <div className="mira-recorder-body"><div className="mira-recorder-waveform-container">
      <div className="mira-recorder-waveform" aria-hidden>
        {transport && waveform == null ? <img src={state === "playback" ? playbackWaveform : readyWaveform} alt="" /> : <div className="mira-recorder-bars">{(waveform ?? recorderWaveform).map((height, i) => <span key={i} style={{ height: `${Math.min(100, Math.max(1, Number.isFinite(height) ? height : 1))}px`, "--mira-wave-delay": `${-(i % 11) * 0.13}s`, "--mira-wave-duration": `${1.4 + (i % 5) * 0.12}s` } as CSSProperties} />)}</div>}
      </div>
      {transport && <><div className="mira-recorder-ruler" aria-hidden><img src={timeline} alt="" /><div>{[0,1,2,3,4].map(i => <span key={i}>00:0{i + (state === "playback" ? 3 : 1)}</span>)}</div></div><input className="mira-recorder-seek" type="range" aria-label="ตำแหน่งเล่นเสียง" aria-valuetext={`${formatTime(position)} / ${formatTime(duration)}`} min={0} max={duration || 1} value={position} disabled={duration === 0} onChange={event => onSeek?.(Number(event.target.value))} style={{ "--mira-seek-position": `${duration ? position / duration * 100 : 0}%` } as CSSProperties} /></>}
    </div>
    {transport ? <div className="mira-recorder-transport">{info}{controls}<Button variant="decorative" className="mira-recorder-transcribe" onClick={onTranscribe}><span className="mira-transcribe-icon-box" aria-hidden><img className="mira-transcribe-icon" src={transcribeIcon} alt="" /></span>Transcribe</Button></div> : <>{info}{controls}</>}
    </div>
  </Card>;
}
