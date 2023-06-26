import * as THREE from "three";
import { useRef, useState } from "react";
import { Interactive } from "@react-three/xr";
import { MeshProps } from "@react-three/fiber";

import RolyPolyTicTacToe from "../Creatures/RolyPoly";
import DragonflyTicTacToe from "../Creatures/Dragonfly";

interface GameTileProps extends MeshProps {
  userData?: {
    tileState: number;
    player: boolean;
    setPlayer: (player: boolean) => void;
    gameID: string;
    index: number;
  };
}

export const GameTile: React.FC<GameTileProps> = ({ userData, ...mesh }) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events

  const [claim, setClaim] = useState(userData?.tileState);

  // here would be a decent place to put animation logic
  //  props.userData.animation = hasWon ? "winning" : "losing"
  // don't really have time to implement

  return (
    <>
      {claim == 0 && (
        <DragonflyTicTacToe
          {...mesh}
          scale={[0.3, 0.3, 0.3]}
        ></DragonflyTicTacToe>
      )}
      {claim == 1 && (
        <RolyPolyTicTacToe
          {...mesh}
          scale={[0.2, 0.2, 0.2]}
        ></RolyPolyTicTacToe>
      )}
      <Interactive
        onSelect={() => {
          // claimPosition might need to be propogated down.
          // claimPosition( props.userData.gameID, props.userData.index)
          setClaim(userData?.player ? 1 : 0);
          // if quick state changes are needed
          userData?.setPlayer(!userData?.player);
        }}
      >
        <mesh scale={[1, 0.1, 1]} {...mesh} ref={ref}>
          <boxGeometry />
          <meshBasicMaterial visible={false} />
        </mesh>
      </Interactive>
    </>
  );
};
