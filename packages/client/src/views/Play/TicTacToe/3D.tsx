import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";

import { GameBoard } from "../../../components/Game/Board";

export const TicTacToe3D: React.FC = () => {
  return (
    <>
      <ARButton />
      <Canvas
        // onCreated={onCanvasCreated}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "80dvh",
        }}
      >
        <XR>
          <GameBoard userData={{ gameID: "123" }} position={[0, 0, -1]} />
        </XR>
      </Canvas>
    </>
  );
};
