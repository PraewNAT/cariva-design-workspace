import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ClipboardPlus, Mic, X, RefreshCw } from "lucide-react";
import { Button } from "@/lib/app/components/ui/button";
import { CardProfile, CardMetric } from "@/lib/app/components/app/content-card";
import { TagColor } from "@/lib/app/components/ui/tag";
import { ButtonMic } from "@/lib/app/components/app/button-mic";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/lib/app/components/ui/dialog";
import { MiraRecorder } from "@/lib/products/mira/components/mira-recorder";
import { TooltipProvider } from "@/lib/app/components/ui/tooltip";
import microphone from "./assets/microphone.png";
import logo from "./assets/cariva-mark.svg";
import "./hosxp.css";

type RecordingState = "idle" | "recording" | "paused" | "stopped" | "playback";
const vitals = [
  ["BP", "mmHg", "118/76"], ["HR", "bpm", "120"], ["Pulse", "bpm", "72"],
  ["Temp", "°c", "98.6"], ["BSA", "m²", "1.9"], ["RR", "bpm", "25"],
  ["BW", "kg", "65"], ["Height", "cm", "175"], ["BMI", "kg/m²", "21.2"],
];
const sections = ["CC (Chief Complaint)", "HPI (History of Present Illness)", "Physical Examination"];
export function HosxpHome({ initialState = "idle", initialElapsedSeconds = 0 }: { initialState?: RecordingState; initialElapsedSeconds?: number }) {
  const [historyOpen, setHistoryOpen] = useState(true);
  const [recording, setRecording] = useState<RecordingState>(initialState);
  const [elapsed, setElapsed] = useState(initialElapsedSeconds);
  const [position, setPosition] = useState(0);
  const [transcribeMessage, setTranscribeMessage] = useState("");
  const recorderRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const previousState = useRef(recording);
  const [modal, setModal] = useState<"settings" | "microphone" | "close" | "discard">("settings");
  const [dialogOpen, setDialogOpen] = useState(false);
  function openModal(kind: "settings" | "microphone" | "close" | "discard") { setModal(kind); setDialogOpen(true); }
  const [device, setDevice] = useState("Default - MacBook Pro Microphone (Built-in)");
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    if (recording !== "recording") return;
    const id = window.setInterval(() => setElapsed(value => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);
  useEffect(() => {
    if (recording !== "playback") return;
    if (elapsed === 0 || position >= elapsed) { setRecording("stopped"); return; }
    const id = window.setInterval(() => setPosition(value => Math.min(elapsed, value + 1)), 1000);
    return () => window.clearInterval(id);
  }, [recording, elapsed, position]);
  useEffect(() => {
    if ((previousState.current === "idle" && recording === "recording") || ((previousState.current === "recording" || previousState.current === "paused") && recording === "stopped")) recorderRef.current?.focus();
    if (previousState.current !== "idle" && recording === "idle") startRef.current?.focus();
    previousState.current = recording;
  }, [recording]);
  if (closed) return <main className="hosxp hosxp-closed"><h1>Session closed</h1><p>ปิดเฉพาะ session จำลองใน prototype</p><Button onClick={() => { setClosed(false); setRecording("idle"); setElapsed(0); }}>เปิด session อีกครั้ง</Button></main>;
  return <TooltipProvider><main className="hosxp" data-recording={recording}>
    <header className="hosxp-topbar">
      <div className="hosxp-topbar-start"><div className="hosxp-logo"><img src={logo} alt="Cariva" width="24" height="24" /></div>
        <Button variant="elevated" color="secondary" size="sm" aria-expanded={historyOpen} aria-controls="patient-history" onClick={() => setHistoryOpen(!historyOpen)}><ClipboardPlus aria-hidden />Patient History{historyOpen ? <ChevronUp aria-hidden /> : <ChevronDown aria-hidden />}</Button>
      </div>
      <Button variant="elevated" color="secondary" size="sm" onClick={() => openModal("close")}><X aria-hidden className="hosxp-close-icon" />Close</Button>
    </header>
    <div className={`hosxp-layout ${historyOpen ? "" : "hosxp-history-hidden"}`}>
      {historyOpen && <aside className="hosxp-history" id="patient-history" aria-label="Patient History">
        <h2>Patient History</h2>
        <div className="hosxp-history-body">
          <CardProfile name="สมชาย ใจดี" identifier="HN 4123-1235" details={[{ label: "Age", value: "51 y 6 m" }, { label: "Sex", value: "Male" }]} />
          <div className="hosxp-vitals" aria-label="Vital signs">{vitals.map(([label, unit, value]) => <CardMetric key={label} label={label} unit={unit} value={value} status="normal" />)}</div>
          <section className="hosxp-fact"><h3>Underlying Diseases</h3><div className="hosxp-tags"><TagColor color="purple">Heart Disease</TagColor><TagColor color="purple">Diabetes</TagColor></div></section>
          <section className="hosxp-fact"><h3>Drug Allergy</h3><div className="hosxp-tags"><TagColor color="pink">Penicillin</TagColor><TagColor color="pink">NSAIDs</TagColor><TagColor color="pink">Sulfamethoxazole-Trimethoprim</TagColor></div></section>
          <section className="hosxp-fact hosxp-complaint"><h3>CC (Chief Complaint by Nurse)</h3><p>Patient reports worsening shortness of breath and leg swelling over 3 days, with a 4 lb weight gain.<br />No chest pain or palpitations.</p></section>
        </div>
      </aside>}
      <section className="hosxp-session" aria-label="Recording session">
        <div className="hosxp-session-header"><div className="hosxp-patient-title"><TagColor color="emerald">OPD</TagColor><h1>สมชาย ใจดี</h1><time dateTime="2026-09-12T12:12:12">12 Sep 2026 12:12:12</time></div><ButtonMic variant="dot" status="active" label={device} onClick={() => openModal("microphone")} /></div>
        <div className="hosxp-actions"><Button variant="outline" color="secondary" size="sm" onClick={() => openModal("settings")}><RefreshCw aria-hidden />Mira AI Settings</Button>
          <div className="hosxp-record-actions">{recording === "idle" && <Button ref={startRef} variant="decorative" size="sm" onClick={() => { setElapsed(0); setPosition(0); setTranscribeMessage(""); setRecording("recording"); }}><Mic aria-hidden />Start Record</Button>}</div>
        </div>
        <div className="hosxp-note-wrap"><div className="hosxp-note">
          {recording === "idle" ? <>
            <div className="hosxp-mic-art"><img src={microphone} width="100" height="100" alt="" /></div>
            <div className="hosxp-record-info"><h2>Ready to record</h2><p>Tap ‘Start Record’ to finish you note.</p></div>
          </> : <div className="hosxp-recorder-container">
            <MiraRecorder ref={recorderRef} tabIndex={-1}
              state={recording === "paused" ? "pause" : recording === "stopped" ? "ready-to-transcribe" : recording}
              elapsedSeconds={recording === "playback" ? position : elapsed}
              durationSeconds={elapsed} positionSeconds={position}
              onPause={() => setRecording(recording === "playback" ? "stopped" : "paused")}
              onResume={() => setRecording("recording")}
              onStop={() => { setPosition(0); setRecording("stopped"); }}
              onDiscard={() => openModal("discard")}
              onPlay={() => { if (position >= elapsed) setPosition(0); setRecording("playback"); }}
              onSeek={setPosition}
              onTranscribe={() => setTranscribeMessage("ส่งคำขอถอดเสียงตัวอย่างแล้ว · ไม่มีการส่งข้อมูลจริง")}
            />
            <p className="hosxp-demo-note">Prototype demo · ไม่ได้บันทึกเสียงจริง</p>
            {transcribeMessage && <p role="status" className="hosxp-demo-note">{transcribeMessage}</p>}
          </div>}
          <div className="hosxp-note-details">{sections.map(label => (recording === "stopped" || recording === "playback") ? <label className="hosxp-note-field" key={label}>{label}<textarea aria-label={label} placeholder="กรอกบันทึกตัวอย่าง" /></label> : <div className="hosxp-note-placeholder" key={label}>{label}</div>)}</div>
        </div></div>
      </section>
    </div>
    <Dialog open={dialogOpen} onOpenChange={open => { if (!open) setDialogOpen(false); }}><DialogContent><DialogHeader><DialogTitle>{modal === "settings" ? "Mira AI Settings" : modal === "microphone" ? "Microphone" : modal === "discard" ? "ลบเสียงบันทึก?" : "Close session?"}</DialogTitle><DialogDescription>{modal === "close" ? "ปิด session ตัวอย่างนี้และกลับไปหน้าเริ่มต้น" : modal === "discard" ? "ลบเสียงตัวอย่างและเริ่มใหม่ ไม่มีไฟล์เสียงจริงถูกบันทึก" : "การตั้งค่าสำหรับ prototype เท่านั้น ไม่มีการเชื่อมต่ออุปกรณ์หรือส่งข้อมูล"}</DialogDescription></DialogHeader>
      {modal === "settings" && <div className="hosxp-settings"><p>Note sections</p><ul>{sections.map(label => <li key={label}>{label}</li>)}</ul><p>Language: English · Template: OPD</p></div>}
      {modal === "microphone" && <fieldset className="hosxp-settings"><legend>เลือกอุปกรณ์จำลอง</legend>{["Default - MacBook Pro Microphone (Built-in)", "External Microphone (Demo)"].map(name => <label className="hosxp-device" key={name}><input type="radio" name="device" checked={device === name} onChange={() => setDevice(name)} />{name}</label>)}</fieldset>}
      <DialogFooter><Button variant="outline" color="secondary" onClick={() => setDialogOpen(false)}>{modal === "close" || modal === "discard" ? "Cancel" : "Done"}</Button>{modal === "close" && <Button variant="outline" color="destructive" onClick={() => { setClosed(true); setRecording("idle"); setDialogOpen(false); }}>Close session</Button>}{modal === "discard" && <Button variant="outline" color="destructive" onClick={() => { setDialogOpen(false); setRecording("idle"); setElapsed(0); setPosition(0); setTranscribeMessage(""); }}>ลบและเริ่มใหม่</Button>}</DialogFooter>
    </DialogContent></Dialog>
  </main></TooltipProvider>;
}
