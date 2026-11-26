import figma from "@figma/code-connect";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../src/lib/app/components/ui/avatar";
import { UserIcon } from "lucide-react";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Avatar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055",
  {
    variant: {"content":"image"},
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm", "xs": "xs" }),
      initials: figma.string("initials"),
      badge: figma.enum("badge", { "true": <AvatarBadge />, "false": undefined }),
    },
    example: ({ size, initials, badge }) => (
      <Avatar size={size}>
        <AvatarImage src="https://example.com/avatar.png" alt="" />
        <AvatarFallback>{initials}</AvatarFallback>
        {badge}
      </Avatar>
    ),
  },
);

figma.connect(
  Avatar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055",
  {
    variant: {"content":"text"},
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm", "xs": "xs" }),
      initials: figma.string("initials"),
      badge: figma.enum("badge", { "true": <AvatarBadge />, "false": undefined }),
    },
    example: ({ size, initials, badge }) => (
      <Avatar size={size}>
        <AvatarFallback>{initials}</AvatarFallback>
        {badge}
      </Avatar>
    ),
  },
);

figma.connect(
  Avatar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055",
  {
    variant: {"content":"icon"},
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm", "xs": "xs" }),
      badge: figma.enum("badge", { "true": <AvatarBadge />, "false": undefined }),
    },
    example: ({ size, badge }) => (
      <Avatar size={size}>
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
        {badge}
      </Avatar>
    ),
  },
);

figma.connect(
  AvatarGroup,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-63950",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm", "xs": "xs" }),
    },
    example: ({ size }) => (
      <AvatarGroup>
        <Avatar size={size}><AvatarFallback>OP</AvatarFallback></Avatar>
        <Avatar size={size}><AvatarFallback>AB</AvatarFallback></Avatar>
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
    ),
  },
);
