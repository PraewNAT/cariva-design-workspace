import fs from "node:fs";
const tokens = JSON.parse(fs.readFileSync("tokens.json", "utf8"));
const roles = {
  "status-warning": "status/warning/content/strong",
  "status-warning-bg": "status/warning/on-surface/subtle",
  "status-success": "status/success/content/default",
  "status-success-bg": "status/success/on-surface/subtle",
  background: "bg/white",
  foreground: "content/primary",
  placeholder: "content/placeholder",
  card: "on-surface/default",
  "card-foreground": "content/primary",
  popover: "on-surface/elevated",
  "popover-foreground": "content/primary",
  primary: "brand/primary/on-surface/default",
  "primary-hover": "brand/primary/on-surface/hover",
  "primary-pressed": "brand/primary/on-surface/pressed",
  "primary-foreground": "content/on-brand",
  secondary: "neutral/on-surface/subtle",
  "secondary-foreground": "content/secondary",
  muted: "on-surface/subtle",
  "muted-foreground": "content/secondary",
  accent: "brand/primary/on-surface/subtle",
  "accent-foreground": "brand/primary/content/strong",
  destructive: "status/error/content/default",
  border: "border/default",
  input: "border/strong",
  ring: "border/system",
  "chart-1": "brand/primary/on-surface/default",
  "chart-2": "brand/secondary/on-surface/default",
  "chart-3": "status/success/content/default",
  "chart-4": "status/warning/content/strong",
  "chart-5": "accent/purple/A04",
  sidebar: "on-surface/default",
  "sidebar-foreground": "content/primary",
  "sidebar-primary": "brand/primary/on-surface/default",
  "sidebar-primary-foreground": "content/on-brand",
  "sidebar-accent": "brand/primary/on-surface/subtle",
  "sidebar-accent-foreground": "brand/primary/content/strong",
  "sidebar-border": "border/default",
  "sidebar-ring": "border/system",
};
// Fail on missing mapping; don't silently substitute a new palette.
let css =
  "/* Generated from tokens.json. Run npm run tokens:generate. Light Theme only. */\n:root {\n";
for (const [name, path] of Object.entries(roles)) {
  const value = tokens.semantic["color/" + path]?.value;
  if (!value) throw Error("Missing semantic token: " + path);
  css += `  --${name}: ${value};\n`;
}
// Every semantic token is also exposed as --cds-<path> so components can bind to
// roles shadcn has no variable for (hover/pressed surfaces, error, neutral, disabled).
const seen = new Set();
for (const [key, token] of Object.entries(tokens.semantic)) {
  if (!key.startsWith("color/") || !token.value) continue;
  const name = "cds-" + key.slice("color/".length).replaceAll("/", "-");
  if (seen.has(name)) throw Error("Duplicate generated variable: --" + name);
  seen.add(name);
  css += `  --${name}: ${token.value};\n`;
}
css += `  --decorative-gradient: linear-gradient(135deg, ${tokens.semantic["color/brand/decorative/gradient/from"].value}, ${tokens.semantic["color/brand/decorative/gradient/via"].value}, ${tokens.semantic["color/brand/decorative/gradient/to"].value});\n`;
css += "}\n";
const file = "src/lib/core/design-system/themes/semantic.generated.css";
if (process.argv.includes("--check")) {
  if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== css)
    throw Error("Generated shadcn theme is stale");
} else fs.writeFileSync(file, css);
