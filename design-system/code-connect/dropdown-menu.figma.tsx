import figma from "@figma/code-connect";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem } from "../src/lib/app/components/ui/dropdown-menu";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  DropdownMenuItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12758",
  {
    variant: {"variant":"default"},
    props: {
      disabled: figma.enum("disabled", { true: true, false: false }),
    },
    example: ({ disabled }) => (
      <DropdownMenuItem disabled={disabled}>Menu item</DropdownMenuItem>
    ),
  },
);

figma.connect(
  DropdownMenuCheckboxItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12758",
  {
    variant: {"variant":"checkbox"},
    props: {
      checked: figma.enum("selected", { true: true, false: false }),
      disabled: figma.enum("disabled", { true: true, false: false }),
    },
    example: ({ checked, disabled }) => (
      <DropdownMenuCheckboxItem checked={checked} disabled={disabled}>Menu item</DropdownMenuCheckboxItem>
    ),
  },
);

figma.connect(
  DropdownMenuContent,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6617-313",
  {
    example: () => (
      <DropdownMenu>
        <DropdownMenuContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
);
