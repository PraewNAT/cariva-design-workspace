import board from "../../../../../workspace/canvas/frames.mock-hosxp.json";
import { feedbackStates, screens } from "./screens";

// One fixture catalog for the board, stories and standalone case links.
export function hosxpCase(id: string) {
  const frame = board.frames.find(frame => frame.id === id) ?? board.frames[0];
  const props: { initialState?: string; initialElapsedSeconds?: number; initialFeedback?: string } = frame.props;
  return {
    initialState: screens.find(screen => screen === props.initialState) ?? "idle",
    initialElapsedSeconds: props.initialElapsedSeconds ?? 0,
    initialFeedback: feedbackStates.find(state => state === props.initialFeedback) ?? "none",
  } as const;
}
