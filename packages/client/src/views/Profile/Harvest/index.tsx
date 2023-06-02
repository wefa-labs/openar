import { flower } from "../../../mocks/plantGlossary.json";
interface ProfileHarvestProps {}

const mockData = []; // TODO: replace with real data

export const ProfileHarvest: React.FC<ProfileHarvestProps> = () => {
  const data = Object.values(flower);
  return (
    <ul className="flex flex-col gap-3 w-full h-full">
      {data.map((flower) => (
        <li key={flower.id} className="flex flex-col gap-3 w-full h-full">
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
