import fs from "node:fs";
import path from "node:path";
const errors = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx?|css|mdx)$/.test(p)) {
      const s = fs.readFileSync(p, "utf8");
      if (
        /(?:from\s*|import\s*)['"][^'"]*(?:@mui\/|@emotion\/|code\/core|migration-adapters)/.test(
          s,
        )
      )
        errors.push(p);
      if ((p.startsWith("src/lib/core/") || p.startsWith("src/lib/app/components/ui/")) && /from\s*['"][^'"]*lib\/features\//.test(s)) errors.push(p + " imports a feature from Core");
    }
  }
}
walk("src");
walk(".storybook");
if (errors.length) throw Error("Legacy runtime imports: " + errors.join(", "));
console.log(
  "Active src + Storybook contain no MUI, Emotion or legacy Core imports.",
);
