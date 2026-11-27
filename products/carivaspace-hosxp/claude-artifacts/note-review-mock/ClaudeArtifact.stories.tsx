import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { PrototypeShell } from "../../../../workspace/presentation/PrototypeShell";
import catalog from "../../../../workspace/prototypes.json";

const mock = {
  id: "hosxp-claude-artifact-mock",
  product: "CarivaSpace HosXP",
  title: "HosXP · Claude artifact · Mock",
  url: "#artifact-mock",

};

const links = [
  { id: "note-review", title: "ตรวจทานโน้ต · Mock", addedOn: "2026-11-27", url: "https://example.com/hosxp-artifact-mock" },
  { id: "note-history", title: "ประวัติโน้ต · Mock", addedOn: "2026-11-27", url: "https://example.com/hosxp-note-history-mock" },
];

const meta = {
  title: "Products/CarivaSpace HosXP/Claude Artifacts/ตรวจทานโน้ต Mock",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ArtifactLink: Story = {
  name: "ลิงก์จำลอง · 27 พ.ย. 2569",
  render: () => <PrototypeShell currentId={mock.id} prototypes={[...catalog.prototypes, mock]}>
    <main id="artifact-mock" style={{ padding: "clamp(16px, 4vw, 48px)", color: "var(--foreground)", background: "var(--background)", minHeight: "100vh", fontSize: 16, lineHeight: 1.5 }}>
      <p style={{ fontSize: 14 }}>CarivaSpace HosXP / Claude artifact</p>
      <h1 style={{ fontSize: 28, lineHeight: 1.3, margin: "16px 0" }}>โฟลวตรวจทานโน้ต</h1>
      <p><strong>Mock · ตัวอย่างเท่านั้น</strong></p>
      <p>งานแยกจาก HosXP Homepage ใช้ Claude artifact แทน Canvas ของเรา</p>
      {links.map(link => <section key={link.id} aria-label={link.title} style={{ border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginTop: 24, maxWidth: 640, overflowWrap: "anywhere" }}>
        <h2 style={{ fontSize: 20, margin: "0 0 12px" }}>{link.title}</h2>
        <p style={{ fontSize: 14 }}>วันที่เพิ่ม <time dateTime={link.addedOn}>27 พ.ย. 2569</time></p>
        <p>ลิงก์ตัวอย่าง ยังไม่ใช่ artifact จริงจาก UX/UI</p>
        <p style={{ fontSize: 14 }}>{link.url}</p>
        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>เปิด {link.title} ↗</a>
      </section>)}
      <p style={{ fontSize: 14, marginTop: 24 }}>งานจริงจะเก็บลิงก์ที่ UX/UI ให้ไว้กับรายการงานนี้ และเปิดในแท็บใหม่</p>
    </main>
  </PrototypeShell>,
  play: async ({ canvas, userEvent }) => {
    const expand = canvas.queryByRole("button", { name: "ขยายแถบเลือกงาน" });
    if (expand) await userEvent.click(expand);
    await expect(canvas.getByRole("link", { name: mock.title })).toHaveAttribute("aria-current", "page");
    for (const link of links) {
      await expect(canvas.getByRole("link", { name: `เปิด ${link.title} ↗` })).toHaveAttribute("href", link.url);
      await expect(canvas.getByRole("link", { name: `เปิด ${link.title} ↗` })).toHaveAttribute("target", "_blank");
    }
    await userEvent.click(canvas.getByRole("button", { name: "ย่อแถบเลือกงาน" }));
    await expect(canvas.getByRole("button", { name: "ขยายแถบเลือกงาน" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "ขยายแถบเลือกงาน" }));
    await expect(canvas.getByRole("link", { name: mock.title })).toBeVisible();
  },
};
