import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./standalone.css";
import { PrototypeShell } from "../../../../../workspace/presentation/PrototypeShell";
import { HosxpHome } from "./HosxpHome";
import { hosxpCase } from "./cases";
const fixture = hosxpCase(new URLSearchParams(location.search).get("case") ?? "hosxp-home");
createRoot(document.getElementById("root")!).render(<StrictMode><PrototypeShell currentId="hosxp-home"><HosxpHome {...fixture} /></PrototypeShell></StrictMode>);
