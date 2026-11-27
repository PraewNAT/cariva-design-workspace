// Product-local pieces of the transcribe → save → rating screens. Controls come from the shared DS.
import { useId, useState } from "react";
import stopIcon from "@material-symbols/svg-400/rounded/stop-fill.svg";
import saveIcon from "@material-symbols/svg-400/rounded/save-fill.svg";
import micIcon from "@material-symbols/svg-400/rounded/mic-fill.svg";
import thumbUpIcon from "@material-symbols/svg-400/rounded/thumb_up.svg";
import thumbUpFilledIcon from "@material-symbols/svg-400/rounded/thumb_up-fill.svg";
import thumbDownIcon from "@material-symbols/svg-400/rounded/thumb_down.svg";
import sparkleIcon from "@/lib/products/mock-mira/components/assets/recorder/transcribe-icon.svg";
import { Button } from "@/lib/app/components/ui/button";
import { Chip } from "@/lib/app/components/ui/chip";
import { Textarea } from "@/lib/app/components/ui/textarea";
import { Progress } from "@/lib/app/components/ui/progress";
import { Spinner } from "@/lib/app/components/ui/spinner";
import { CheckCircleOutlineRounded } from "@/lib/app/components/app/icons";
import generatingArt from "./assets/generating-note.png";
import infoIcon from "./assets/feedback-info.svg";
import { note, sections } from "./screens";

function Symbol({ src }: { src: string }) {
  return <span className="hosxp-symbol" aria-hidden style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }} />;
}
export const StopSymbol = () => <Symbol src={stopIcon} />;
export const SaveSymbol = () => <Symbol src={saveIcon} />;
export const MicSymbol = () => <Symbol src={micIcon} />;
export const SparkleSymbol = () => <Symbol src={sparkleIcon} />;

export function GeneratingNote() {
  return <div className="hosxp-note hosxp-generating">
    <img src={generatingArt} width="100" height="100" alt="" />
    <div className="hosxp-record-info" role="status"><h2>Generating your note</h2><p>Mira AI is transcribing the audio and drafting your OPD note</p></div>
    <Progress variant="indeterminate" aria-label="Generating your note" className="hosxp-generating-progress" />
    <p className="hosxp-generating-step">Analyzing transcript</p>
  </div>;
}

export function NoteResult({ onCopy, copyMessage }: { onCopy: () => void; copyMessage: string }) {
  return <div className="hosxp-result" aria-label="Generated note" role="region" tabIndex={0}>
    <div className="hosxp-result-toolbar">
      <span role="status" className="hosxp-demo-note">{copyMessage}</span>
      <Button variant="ghost" color="secondary" size="sm" onClick={onCopy}>Copy All</Button>
    </div>
    <section><p>{sections[0]}:</p>{note.complaint.map(line => <p key={line}>{line}</p>)}</section>
    <section><p>{sections[1]}:</p>{note.history.map(line => <p key={line}>{line}</p>)}</section>
    <section><p>{sections[2]}:</p><ul>{note.examination.map(line => <li key={line}>{line}</li>)}</ul></section>
  </div>;
}

export function FeedbackBar({ disabled, onGood, onBad }: { disabled: boolean; onGood: () => void; onBad: () => void }) {
  return <div className="hosxp-feedback-bar">
    <span className="hosxp-feedback-icon" aria-hidden><img src={infoIcon} width="12" height="12" alt="" /></span>
    <p>How did Mira do on this note?</p>
    <Chip variant="surface" size="sm" disabled={disabled} onClick={onGood}>Good</Chip>
    <Chip variant="surface" size="sm" disabled={disabled} onClick={onBad}>Bad</Chip>
  </div>;
}

export function FeedbackPanel({ onNotNow, onSend, onBad }: { onNotNow: () => void; onSend: () => void; onBad: () => void }) {
  const [text, setText] = useState("");
  const id = useId();
  // DS gap: the Figma card floats without an overlay, and the DS Dialog is modal only, so this panel is product-local.
  return <section className="hosxp-feedback-panel" role="dialog" aria-modal="false" aria-labelledby={`${id}-title`} onKeyDown={event => { if (event.key === "Escape") onNotNow(); }}>
    <div className="hosxp-feedback-head"><h2 id={`${id}-title`}>How did Mira do on this note?</h2><p>Your feedback helps us improve Mira.</p></div>
    <div className="hosxp-feedback-body">
      <div className="hosxp-feedback-choice">
        <Button variant="ghost" color="primary" aria-pressed="true" className="hosxp-feedback-selected"><Symbol src={thumbUpFilledIcon} />Good</Button>
        <Button variant="ghost" color="secondary" aria-pressed="false" onClick={onBad}><Symbol src={thumbDownIcon} />Bad</Button>
      </div>
      <Textarea aria-label="What worked well, or what went wrong?" placeholder="What worked well, or what went wrong?" maxLength={500} value={text} onChange={event => setText(event.target.value)} autoFocus />
      <p className="hosxp-feedback-count">{text.length}/500 characters</p>
    </div>
    <div className="hosxp-feedback-actions">
      <Button variant="ghost" color="secondary" onClick={onNotNow}>Not now</Button>
      <Button onClick={onSend}>Send feedback</Button>
    </div>
  </section>;
}
export const ThumbUpSymbol = () => <Symbol src={thumbUpIcon} />;

const statusCopy = {
  saving: { title: "Saving to HIS", text: "Adding your note to the patient's record. This window will close when it's done." },
  saved: { title: "Note saved!", text: "Your note is now in the patient's record." },
  closing: { title: "Closing your session...", text: "Taking you back to HOSxP, Please wait..." },
} as const;

/** Full-page progress / success screens. The Figma loading and success artwork are GIFs that were not downloaded, so DS icons stand in. */
export function StatusScreen({ kind }: { kind: keyof typeof statusCopy }) {
  const { title, text } = statusCopy[kind];
  return <section className="hosxp-status" role="status">
    <span className="hosxp-status-art" aria-hidden>{kind === "saved" ? <CheckCircleOutlineRounded /> : <Spinner />}</span>
    <div className="hosxp-record-info"><h2>{title}</h2><p>{text}</p></div>
  </section>;
}
