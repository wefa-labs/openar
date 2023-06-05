import { WefaBadgeCard } from "../../../components/WEFA/BadgeCard";

interface ProfileHarvestProps {
  badges: WefaBadge[];
}

// TODO: Stylize Bleyle using mockData

export const ProfileHarvest: React.FC<ProfileHarvestProps> = ({ badges }) => {
  return (
    <ul className="flex flex-col gap-3 w-full h-full overflow-scroll pt-6 pb-20">
      {badges.map((badge) => (
        <WefaBadgeCard {...badge} key={badge.id} />
      ))}
    </ul>
  );
};
