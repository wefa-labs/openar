import { useExplore } from "../../hooks/views/useExplore";

// TODO: Add Explore Canvas from Petra
export default function Explore() {
  const { worlds, selectedWorld, setSelectedWorld } = useExplore();
  return (
    <div>
      {worlds.map((world) => (
        <div />
      ))}
    </div>
  );
}
