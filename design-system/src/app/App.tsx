import "./globals.css";
import { PrototypePreview } from "../lib/features/prototype/PrototypePreview";

/** Standalone prototype host; shares its renderer with Workspace/Prototype. */
export default function App() {
  return <PrototypePreview caseId={new URLSearchParams(location.search).get("case") || "catalog"} />;
}
