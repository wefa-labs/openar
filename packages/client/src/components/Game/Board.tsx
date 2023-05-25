import * as THREE from "three";
import { useLoader, ThreeElements } from "@react-three/fiber";
import { Interactive } from "@react-three/xr";
import { useRef, useState } from "react";
import DragonflyTicTacToe from "../Creatures/Dragonfly";
import RolyPolyTicTacToe from "../Creatures/RolyPoly";

import img from "../../assets/tictac.png";
import winImg from "../../assets/win.png";
import loseImg from "../../assets/lose.png";
import theirturnImg from "../assets/theirturn.png";
import playerturnImg from "../../assets/playerturn.png";

function Tile(props: ThreeElements["mesh"]) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events

  const [claim, setClaim] = useState(props.userData?.tileState);

  // here would be a decent place to put animation logic
  //  props.userData.animation = hasWon ? "winning" : "losing"
  // don't really have time to implement

  return (
    <>
      {claim == 0 && (
        <DragonflyTicTacToe
          {...props}
          scale={[0.3, 0.3, 0.3]}
        ></DragonflyTicTacToe>
      )}
      {claim == 1 && (
        <RolyPolyTicTacToe
          {...props}
          scale={[0.2, 0.2, 0.2]}
        ></RolyPolyTicTacToe>
      )}
      <Interactive
        onSelect={() => {
          // claimPosition might need to be propogated down.
          // claimPosition( props.userData.gameID, props.userData.index)
          setClaim(props.userData?.player ? 1 : 0);
          // if quick state changes are needed
          props.userData?.setPlayer(!props.userData?.player);
        }}
      >
        <mesh scale={[1, 0.1, 1]} {...props} ref={ref}>
          <boxGeometry />
          <meshBasicMaterial visible={false} />
        </mesh>
      </Interactive>
    </>
  );
}

function ARText(props: ThreeElements["mesh"]) {
  const texture = useLoader(THREE.TextureLoader, props.userData?.img);

  return (
    <mesh {...props}>
      <mesh scale={[1, 1, 1]}>
        <planeBufferGeometry attach="geometry" args={[2, 0.5]} />
        <meshBasicMaterial
          alphaTest={0.001}
          transparent={true}
          side={THREE.DoubleSide}
          attach="material"
          toneMapped={false}
          // map={texture}
          // alphaMap={texture}
        />
      </mesh>
    </mesh>
  );
}

export default function Board(props: ThreeElements["mesh"]) {
  const texture = useLoader(THREE.TextureLoader, img);

  const [player, setPlayer] = useState(true);
  const gameOver = false;
  const victoryCondition = true;

  const [boardState, setBoardState] = useState([7, 7, 7, 7, 7, 7, 7, 7, 7]);

  return (
    <mesh {...props}>
      {player ? (
        <ARText
          rotation={[0, 0, 0]}
          position={[0, 1, -2]}
          userData={{ img: playerturnImg }}
        ></ARText>
      ) : (
        <ARText
          rotation={[0, 0, 0]}
          position={[0, 1, -2]}
          userData={{ img: theirturnImg }}
        ></ARText>
      )}
      {gameOver &&
        (victoryCondition ? (
          <ARText
            rotation={[0, 0, 0]}
            position={[0, 0.5, -1.5]}
            userData={{ img: winImg }}
          ></ARText>
        ) : (
          <ARText
            rotation={[0, 0, 0]}
            position={[0, 0.5, -1.5]}
            userData={{ img: loseImg }}
          ></ARText>
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
      <Tile
        userData={{
          tileState: boardState[0],
          index: 0,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[-1.1, 0, -2.1]}
      ></Tile>
      <Tile
        userData={{
          tileState: boardState[1],
          index: 1,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[0, 0, -2.1]}
      ></Tile>
      <Tile
        userData={{
          tileState: boardState[2],
          index: 2,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[1.1, 0, -2.1]}
      ></Tile>

      <Tile
        userData={{
          tileState: boardState[3],
          index: 3,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[-1.1, 0, -1]}
      ></Tile>
      <Tile
        userData={{
          tileState: boardState[4],
          index: 4,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[0, 0, -1]}
      ></Tile>
      <Tile
        userData={{
          tileState: boardState[5],
          index: 5,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[1.1, 0, -1]}
      ></Tile>

      <Tile
        userData={{
          tileState: boardState[6],
          index: 6,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[-1.1, 0, 0.1]}
      ></Tile>
      <Tile
        userData={{
          tileState: boardState[7],
          index: 7,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[0, 0, 0.1]}
      ></Tile>
      <Tile
        userData={{
          tileState: boardState[8],
          index: 8,
          gameID: props.userData?.gameID,
          setPlayer: setPlayer,
          player: player,
        }}
        position={[1.1, 0, 0.1]}
      ></Tile>
    </mesh>
  );
}
