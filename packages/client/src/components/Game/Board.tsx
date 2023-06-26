import * as THREE from "three";
import { useState } from "react";
import { useLoader, MeshProps } from "@react-three/fiber";

import img from "../../assets/openar/tictac.png";
import winImg from "../../assets/openar/win.png";
import loseImg from "../../assets/openar/lose.png";
import theirturnImg from "../../assets/openar/theirturn.png";
import playerturnImg from "../../assets/openar/playerturn.png";

import { GameTile } from "./Tile";
import { GameText } from "./Text";

interface GameBoardProps extends MeshProps {
  userData: {
    gameID: string;
  };
}

export const GameBoard: React.FC<GameBoardProps> = ({ userData, ...mesh }) => {
  const texture = useLoader(THREE.TextureLoader, img);

  const [player, setPlayer] = useState(true);
  const gameOver = false;
  const victoryCondition = true;

  const [boardState, setBoardState] = useState([0, 7, 1, 7, 0, 7, 7, 7, 7]);

  return (
    <mesh {...mesh}>
      {player ? (
        <GameText
          rotation={[0, 0, 0]}
          position={[0, 1, -2]}
          userData={{ img: playerturnImg }}
        ></GameText>
      ) : (
        <GameText
          rotation={[0, 0, 0]}
          position={[0, 1, -2]}
          userData={{ img: theirturnImg }}
        ></GameText>
      )}
      {gameOver &&
        (victoryCondition ? (
          <GameText
            rotation={[0, 0, 0]}
            position={[0, 0.5, -1.5]}
            userData={{ img: winImg }}
          ></GameText>
        ) : (
          <GameText
            rotation={[0, 0, 0]}
            position={[0, 0.5, -1.5]}
            userData={{ img: loseImg }}
          ></GameText>
        ))}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -1]}
        scale={[1, 1, 1]}
      >
        <planeBufferGeometry attach="geometry" args={[3, 3]} />
        <meshBasicMaterial
          alphaTest={0.001}
          transparent={true}
          side={THREE.DoubleSide}
          attach="material"
          toneMapped={false}
          map={texture}
          alphaMap={texture}
        />
      </mesh>

      {/* There is probably a cleaner way that propogating through userData but this works. */}
      <GameTile
        userData={{
          tileState: boardState[0],
          index: 0,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[-1.1, 0, -2.1]}
      ></GameTile>
      <GameTile
        userData={{
          tileState: boardState[1],
          index: 1,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[0, 0, -2.1]}
      ></GameTile>
      <GameTile
        userData={{
          tileState: boardState[2],
          index: 2,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[1.1, 0, -2.1]}
      ></GameTile>

      <GameTile
        userData={{
          tileState: boardState[3],
          index: 3,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[-1.1, 0, -1]}
      ></GameTile>
      <GameTile
        userData={{
          tileState: boardState[4],
          index: 4,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[0, 0, -1]}
      ></GameTile>
      <GameTile
        userData={{
          tileState: boardState[5],
          index: 5,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[1.1, 0, -1]}
      ></GameTile>

      <GameTile
        userData={{
          tileState: boardState[6],
          index: 6,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[-1.1, 0, 0.1]}
      ></GameTile>
      <GameTile
        userData={{
          tileState: boardState[7],
          index: 7,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[0, 0, 0.1]}
      ></GameTile>
      <GameTile
        userData={{
          tileState: boardState[8],
          index: 8,
          gameID: userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[1.1, 0, 0.1]}
      ></GameTile>
    </mesh>
  );
};
