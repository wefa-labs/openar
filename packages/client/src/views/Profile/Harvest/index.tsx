import { flower } from "../../../mocks/plantGlossary.json";
interface ProfileHarvestProps {}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode; // Is an SVG element
  color?: string; // Sets the border color
  element?: WefaElement; // Set the background color if set
}

const mockData: Badge[] = [
  { id: "1axe4", description: "", name: "" },
  { id: "1axe4", description: "", name: "" },
  { id: "1axe4", description: "", name: "" },
  { id: "1axe4", description: "", name: "" },
  { id: "1axe4", description: "", name: "" },
]; // TODO: replace with real data

// TODO: Stylize Bleyle using mockData

export const ProfileHarvest: React.FC<ProfileHarvestProps> = () => {
  return (
    <ul className="flex flex-col gap-3 w-full h-full overflow-scroll pt-6 pb-20">
      {mockData.map((badge) => (
        <li key={badge.id} className="flex flex-col gap-3 bg-base-100">
          <figure>
            <img
              src="/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
