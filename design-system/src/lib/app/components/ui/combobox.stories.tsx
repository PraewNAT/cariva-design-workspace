import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { expect, waitFor, within } from "storybook/test";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./combobox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./field";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

const groups = ["ตับ", "ไต", "เลือด"];
type Size = "default" | "lg";

// Fixtures compose the existing Core components; filtering/selection remain Base UI behavior.
function Example({ size = "default", label = "ค้นหากลุ่ม", disabled = false, invalid = false, defaultValue, items = groups }: {
  size?: Size; label?: string; disabled?: boolean; invalid?: boolean; defaultValue?: string; items?: string[];
}) {
  const id = useId();
  return (
    <Field size={size} data-disabled={disabled || undefined} data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Combobox items={items} defaultValue={defaultValue} disabled={disabled}>
        <ComboboxInput id={id} size={size} disabled={disabled} aria-invalid={invalid || undefined} aria-describedby={`${id}-message`} placeholder="Search or select..." />
        <ComboboxContent>
          <ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty>
          <ComboboxList aria-label="กลุ่มการตรวจ">
            {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {invalid ? <FieldError id={`${id}-message`}>กรุณาเลือกกลุ่มการตรวจ</FieldError> : <FieldDescription id={`${id}-message`}>พิมพ์เพื่อค้นหาและเลือกจากรายการ</FieldDescription>}
    </Field>
  );
}

const source = `<Field>\n  <FieldLabel htmlFor="group">ค้นหากลุ่ม</FieldLabel>\n  <Combobox items={["ตับ", "ไต", "เลือด"]}>\n    <ComboboxInput id="group" size="default" aria-describedby="group-help" placeholder="Search or select..." />\n    <ComboboxContent>\n      <ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty>\n      <ComboboxList aria-label="กลุ่มการตรวจ">{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList>\n    </ComboboxContent>\n  </Combobox>\n  <FieldDescription id="group-help">พิมพ์เพื่อค้นหาและเลือกจากรายการ</FieldDescription>\n</Field>`;
const meta = {
  title: "Core/Components/Combobox",
  component: ComboboxInput,
  tags: ["autodocs"],
  decorators: [(Story) => <div className="mx-auto w-full max-w-3xl p-6"><Story /></div>],
  parameters: {
    controls: { disable: true },
    a11y: { test: "error" },
    docs: {
      description: { component: "Combobox เดิมบน Base UI. ComboboxInput size=default/lg ใช้ช่อง 40/48px และลูกศร 20/24px จาก Figma; label/helper/error ประกอบจาก Field เดิม. รายละเอียดที่ docs/components/COMBOBOX-FIGMA.md. ไม่เพิ่ม prop state/filled/error ตามภาพ; ใช้ focus/open, value และ aria-invalid จริง." },
      source: { code: source, language: "tsx" },
    },
  },
} satisfies Meta<typeof ComboboxInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    const input = canvas.getByRole("combobox", { name: "ค้นหากลุ่ม" });
    await userEvent.type(input, "ไต");
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole("option", { name: "ไต" }));
    await expect(input).toHaveValue("ไต");
    await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument());
  },
};

export const Sizes: Story = {
  render: () => <FieldGroup>{(["default", "lg"] as const).map(size => <Example key={size} size={size} label={`ขนาด ${size}`} />)}</FieldGroup>,
  play: async ({ canvas, canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    for (const size of ["default", "lg"] as const) {
      const input = canvas.getByRole("combobox", { name: `ขนาด ${size}` });
      const group = input.closest<HTMLElement>('[data-ui="combobox-input"]')!;
      const icon = group.querySelector<HTMLElement>('[data-slot="combobox-chevron"]')!;
      await expect(group.getBoundingClientRect().height).toBe(size === "lg" ? 48 : 40);
      await expect(icon.getBoundingClientRect().width).toBe(size === "lg" ? 24 : 20);
      await expect(getComputedStyle(input).fontSize).toBe("16px");
      await expect(getComputedStyle(input).lineHeight).toBe("24px");
      const label = canvas.getByText(`ขนาด ${size}`);
      await expect(getComputedStyle(label).fontSize).toBe(size === "lg" ? "14px" : "12px");
    }
  },
};

export const States: Story = {
  parameters: { docs: { description: { story: "แสดง empty, filled, error-empty, error-filled และ disabled ทั้งสองขนาด. Hover/focus ใช้สถานะ browser จริงใน play ไม่ใช้ props จำลอง." } } },
  render: () => <div className="grid gap-8 sm:grid-cols-2">{(["default", "lg"] as const).map(size => <FieldGroup key={size}>
    <Example size={size} label={`${size} ปกติ`} />
    <Example size={size} label={`${size} มีค่า`} defaultValue="ไต" />
    <Example size={size} label={`${size} ผิดพลาด`} invalid />
    <Example size={size} label={`${size} ผิดพลาดมีค่า`} invalid defaultValue="ไต" />
    <Example size={size} label={`${size} ปิดใช้งาน`} disabled />
  </FieldGroup>)}</div>,
  play: async ({ canvas, userEvent, canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    for (const size of ["default", "lg"] as const) {
      const input = canvas.getByRole("combobox", { name: `${size} ปกติ` });
      const group = input.closest<HTMLElement>('[data-ui="combobox-input"]')!;
      // CSS :hover is measured with a real Playwright pointer in the rendered audit.
      input.focus();
      await waitFor(() => expect(getComputedStyle(group).boxShadow).toContain("37, 99, 235"));
      await userEvent.keyboard("{ArrowDown}");
      await body.findByRole("listbox");
      const trigger = group.querySelector('[data-slot="input-group-button"]')!;
      await expect(trigger).toHaveAttribute("data-popup-open");
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument());
      input.blur();
      const filled = canvas.getByRole("combobox", { name: `${size} มีค่า` });
      await expect(filled).toHaveValue("ไต");
      const error = canvas.getByRole("combobox", { name: `${size} ผิดพลาด` });
      await expect(error).toHaveAttribute("aria-invalid", "true");
      await expect(getComputedStyle(error.closest('[data-ui="combobox-input"]')!).boxShadow).toContain("220, 38, 38");
      const disabled = canvas.getByRole("combobox", { name: `${size} ปิดใช้งาน` });
      await expect(disabled).toBeDisabled();
      await expect(getComputedStyle(disabled).color).toBe("rgb(148, 163, 184)");
      const disabledLabel = canvas.getByText(`${size} ปิดใช้งาน`);
      await expect(getComputedStyle(disabledLabel).color).toBe("rgb(148, 163, 184)");
      await expect(getComputedStyle(disabledLabel).opacity).toBe("1");
    }
  },
};

export const NoResults: Story = {
  render: () => <Example />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole("combobox");
    await userEvent.type(input, "ไม่มีกลุ่มนี้");
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByText("ไม่พบรายการ")).toBeVisible();
    await expect(body.queryAllByRole("option")).toHaveLength(0);
    await userEvent.clear(input);
    await expect(await body.findByRole("option", { name: "ตับ" })).toBeVisible();
    await userEvent.keyboard("{Escape}");
  },
};

export const Keyboard: Story = {
  render: () => <Example />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole("combobox");
    input.focus();
    await userEvent.keyboard("{ArrowDown}");
    const body = within(canvasElement.ownerDocument.body);
    await body.findByRole("option", { name: "เลือด" });
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await waitFor(() => expect(body.getByRole("option", { name: "เลือด" })).toHaveAttribute("data-highlighted"));
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(input).toHaveValue("เลือด"));
    await expect(input).toHaveFocus();
    await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument());
  },
};

function DialogExample() {
  return <div data-product="backOffice" className="flex flex-col gap-6">
    <Example label="กลุ่มบนหน้า" />
    <Dialog>
      <DialogTrigger render={<Button variant="outline" color="secondary" />}>เปิดเลือกกลุ่ม</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>เลือกกลุ่มการตรวจ</DialogTitle><DialogDescription>ข้อมูลจำลองสำหรับตรวจ Combobox ใน Dialog</DialogDescription></DialogHeader>
        <div data-product="backOffice"><Example label="กลุ่มใน Dialog" /></div>
      </DialogContent>
    </Dialog>
  </div>;
}

export const PageAndDialog: Story = {
  render: () => <DialogExample />,
  parameters: { docs: { source: { code: '<Dialog>\n  <DialogTrigger render={<Button variant="outline" color="secondary" />}>เปิดเลือกกลุ่ม</DialogTrigger>\n  <DialogContent>\n    <DialogHeader><DialogTitle>เลือกกลุ่มการตรวจ</DialogTitle><DialogDescription>ข้อมูลจำลอง</DialogDescription></DialogHeader>\n    {/* ประกอบ Field + Combobox ตาม Default ใน scope Product เดียวกับหน้า */}\n  </DialogContent>\n</Dialog>', language: "tsx" } } },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "เปิดเลือกกลุ่ม" });
    const pageInput = canvas.getByRole("combobox", { name: "กลุ่มบนหน้า" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    const input = within(dialog).getByRole("combobox", { name: "กลุ่มใน Dialog" });
    for (const target of ["input", "group"] as const) {
      const first = target === "input" ? pageInput : pageInput.closest('[data-ui="combobox-input"]')!;
      const second = target === "input" ? input : input.closest('[data-ui="combobox-input"]')!;
      for (const property of ["height", "fontFamily", "fontSize", "lineHeight", "borderRadius", "paddingLeft", "backgroundColor"] as const) {
        await expect(getComputedStyle(first)[property]).toBe(getComputedStyle(second)[property]);
      }
    }
    await waitFor(() => expect(input).toBeVisible());
    await userEvent.type(input, "ไต");
    await userEvent.click(await body.findByRole("option", { name: "ไต" }));
    await expect(input).toHaveValue("ไต");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};

const longName = "กลุ่มการตรวจติดตามการทำงานของไตและภาวะแทรกซ้อนสำหรับผู้รับบริการ";
export const MobileThai: Story = {
  globals: { viewport: { value: "mobile320", isRotated: false } },
  render: () => <Example label="กลุ่มการตรวจสำหรับผู้รับบริการที่มีประวัติการรักษาต่อเนื่อง" defaultValue={longName} items={[longName, "เลือด"]} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const doc = canvasElement.ownerDocument;
    await doc.fonts.ready;
    await expect(doc.documentElement.scrollWidth).toBeLessThanOrEqual(doc.documentElement.clientWidth);
    const input = canvas.getByRole("combobox");
    await userEvent.click(canvas.getByRole("button", { name: "เปิดรายการ" }));
    const body = within(doc.body);
    const option = await body.findByRole("option", { name: longName });
    await waitFor(() => expect(option).toBeVisible());
    await expect(doc.documentElement.scrollWidth).toBeLessThanOrEqual(doc.documentElement.clientWidth);
    for (const node of [...canvasElement.querySelectorAll<HTMLElement>("label, p, input"), option]) {
      await expect(parseFloat(getComputedStyle(node).fontSize)).toBeGreaterThanOrEqual(12);
    }
    await userEvent.keyboard("{Escape}");
    await expect(input).toHaveValue(longName);
  },
};
