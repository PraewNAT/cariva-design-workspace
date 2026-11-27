import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";
import { DragIndicatorRounded } from "@/lib/app/components/app/icons";

/**
 * Figma `sortable`, `sortable-item`, `sortable-handle` (docs/components/SORTABLE-FIGMA.md).
 * Built on @dnd-kit. The handle is the only drag source; pointer and keyboard (space, arrows) both work.
 * Item `state` hover / focus / dragging / placeholder / disabled follow the Figma variants.
 */
type SortableLayout = "list" | "grid";
const LayoutContext = React.createContext<SortableLayout>("list");

function SortableHandle({
  className,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="sortable-handle"
      disabled={disabled}
      aria-label="Drag to reorder"
      className={cn(
        "flex size-8 shrink-0 cursor-grab items-center justify-center rounded-sm text-[var(--cds-content-secondary)] outline-hidden ring-inset focus-visible:ring-1 focus-visible:ring-[var(--cds-border-system)] disabled:cursor-not-allowed disabled:text-[var(--cds-content-disabled)] touch-none [&_svg]:size-5",
        className
      )}
      {...props}
    >
      <DragIndicatorRounded />
    </button>
  );
}

const itemVariants = cva(
  "flex rounded-md border bg-[var(--cds-on-surface-elevated)] p-4 transition-colors",
  {
    variants: {
      layout: {
        list: "min-h-20 flex-row items-start gap-2",
        grid: "min-h-36 flex-col gap-2",
      },
      state: {
        default:
          "border-[var(--cds-border-default)] hover:bg-[var(--cds-on-surface-subtle)] has-[[data-slot=sortable-handle]:focus-visible]:border-[var(--cds-border-system)]",
        dragging: "border-[var(--cds-border-system)]",
        placeholder:
          "border-dashed border-[var(--cds-border-default)] bg-[var(--cds-on-surface-subtle)] [&>*]:invisible",
        disabled: "border-[var(--cds-border-default)]",
      },
    },
    defaultVariants: { layout: "list", state: "default" },
  }
);

type ItemViewProps = Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  layout?: SortableLayout;
  state?: "default" | "dragging" | "placeholder" | "disabled";
  handleProps?: React.ComponentProps<"button">;
};

function SortableItemView({
  className,
  title,
  description,
  layout = "list",
  state = "default",
  handleProps,
  children,
  ...props
}: ItemViewProps) {
  return (
    <div
      data-slot="sortable-item"
      data-state={state}
      className={cn(itemVariants({ layout, state }), className)}
      {...props}
    >
      <SortableHandle disabled={state === "disabled"} {...handleProps} />
      {children ?? (
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {title ? (
            <p
              className={cn(
                "text-sm leading-5 font-medium text-[var(--cds-content-primary)]",
                state === "disabled" && "text-[var(--cds-content-disabled)]"
              )}
            >
              {title}
            </p>
          ) : null}
          {description ? (
            <p
              className={cn(
                "text-sm leading-5 text-[var(--cds-content-secondary)]",
                state === "disabled" && "text-[var(--cds-content-disabled)]"
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function SortableItem({
  id,
  disabled = false,
  ...props
}: Omit<ItemViewProps, "state" | "layout" | "id"> & {
  id: string;
  disabled?: boolean;
}) {
  const layout = React.useContext(LayoutContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });
  return (
    <SortableItemView
      ref={setNodeRef as never}
      layout={layout}
      state={disabled ? "disabled" : isDragging ? "placeholder" : "default"}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      handleProps={{
        ref: setActivatorNodeRef as never,
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}

function Sortable({
  items,
  onItemsChange,
  layout = "list",
  className,
  renderOverlay,
  children,
}: {
  items: string[];
  onItemsChange: (items: string[]) => void;
  layout?: SortableLayout;
  className?: string;
  /** Renders the floating copy while dragging, by item id. */
  renderOverlay?: (id: string) => React.ReactNode;
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }
  function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const from = items.indexOf(String(active.id));
      const to = items.indexOf(String(over.id));
      onItemsChange(arrayMove(items, from, to));
    }
  }
  return (
    <LayoutContext.Provider value={layout}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext
          items={items}
          strategy={
            layout === "grid"
              ? rectSortingStrategy
              : verticalListSortingStrategy
          }
        >
          <div
            data-slot="sortable"
            data-layout={layout}
            className={cn(
              layout === "list"
                ? "flex flex-col gap-4"
                : "flex flex-wrap gap-4",
              className
            )}
          >
            {children}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId && renderOverlay ? renderOverlay(activeId) : null}
        </DragOverlay>
      </DndContext>
    </LayoutContext.Provider>
  );
}

export { Sortable, SortableHandle, SortableItem, SortableItemView };
