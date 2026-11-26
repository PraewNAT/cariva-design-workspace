import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";
import { Sortable, SortableItem, SortableItemView } from "./sortable";

const DATA: Record<string, { title: string; description: string }> = {
  a: { title: "Account settings", description: "Manage your preferences" },
  b: {
    title: "Privacy & security",
    description: "Control access and permissions",
  },
  c: { title: "Notifications", description: "Choose how we contact you" },
};

function Demo({ layout }: { layout: "list" | "grid" }) {
  const [items, setItems] = useState(["a", "b", "c"]);
  return (
    <div className={layout === "list" ? "w-[400px]" : "w-[632px]"}>
      <Sortable
        items={items}
        onItemsChange={setItems}
        layout={layout}
        renderOverlay={(id) => (
          <SortableItemView layout={layout} state="dragging" {...DATA[id]} />
        )}
      >
        {items.map((id) => (
          <SortableItem
            key={id}
            id={id}
            className={layout === "grid" ? "w-[200px]" : undefined}
            {...DATA[id]}
          />
        ))}
        <SortableItem
          id="d"
          disabled
          title="Disabled item"
          description="Cannot be moved"
          className={layout === "grid" ? "w-[200px]" : undefined}
        />
      </Sortable>
      <output data-testid="order" className="sr-only">
        {items.join(",")}
      </output>
    </div>
  );
}

const meta = {
  title: "Core/Components/Sortable",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  component: Sortable,
  args: { items: [], onItemsChange: () => {}, children: null },
} satisfies Meta<typeof Sortable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  render: () => <Demo layout="list" />,
  play: async ({ canvasElement }) => {
    const items = canvasElement.querySelectorAll('[data-slot="sortable-item"]');
    const first = items[0] as HTMLElement;
    expect(first.offsetWidth).toBe(400);
    expect(first.offsetHeight).toBe(80);
    expect(getComputedStyle(first).borderRadius).toBe("12px");
    expect(getComputedStyle(first).paddingLeft).toBe("16px");
    expect(getComputedStyle(first).columnGap).toBe("8px");
    const handle = first.querySelector(
      '[data-slot="sortable-handle"]'
    ) as HTMLElement;
    expect(handle.offsetWidth).toBe(32);
    expect(getComputedStyle(handle).borderRadius).toBe("8px");
    // keyboard reorder: space, arrow down, space
    handle.focus();
    await userEvent.keyboard(" ");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard(" ");
    await new Promise((r) => setTimeout(r, 400));
    const order = canvasElement.querySelector(
      '[data-testid="order"]'
    )!.textContent;
    expect(order).toBe("b,a,c");
    const disabled = canvasElement.querySelector(
      '[data-state="disabled"] [data-slot="sortable-handle"]'
    ) as HTMLButtonElement;
    expect(disabled.disabled).toBe(true);
  },
};

export const Grid: Story = {
  render: () => <Demo layout="grid" />,
  play: async ({ canvasElement }) => {
    const first = canvasElement.querySelector(
      '[data-slot="sortable-item"]'
    ) as HTMLElement;
    expect(first.offsetWidth).toBe(200);
    expect(first.offsetHeight).toBe(144);
  },
};
