import { useState } from "react";
import { createPortal } from "react-dom";

import { WefaBadgeCard } from "../../../components/WEFA/BadgeCard";

interface ProfileHarvestProps {
  badges: WefaBadge[];
}

// TODO: Stylize Bleyle using mockData

export const ProfileHarvest: React.FC<ProfileHarvestProps> = ({ badges }) => {
  const [openBadge, setOpenBadge] = useState<WefaBadge | null>(null);

  return (
    <>
      <ul className="flex flex-col gap-3 w-full h-full overflow-scroll pt-6 pb-20">
        {badges.map((badge) => (
          <WefaBadgeCard
            {...badge}
            key={badge.id}
            onClick={() => setOpenBadge(badge)}
          />
        ))}
      </ul>
      {createPortal(
        <>
          <input
            type="checkbox"
            id="badge-viewer-dialog"
            className="modal-toggle"
          />
          <label htmlFor="badge-viewer-dialog" className="modal cursor-pointer">
            <label
              className="modal-box relative flex w-full sm:max-w-sm max-w-xs flex-col gap-4 items-center"
              htmlFor=""
            >
              {openBadge && (
                <>
                  <img src={openBadge.Icon} alt={openBadge.name} />
                  <h4 className="">{openBadge.name}</h4>
                  <p>{openBadge.description}</p>
                  <div className="flex gap-3">
                    <button className="btn btn-primary">Share</button>
                    <button className="btn btn-primary">Mint</button>
                  </div>
                </>
              )}
            </label>
          </label>
        </>,
        document.body
      )}
    </>
  );
};
