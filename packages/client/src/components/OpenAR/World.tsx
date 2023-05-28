import { useWorld } from "../../hooks/openar/useWorld";

interface WorldProps {
  id: string;
}

export const World: React.FC<WorldProps> = ({ id }) => {
  // @ts-ignore
  const { state, identity, spaces, claimSpace } = useWorld(id);

  return (
    <div>
      {state?.value.toString()}
      {identity?.value.toString()}
      {spaces.length}
      <button onClick={() => claimSpace(id)}>Claim Space</button>
    </div>
  );
};
