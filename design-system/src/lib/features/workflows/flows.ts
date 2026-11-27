import type { Flow } from "./types";
import { componentFlows } from "./flows-component";
import { screenFlows } from "./flows-screen";
import { otherFlows } from "./flows-other";
import { handoffFlows } from "./flows-handoff";

export const flows: Flow[] = [...componentFlows, ...screenFlows, ...otherFlows, ...handoffFlows];
