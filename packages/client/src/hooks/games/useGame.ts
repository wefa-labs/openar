import { useState } from "react";

export type PlayState = "idle" | "loading" | "playing" | "error";
export type GameMode = "2D" | "3D";

export const useGame = (gameMode?: GameMode) => {
  const [state, setState] = useState<PlayState>("idle");
  const [mode, setMode] = useState<GameMode>(gameMode ?? "2D");

  console.log("Game State", { state, mode });

  return {
    state,
    mode,
    setState,
    setMode,
  };
};
