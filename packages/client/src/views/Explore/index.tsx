import { ExploreDataProps } from "../../hooks/views/useExplore";

import { PlantDetector } from "../../components/WEFA/PlantDetector";
import { ElementSelector } from "../../components/WEFA/ElementSelector";
import { CreatureGeneration } from "../../components/WEFA/CreatureGeneration";

interface ExploreProps extends ExploreDataProps {}

// TODO: Add Explore Canvas from Petra
const Explore: React.FC<ExploreProps> = ({
  creature,
  error,
  element,
  plantingState,
  elementState,
  isDetecting,
  isSeeding,
  verifyPlant,
  seedCreature,
  retrySeeding,
  plant,
  reset,
}) => {
  return (
    <section className="explore-view flex-col px-6 sm:px-12 pt-6">
      <div className="explore-detector flex flex-col items-center justify-end gap-2 overflow-hidden">
        {plantingState ? (
          <PlantDetector
            detecting={isDetecting}
            onPlantDetection={verifyPlant}
            plantDetails={plant}
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
