import board from "../../../../../workspace/canvas/frames.carivaspace-hosxp.json";

// One fixture catalog for the board, stories and standalone case links.
export function hosxpCase(id: string) {
  const frame = board.frames.find(frame => frame.id === id) ?? board.frames[0];
  const state = frame.props.initialState;
  const initialState = state === "recording" || state === "paused" || state === "stopped" || state === "playback" ? state : "idle";
  return { initialState, initialElapsedSeconds: frame.props.initialElapsedSeconds } as const;
}
