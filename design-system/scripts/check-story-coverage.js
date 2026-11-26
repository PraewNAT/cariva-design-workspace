import fs from "node:fs";
import path from "node:path";
const directory="src/lib/app/components/ui";
const components=fs.readdirSync(directory).filter(name=>name.endsWith(".tsx")&&!name.endsWith(".stories.tsx"));
const missing=components.filter(name=>!fs.existsSync(path.join(directory,name.replace(".tsx",".stories.tsx"))));
if(missing.length)throw new Error("Core missing dedicated stories: "+missing.join(", "));
console.log(`${components.length}/${components.length} Core modules have dedicated story files. This checks file coverage, not every state or successful rendering.`);
