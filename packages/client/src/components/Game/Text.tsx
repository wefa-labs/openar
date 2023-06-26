import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";

interface GameTextProps extends MeshProps {
  userData?: {
    img: string;
  };
}

export const GameText: React.FC<GameTextProps> = ({ userData, ...mesh }) => {
  // const texture = useLoader(THREE.TextureLoader, userData?.img ?? "");

  return (
    <mesh {...mesh}>
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
};
