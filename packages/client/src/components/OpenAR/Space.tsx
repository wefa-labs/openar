import { useSpace } from "../../hooks/openar/useSpace";

interface SpaceProps {
  id: string;
}

export const Space: React.FC<SpaceProps> = ({ id }) => {
  // @ts-ignore
  const { state, identity, spaces, claimSpace } = useSpace(id);

  return (
    <div>
      {state?.value.toString()}
      {identity?.value.toString()}
      {spaces.length}
      <button onClick={() => claimSpace(id)}>Claim Space</button>
    </div>
  );
};
