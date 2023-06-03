// import { Canvas } from "@react-three/fiber";
// import { ARButton, XR } from "@react-three/xr";

import { useSeed } from "../../hooks/wefa/useSeed";

import { PlantDetector } from "../../components/WEFA/PlantDetector";
import { ElementSelector } from "../../components/WEFA/ElementSelector";
import { CreatureGeneration } from "../../components/WEFA/CreatureGeneration";

// TODO: Add Explore Canvas from Petra
export default function Explore() {
  const {
    isDetecting,
    isSeeding,
    plantState,
    creature,
    element,
    error,
    verifyPlant,
    seedCreature,
    retrySeeding,
    reset,
  } = useSeed();

  return (
    <div className="explore-view h-full w-full overflow-hidden">
      <div className="explore-detector flex h-full w-full basis-1/2 flex-col items-center justify-end gap-2 overflow-hidden pt-6">
        {plantState ? (
          <PlantDetector
            detecting={isDetecting}
            onPlantDetection={verifyPlant}
          />
        ) : (
          <CreatureGeneration
            creature={creature}
            error={error}
            generating={isSeeding}
            onRetry={retrySeeding}
            onReset={reset}
          />
        )}
      </div>
      <ElementSelector
        onElementSelected={seedCreature}
        selectedElement={element ?? null}
      />
    </div>
  );
}
