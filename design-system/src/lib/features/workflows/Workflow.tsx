import type { Flow, Kind, Step } from "./types";
import { flows } from "./flows";
import { overviewFlow } from "./flow-overview";

const W = 780;
const BOX_W = 310;
const BOX_H = 44;
const GAP = 30;
const TOP = 56;
const X: Record<"you" | "ai", number> = { you: 20, ai: 410 };
const LANE_NAME = { you: "คุณ", ai: "Claude (AI)" } as const;

const dash: Record<Kind, string | undefined> = { do: undefined, ask: undefined, maybe: "2 4", unverified: "7 4" };
const stroke: Record<Kind, number> = { do: 1.5, ask: 3.5, maybe: 1.5, unverified: 1.5 };

const cx = (s: Step) => X[s.lane] + BOX_W / 2;
const top = (i: number) => TOP + i * (BOX_H + GAP);

function Arrow({ from, to, i }: { from: Step; to: Step; i: number }) {
  const y1 = top(i) + BOX_H;
  const y2 = top(i + 1);
  const mid = (y1 + y2) / 2;
  const pts = from.lane === to.lane ? `${cx(from)},${y1} ${cx(to)},${y2 - 2}` : `${cx(from)},${y1} ${cx(from)},${mid} ${cx(to)},${mid} ${cx(to)},${y2 - 2}`;
  return <polyline points={pts} fill="none" stroke="currentColor" strokeWidth={1.5} markerEnd="url(#wf-arrow)" />;
}

function BackArrow({ steps, from, to, label }: { steps: Step[]; from: string; to: string; label: string }) {
  const a = steps.findIndex(s => s.id === from);
  const b = steps.findIndex(s => s.id === to);
  if (a < 0 || b < 0 || steps[a].lane !== steps[b].lane) return null;
  const left = steps[a].lane === "you";
  const edge = left ? X.you : X.ai + BOX_W;
  const out = left ? 8 : W - 10;
  const ya = top(a) + BOX_H / 2;
  const yb = top(b) + BOX_H / 2;
  return (
    <g>
      <polyline points={`${edge},${ya} ${out},${ya} ${out},${yb} ${edge + (left ? -2 : 2)},${yb}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#wf-arrow)" />
      <text x={left ? out + 6 : out - 6} y={(ya + yb) / 2} fontSize={12} textAnchor={left ? "start" : "end"} fill="currentColor">{label}</text>
    </g>
  );
}

export function Swimlane({ flow }: { flow: Flow }) {
  const H = TOP + flow.steps.length * (BOX_H + GAP);
  return (
    <figure className="my-6">
      <div className="overflow-x-auto"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`ผังแสดงว่าคุณและ AI ทำอะไรบ้างตามลำดับ: ${flow.title}`} className="h-auto w-full min-w-[780px] max-w-[780px] text-[var(--cds-content-primary,currentColor)]">
        <defs>
          <marker id="wf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        {(["you", "ai"] as const).map(l => (
          <g key={l}>
            <rect x={X[l] - 10} y={4} width={BOX_W + 20} height={H - 8} rx={12} fill="currentColor" opacity={l === "you" ? 0.05 : 0.025} />
            <text x={X[l] + BOX_W / 2} y={34} fontSize={15} fontWeight={600} textAnchor="middle" fill="currentColor">{LANE_NAME[l]}</text>
          </g>
        ))}
        {flow.steps.slice(0, -1).map((s, i) => <Arrow key={s.id} from={s} to={flow.steps[i + 1]} i={i} />)}
        {(flow.back ?? []).map(b => <BackArrow key={b.from + b.to} steps={flow.steps} {...b} />)}
        {flow.steps.map((s, i) => {
          const k = s.kind ?? "do";
          return (
            <g key={s.id}>
              <rect x={X[s.lane]} y={top(i)} width={BOX_W} height={BOX_H} rx={8} fill="var(--cds-on-surface-default, canvas)" stroke="currentColor" strokeWidth={stroke[k]} strokeDasharray={dash[k]} />
              {s.code && <text x={X[s.lane] + 12} y={top(i) + BOX_H / 2 + 5} fontSize={13} fontWeight={700} fill="currentColor">{s.code}</text>}
              <text x={X[s.lane] + (s.code ? 52 : 14)} y={top(i) + BOX_H / 2 + 5} fontSize={13} fill="currentColor">{s.label.replaceAll("`", "")}</text>
            </g>
          );
        })}
      </svg></div>
      <figcaption className="text-sm opacity-80">
        เส้นหนา = AI หยุดรอคุณตอบ · เส้นจุด = ทำเฉพาะบางกรณี · เส้นประ = ยังไม่มีเครื่องมือตรวจอัตโนมัติ · ลูกศรประย้อนกลับ = ตรวจไม่ผ่านแล้วกลับไปแก้
      </figcaption>
    </figure>
  );
}


/** แสดงข้อความที่มี `code` เป็นตัวอักษรแบบโค้ด */
function Rich({ text }: { text: string }) {
  return <>{text.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>;
}

const kindText: Record<Kind, string> = { do: "", ask: " (AI หยุดรอคุณ)", maybe: " (เฉพาะบางกรณี)", unverified: " (ยังไม่มีเครื่องมือตรวจอัตโนมัติ)" };

export function WorkflowPage({ slug }: { slug: string }) {
  const flow = [overviewFlow, ...flows].find(f => f.slug === slug);
  if (!flow) return <p role="alert">ไม่พบ flow {slug}</p>;
  return (
    <div className="max-w-[820px] font-sans leading-7">
      <h1 className="mb-2 text-3xl font-semibold">{flow.num}. {flow.title}</h1>
      <p className="mb-4 text-base"><Rich text={flow.summary} /></p>

      <h2 className="mt-6 text-xl font-semibold">ตัวอย่างคำสั่ง</h2>
      <ul className="list-disc pl-6">{flow.prompts.map(p => <li key={p}>“<Rich text={p} />”</li>)}</ul>

      <h2 className="mt-6 text-xl font-semibold">ใครทำอะไร</h2>
      <Swimlane flow={flow} />

      <h2 className="mt-6 text-xl font-semibold">ทีละขั้นตอน</h2>
      <ol className="list-decimal pl-6">
        {flow.steps.map(s => (
          <li key={s.id} className="mb-2">
            <strong>{s.lane === "you" ? "คุณ" : "AI"}{s.code ? ` · ${s.code}` : ""}:</strong> <Rich text={s.label} />{kindText[s.kind ?? "do"]}
            <div className="opacity-80"><Rich text={s.detail} /></div>
          </li>
        ))}
      </ol>

      <h2 className="mt-6 text-xl font-semibold">ผลที่ได้</h2>
      <ul className="list-disc pl-6">{flow.outputs.map(o => <li key={o}><Rich text={o} /></li>)}</ul>

      {flow.rules && (
        <>
          <h2 className="mt-6 text-xl font-semibold">กฎที่ต้องรู้</h2>
          <ul className="list-disc pl-6">{flow.rules.map(r => <li key={r}><Rich text={r} /></li>)}</ul>
        </>
      )}

      <h2 className="mt-6 text-xl font-semibold">AI จะไม่อ้างว่าตรวจแล้วในเรื่องเหล่านี้</h2>
      <ul className="list-disc pl-6">{flow.notVerified.map(o => <li key={o}><Rich text={o} /></li>)}</ul>

      {flow.related && (
        <p className="mt-6 text-sm opacity-80">เอกสารต้นทาง: {flow.related.join(" · ")}</p>
      )}
    </div>
  );
}

export function WorkflowIndex() {
  return (
    <div className="max-w-[820px] font-sans leading-7">
      <h1 className="mb-2 text-3xl font-semibold">Workflows: สั่งแบบนี้ เรากับ AI ทำอะไรบ้าง</h1>
      <p className="mb-4">แต่ละหน้าบอกว่าเมื่อคุณสั่งงานรูปแบบหนึ่ง ใครทำอะไรตามลำดับ AI จะหยุดรอคุณตอนไหน และสิ่งไหนที่ AI จะไม่อ้างว่าตรวจแล้ว รหัสขั้นตอน (เช่น F2, U5) ตรงกับ <code>rules/workflow-map.md</code> ซึ่งเป็นต้นฉบับของลำดับขั้นตอน</p>

      <p className="mb-2">อยากเห็นภาพรวมสั้น ๆ ตั้งแต่สั่งงานจนเปิด PR ให้ดูหน้า “00 ผังรวม ตั้งแต่สั่งงานจนเปิด PR”</p>
      <h2 className="mt-6 text-xl font-semibold">เลือกตามสิ่งที่คุณจะสั่ง</h2>
      <table className="w-full border-collapse text-left">
        <thead><tr><th className="border-b p-2">หน้า</th><th className="border-b p-2">ใช้เมื่อ</th><th className="border-b p-2">ตัวอย่างคำสั่ง</th></tr></thead>
        <tbody>
          {flows.map(f => (
            <tr key={f.slug}>
              <td className="border-b p-2 align-top"><strong>{f.num}</strong> {f.title}</td>
              <td className="border-b p-2 align-top">{f.summary.split(" (")[0]}</td>
              <td className="border-b p-2 align-top">“{f.prompts[0]}”</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-6 text-xl font-semibold">กติกาที่ใช้กับทุก flow</h2>
      <ul className="list-disc pl-6">
        <li>AI บอกชื่อ flow และรหัสขั้นตอนปัจจุบันก่อนเริ่มงาน (เช่น “Figma to Code, F2”)</li>
        <li>เจอปัญหาระหว่างทำ AI แจ้งก่อน (ปัญหา ผลกระทบ วิธีแก้) แล้วรอคุณยืนยัน ความเงียบไม่ใช่การยืนยัน</li>
        <li>งานที่ตรวจไม่ได้ AI เขียนว่า “ตรวจไม่ได้” ไม่เขียนว่า “ผ่าน”</li>
        <li>Figma ชนะเสมอถ้าเอกสารไม่ตรงกับ Figma สีใหม่ต้องแจ้งทีม DS ก่อน</li>
        <li>AI ทำงานบน branch ไม่แก้ <code>main</code> และไม่ commit หรือ push เองโดยไม่ถามคุณ</li>
        <li>การอนุมัติหน้าตาไม่ใช่การอนุญาตให้เขียน Figma หรือเผยแพร่</li>
      </ul>

      <h2 className="mt-6 text-xl font-semibold">วิธีอ่านผัง</h2>
      <p>สองเลน: ซ้ายคือคุณ ขวาคือ AI กล่องอยู่ในเลนของคนที่ทำ ลูกศรคือลำดับ เส้นหนาคือ AI หยุดรอคุณตอบ เส้นจุดคือทำเฉพาะบางกรณี เส้นประคือยังไม่มีเครื่องมือตรวจอัตโนมัติ ลูกศรประที่ย้อนกลับคือตรวจไม่ผ่านแล้วกลับไปแก้</p>
    </div>
  );
}
