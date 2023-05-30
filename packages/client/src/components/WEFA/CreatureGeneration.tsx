import React from "react";

import { Loader } from "../Loader";

interface CreatureGenerationProps {
  error: string | null;
  creature: Critter | null;
  generating: boolean;
  onRetry: () => void;
  onReset: () => void;
}

export const CreatureGeneration: React.FC<CreatureGenerationProps> = ({
  error,
  creature,
  generating,
  onRetry,
  onReset,
}) => {
  if (error)
    return (
      <>
        <p>Something went wrong: {error}</p>
        <button onClick={onRetry}>Try again</button>
        <button onClick={onReset}>Reset</button>
      </>
    );

  if (generating || !creature)
    return (
      <div className="grid h-full w-full place-items-center">
        <Loader />
      </div>
    );

  return (
    <>
      <img
        src={creature.image}
        alt="creature"
        className="aspect-square overflow-hidden rounded-lg object-cover"
      />
      <div className="flex w-full gap-2 px-1">
        <button className="btn flex-1">Nurture</button>
        <button className="btn flex-1">Regenerate</button>
      </div>
    </>
  );
};
