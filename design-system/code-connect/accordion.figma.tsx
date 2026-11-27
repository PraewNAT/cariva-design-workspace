import figma from "@figma/code-connect";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../src/lib/app/components/ui/accordion";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  AccordionItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-153",
  {
    props: {
      expanded: figma.enum("expanded", { "true": ["item-1"], "false": [] }),
      title: figma.string("title"),
      content: figma.string("content"),
    },
    example: ({ expanded, title, content }) => (
      <Accordion defaultValue={expanded}>
        <AccordionItem value="item-1">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
);
