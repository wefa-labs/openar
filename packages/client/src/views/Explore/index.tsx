// import { Canvas } from "@react-three/fiber";
// import { ARButton, XR } from "@react-three/xr";

import { SeedDataProps, useSeed } from "../../hooks/wefa/useSeed";

import { PlantDetector } from "../../components/WEFA/PlantDetector";
import { ElementSelector } from "../../components/WEFA/ElementSelector";
import { CreatureGeneration } from "../../components/WEFA/CreatureGeneration";

interface ExploreProps extends SeedDataProps {}

// TODO: Add Explore Canvas from Petra
const Explore: React.FC<ExploreProps> = () => {
  const {
    isDetecting,
    isSeeding,
    plantingState,
    elementState,
    creature,
    element,
    error,
    verifyPlant,
    seedCreature,
    retrySeeding,
    reset,
  } = useSeed();

  return (
    <section className="explore-view flex flex-col px-6 pt-6">
      <div className="explore-detector flex flex-col items-center justify-end gap-2 overflow-hidden">
        {plantingState ? (
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
        active={elementState}
        onElementSelected={seedCreature}
        selectedElement={element ?? null}
      />
    </section>
  );
};

export default Explore;
