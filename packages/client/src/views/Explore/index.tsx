import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";

import CreatureGenerator from "../../components/WEFA";

// import { useExplore } from "../../hooks/views/useExplore";

// TODO: Add Explore Canvas from Petra
export default function Explore() {
  // const { worlds, selectedWorld, setSelectedWorld } = useExplore();
  return (
    <>
      <CreatureGenerator />
    </>
  );
}
