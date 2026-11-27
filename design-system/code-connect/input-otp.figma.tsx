import figma from "@figma/code-connect";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../src/lib/app/components/ui/input-otp";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  InputOTP,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-1164",
  {
    example: () => (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    ),
  },
);

figma.connect(
  InputOTPSlot,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-749",
  {
    example: () => (
      <InputOTPSlot index={0} />
    ),
  },
);
