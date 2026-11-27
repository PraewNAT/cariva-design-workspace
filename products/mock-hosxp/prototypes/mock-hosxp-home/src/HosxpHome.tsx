import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ClipboardPlus, Mic, X, RefreshCw } from "lucide-react";
import { ButtonSplit } from "@/lib/app/components/ui/button-split";
import { DropdownMenuItem } from "@/lib/app/components/ui/dropdown-menu";
import { Toaster, createToastManager } from "@/lib/app/components/ui/toast";
import { Button } from "@/lib/app/components/ui/button";
import { CardProfile, CardMetric } from "@/lib/app/components/app/content-card";
import { TagColor } from "@/lib/app/components/ui/tag";
import { ButtonMic } from "@/lib/app/components/app/button-mic";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/lib/app/components/ui/dialog";
import { MiraRecorder } from "@/lib/products/mock-mira/components/mira-recorder";
import { TooltipProvider } from "@/lib/app/components/ui/tooltip";
import microphone from "./assets/microphone.png";
import logo from "./assets/cariva-mark.svg";
import "./hosxp.css";
import { demoDelay, noteText, sections, type FeedbackState, type Screen } from "./screens";
import { FeedbackBar, FeedbackPanel, GeneratingNote, MicSymbol, NoteResult, SaveSymbol, SparkleSymbol, StatusScreen, StopSymbol } from "./parts";

const vitals = [
  ["BP", "mmHg", "118/76"], ["HR", "bpm", "120"], ["Pulse", "bpm", "72"],
  ["Temp", "°c", "98.6"], ["BSA", "m²", "1.9"], ["RR", "bpm", "25"],
  ["BW", "kg", "65"], ["Height", "cm", "175"], ["BMI", "kg/m²", "21.2"],
];
const formatTime = (seconds: number) => [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, "0")).join(":");
type HosxpHomeProps = {
  initialState?: Screen;
  initialElapsedSeconds?: number;
  initialFeedback?: FeedbackState;
  /** Keep the initial screen still (Canvas frames and state stories); timed steps run once the user moves on. */
  holdInitial?: boolean;
};
export function HosxpHome({ initialState = "idle", initialElapsedSeconds = 0, initialFeedback = "none", holdInitial = false }: HosxpHomeProps) {
  const canvasStill = new URLSearchParams(window.location.search).get("canvasStill") === "1";
  const [historyOpen, setHistoryOpen] = useState(true);
  const [recording, setRecording] = useState<Screen>(initialState);
  const [elapsed, setElapsed] = useState(initialElapsedSeconds);
  const [position, setPosition] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback);
  const [copyMessage, setCopyMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [recorderVisible, setRecorderVisible] = useState(true);
  const [toasts] = useState(() => createToastManager());
  const recorderRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const previousState = useRef(recording);
  const [modal, setModal] = useState<"settings" | "microphone" | "close" | "discard">("settings");
  const [dialogOpen, setDialogOpen] = useState(false);
  function openModal(kind: "settings" | "microphone" | "close" | "discard") { setModal(kind); setDialogOpen(true); }
  const [device, setDevice] = useState("Default - MacBook Pro Microphone (Built-in)");
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    if (canvasStill || recording !== "recording") return;
    const id = window.setInterval(() => setElapsed(value => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording, canvasStill]);
  useEffect(() => {
    if (canvasStill || recording !== "playback") return;
    if (elapsed === 0 || position >= elapsed) { setRecording("stopped"); return; }
    const id = window.setInterval(() => setPosition(value => Math.min(elapsed, value + 1)), 1000);
    return () => window.clearInterval(id);
  }, [recording, elapsed, position, canvasStill]);
  useEffect(() => {
    if ((previousState.current === "idle" && recording === "recording") || ((previousState.current === "recording" || previousState.current === "paused") && recording === "stopped")) recorderRef.current?.focus();
    if (previousState.current !== "idle" && recording === "idle") startRef.current?.focus();
    previousState.current = recording;
  }, [recording, canvasStill]);
  useEffect(() => {
    if (canvasStill || (holdInitial && recording === initialState)) return;
    const next = recording === "generating" ? "result" : recording === "saving" ? "saved" : recording === "saved" ? "closing" : null;
    if (recording !== "closing" && !next) return;
    const id = window.setTimeout(() => { if (next) setRecording(next); else setClosed(true); }, demoDelay[recording as keyof typeof demoDelay]);
    return () => window.clearTimeout(id);
  }, [recording, holdInitial, initialState, canvasStill]);
  useEffect(() => {
    if (feedback !== "sent") return;
    // A fixture that starts as "sent" keeps the toast on screen; a live send lets it time out.
    const id = toasts.add({ type: "success", title: "Feedback sent", description: "Your feedback helps us improve Mira.", timeout: initialFeedback === "sent" ? 0 : 5000 });
    return () => toasts.close(id);
  }, [feedback, initialFeedback, toasts]);
  function reset() { setRecording("idle"); setElapsed(0); setPosition(0); setFeedback("none"); setCopyMessage(""); setResultMessage(""); setRecorderVisible(true); }
  function transcribe() { setFeedback("none"); setResultMessage(""); setCopyMessage(""); setRecording("generating"); }
  function copyNote() {
    const done = () => setCopyMessage("คัดลอกแล้ว");
    const failed = () => setCopyMessage("คัดลอกไม่ได้ในหน้านี้");
    if (!navigator.clipboard) failed(); else navigator.clipboard.writeText(noteText).then(done, failed);
  }
  const fullScreen = recording === "saving" || recording === "saved" || recording === "closing" ? recording : null;
  const showRecorder = recording === "recording" || recording === "paused" || recording === "stopped" || recording === "playback";
  const toggleRecorder = <DropdownMenuItem onClick={() => setRecorderVisible(visible => !visible)}>{recorderVisible ? "Hide recorder" : "Show recorder"}</DropdownMenuItem>;
  if (closed) return <main className="hosxp hosxp-closed"><h1>Session closed</h1><p>ปิดเฉพาะ session จำลองใน prototype</p><Button onClick={() => { setClosed(false); reset(); }}>เปิด session อีกครั้ง</Button></main>;
  return <TooltipProvider><main className="hosxp" data-recording={recording}>
    <header className="hosxp-topbar">
      <div className="hosxp-topbar-start"><div className="hosxp-logo"><img src={logo} alt="Cariva" width="24" height="24" /></div>
        {!fullScreen && <Button variant="elevated" color="secondary" size="sm" aria-expanded={historyOpen} aria-controls="patient-history" onClick={() => setHistoryOpen(!historyOpen)}><ClipboardPlus aria-hidden />Patient History{historyOpen ? <ChevronUp aria-hidden /> : <ChevronDown aria-hidden />}</Button>}
      </div>
      <Button variant="elevated" color="secondary" size="sm" onClick={() => openModal("close")}><X aria-hidden className="hosxp-close-icon" />Close</Button>
    </header>
    {fullScreen ? <StatusScreen kind={fullScreen} /> : <div className={`hosxp-layout ${historyOpen ? "" : "hosxp-history-hidden"}`}>
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
        <div className="hosxp-actions"><Button variant="outline" color="secondary" size="sm" disabled={recording === "generating"} onClick={() => openModal("settings")}><RefreshCw aria-hidden />Mira AI Settings</Button>
          <div className="hosxp-record-actions">
            {recording === "idle" && <Button ref={startRef} variant="decorative" size="sm" onClick={() => { reset(); setRecording("recording"); }}><Mic aria-hidden />Start Record</Button>}
            {(recording === "recording" || recording === "paused") && <ButtonSplit color="destructive" size="sm" startIcon={<StopSymbol />} menuLabel="ตัวเลือกการอัด" menu={toggleRecorder} onAction={() => { setPosition(0); setRecording("stopped"); }}>Stop {formatTime(elapsed)}</ButtonSplit>}
            {(recording === "stopped" || recording === "playback") && <ButtonSplit size="sm" startIcon={<SparkleSymbol />} menuLabel="ตัวเลือกการอัด" menu={toggleRecorder} onAction={transcribe}>Transcribe</ButtonSplit>}
            {recording === "generating" && <ButtonSplit size="sm" disabled startIcon={<SparkleSymbol />} menuLabel="ตัวเลือกการอัด" menu={toggleRecorder}>Transcribe</ButtonSplit>}
            {recording === "result" && <>
              <Button variant="ghost" color="secondary" size="sm" onClick={() => setResultMessage("หน้ายืนยันอัดใหม่ทับโน้ต (Replace this note?) ยังไม่ได้ทำในรอบนี้")}><MicSymbol />New Recording</Button>
              <Button size="sm" onClick={() => { setFeedback(value => value === "open" ? "none" : value); setRecording("saving"); }}><SaveSymbol />Save to HIS</Button>
            </>}
          </div>
        </div>
        {showRecorder && recorderVisible && <div className="hosxp-recorder-container">
          <MiraRecorder ref={recorderRef} tabIndex={-1}
            state={recording === "paused" ? "pause" : recording === "stopped" ? "ready-to-transcribe" : recording === "playback" ? "playback" : "recording"}
            elapsedSeconds={recording === "playback" ? position : elapsed}
            durationSeconds={elapsed} positionSeconds={position}
            onPause={() => setRecording(recording === "playback" ? "stopped" : "paused")}
            onResume={() => setRecording("recording")}
            onStop={() => { setPosition(0); setRecording("stopped"); }}
            onDiscard={() => openModal("discard")}
            onPlay={() => { if (position >= elapsed) setPosition(0); setRecording("playback"); }}
            onSeek={setPosition}
            onTranscribe={transcribe}
          />
        </div>}
        <div className="hosxp-note-wrap">
          {recording === "generating" ? <GeneratingNote /> : recording === "result" ? <NoteResult onCopy={copyNote} copyMessage={copyMessage} /> : <div className="hosxp-note">
            <div className="hosxp-mic-art"><img src={microphone} width="100" height="100" alt="" /></div>
            <div className="hosxp-record-info"><h2>Ready to record</h2><p>Tap ‘Start Record’ to finish you note.</p></div>
            <div className="hosxp-note-details">{sections.map(label => <div className="hosxp-note-placeholder" key={label}>{label}</div>)}</div>
            <p className="hosxp-demo-note">Prototype demo · ข้อมูลและการบันทึกเสียงเป็นของจำลอง</p>
          </div>}
        </div>
        {recording === "result" && <div className="hosxp-result-footer">
          {feedback !== "sent" && <FeedbackBar disabled={feedback === "open"} onGood={() => setFeedback("open")} onBad={() => setResultMessage("ให้คะแนน Bad (เลือกเหตุผล) ยังไม่ได้ทำในรอบนี้")} />}
          <p role="status" className="hosxp-demo-note">{resultMessage}</p>
        </div>}
      </section>
    </div>}
    {recording === "result" && feedback === "open" && <FeedbackPanel onNotNow={() => setFeedback("none")} onSend={() => setFeedback("sent")} onBad={() => setResultMessage("ให้คะแนน Bad (เลือกเหตุผล) ยังไม่ได้ทำในรอบนี้")} />}
    <Toaster toastManager={toasts} />
    <Dialog open={dialogOpen} onOpenChange={open => { if (!open) setDialogOpen(false); }}><DialogContent><DialogHeader><DialogTitle>{modal === "settings" ? "Mira AI Settings" : modal === "microphone" ? "Microphone" : modal === "discard" ? "ลบเสียงบันทึก?" : "Close session?"}</DialogTitle><DialogDescription>{modal === "close" ? "ปิด session ตัวอย่างนี้และกลับไปหน้าเริ่มต้น" : modal === "discard" ? "ลบเสียงตัวอย่างและเริ่มใหม่ ไม่มีไฟล์เสียงจริงถูกบันทึก" : "การตั้งค่าสำหรับ prototype เท่านั้น ไม่มีการเชื่อมต่ออุปกรณ์หรือส่งข้อมูล"}</DialogDescription></DialogHeader>
      {modal === "settings" && <div className="hosxp-settings"><p>Note sections</p><ul>{sections.map(label => <li key={label}>{label}</li>)}</ul><p>Language: English · Template: OPD</p></div>}
      {modal === "microphone" && <fieldset className="hosxp-settings"><legend>เลือกอุปกรณ์จำลอง</legend>{["Default - MacBook Pro Microphone (Built-in)", "External Microphone (Demo)"].map(name => <label className="hosxp-device" key={name}><input type="radio" name="device" checked={device === name} onChange={() => setDevice(name)} />{name}</label>)}</fieldset>}
      <DialogFooter><Button variant="outline" color="secondary" onClick={() => setDialogOpen(false)}>{modal === "close" || modal === "discard" ? "Cancel" : "Done"}</Button>{modal === "close" && <Button variant="outline" color="destructive" onClick={() => { setClosed(true); reset(); setDialogOpen(false); }}>Close session</Button>}{modal === "discard" && <Button variant="outline" color="destructive" onClick={() => { setDialogOpen(false); reset(); }}>ลบและเริ่มใหม่</Button>}</DialogFooter>
    </DialogContent></Dialog>
  </main></TooltipProvider>;
}
