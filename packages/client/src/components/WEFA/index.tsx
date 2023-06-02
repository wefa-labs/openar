import { useSeed } from "../../hooks/wefa/useSeed";

import { PlantDetector } from "./PlantDetector";
import { ElementSelector } from "./ElementSelector";
import { CreatureGeneration } from "./CreatureGeneration";

export default function CreatureGenerator() {
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
    <>
      <div className="flex h-full w-full basis-1/2 flex-col items-center justify-end gap-2 overflow-hidden pt-6">
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
    </>
  );
}
